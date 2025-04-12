"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Transcription from './Transcription';
import Peer, { DataConnection } from 'peerjs';
import TranscriptProcessor from './GeminiAI';

// Interfaces (SpeechRecognition, etc.) remain the same as before
// ... (keep all the interface definitions from your original code) ...

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

declare const webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof webkitSpeechRecognition;
  }
}

interface VideoCallProps {
  roomId: string;
  isHost: boolean;
  userName: string;
}

interface Transcript {
  name: string;
  text: string;
}

interface DataConnectionMessage {
  type: 'name' | 'transcript';
  name?: string;
  text?: string;
}

type PeerJSDataConnection = DataConnection<DataConnectionMessage>;

interface PeerError extends Error {
  type?: string;
}

export default function VideoCall({ roomId, isHost, userName }: VideoCallProps) {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerId, setPeerId] = useState<string>('');
  const [callEstablished, setCallEstablished] = useState(false);
  const [peerName, setPeerName] = useState('');
  const [connections, setConnections] = useState<PeerJSDataConnection[]>([]);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [audioText, setAudioText] = useState('');
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(true);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // <-- New state for mute status

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>(null!);
  const recognitionRef = useRef<SpeechRecognition>(null!);
  const connectionsRef = useRef<PeerJSDataConnection[]>([]);
  const peerDestroyedRef = useRef(false);
  const cleanupCalledRef = useRef(false);

  useEffect(() => {
    connectionsRef.current = connections;
  }, [connections]);

  // Visibility Change Handler - updated to respect mute state
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (cleanupCalledRef.current || !recognitionRef.current) return;

      if (document.visibilityState === 'hidden') {
        if (isRecognizing) {
          recognitionRef.current.stop();
          // isRecognizing state will be updated by the onend handler
        }
      } else {
        // Only restart if not manually muted and not already recognizing
        if (!isMuted && !isRecognizing) {
          try {
            recognitionRef.current.start();
            // isRecognizing state will be updated by the onstart handler
          } catch (err) {
            // Avoid crashing if start fails (e.g., already started)
            console.log('Speech restart skipped:', err);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRecognizing, isMuted]); // <-- Added isMuted dependency

  const setupDataConnection = useCallback((conn: PeerJSDataConnection) => {
    if (!conn) return;

    conn.on('open', () => {
      setConnections(prev => [...prev, conn]);
      conn.send({ type: 'name', name: userName });
    });

    conn.on('data', (data: DataConnectionMessage) => {
      if (data.type === 'name') {
        setPeerName(data.name || 'Peer');
      } else if (data.type === 'transcript') {
        setTranscripts(prev => [...prev, { name: data.name || 'Peer', text: data.text || '' }]);
      }
    });

    conn.on('close', () => {
      setConnections(prev => prev.filter(c => c.peer !== conn.peer));
      setPeerName('');
      setCallEstablished(false);
    });

    conn.on('error', (err: PeerError) => {
      console.error('Data connection error:', err);
      setError(`Data connection error: ${err.message}`);
    });
  }, [userName]);

  const initiateConnection = useCallback((peerInstance: Peer, hostId: string) => {
    if (!peerInstance || !hostId) return;

    const dataConn = peerInstance.connect(hostId, {
      reliable: true,
      metadata: { name: userName }
    }) as PeerJSDataConnection;

    setupDataConnection(dataConn);

    setTimeout(() => {
      if (localStreamRef.current && peerInstance && !peerDestroyedRef.current) {
        const call = peerInstance.call(hostId, localStreamRef.current);

        call.on('stream', (remoteStream: MediaStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            setCallEstablished(true);
          }
        });

        call.on('close', () => setCallEstablished(false));
        call.on('error', (err: PeerError) => setError(`Media call error: ${err.message}`));
      }
    }, 1000);
  }, [userName, setupDataConnection]);

  // Function to toggle microphone mute status
  const toggleMute = useCallback(() => {
    if (!localStreamRef.current || !recognitionRef.current) return;

    const nextMutedState = !isMuted;
    setIsMuted(nextMutedState);

    // Toggle audio track enabled status
    localStreamRef.current.getAudioTracks().forEach(track => {
      track.enabled = !nextMutedState;
    });

    // Stop or start speech recognition based on mute state
    try {
        if (nextMutedState) {
            // Muting: Stop recognition if it's running
            if (isRecognizing) {
                recognitionRef.current.stop();
                // onend handler will set isRecognizing to false
            }
        } else {
            // Unmuting: Start recognition if it's not running
            if (!isRecognizing) {
                recognitionRef.current.start();
                // onstart handler will set isRecognizing to true
            }
        }
    } catch (err) {
        console.error("Error toggling speech recognition:", err);
        setError(`Error toggling mic: ${err instanceof Error ? err.message : 'Unknown error'}`);
        // Revert mute state if recognition control failed
        setIsMuted(current => !current);
         localStreamRef.current.getAudioTracks().forEach(track => {
            track.enabled = isMuted; // Revert track state
        });
    }
  }, [isMuted, isRecognizing]); // <-- Added dependencies


  useEffect(() => {
    const initSpeechRecognition = () => {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
         console.warn("Speech Recognition API not available.");
         setError("Speech Recognition is not supported by your browser.");
         return;
      }

      try {
        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        // Ensure isRecognizing state is accurate
        recognition.onstart = () => setIsRecognizing(true);
        recognition.onend = () => setIsRecognizing(false);

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              const finalText = transcript.trim();
              if (finalText) {
                connectionsRef.current.forEach(conn => {
                  if (conn.open) conn.send({ type: 'transcript', name: userName, text: finalText });
                });
                setTranscripts(prev => [...prev, { name: userName, text: finalText }]);
              }
              setAudioText('');
            } else {
              interim += transcript;
              setAudioText(interim);
            }
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          if (cleanupCalledRef.current) return;
          console.log("Speech Recognition Error:", event.error);
          setIsRecognizing(false); // Ensure state is updated on error
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setError('Microphone access denied. Please allow access.');
          } else if (!['no-speech', 'aborted'].includes(event.error)) { // Allow no-speech/aborted without error display
             setError(`Speech error: ${event.error}`);
          }
          // Don't try to restart automatically on critical errors like 'not-allowed'
        };

        // Initial start only if not muted
        if (!isMuted) {
           try {
              recognition.start();
              // onstart will set isRecognizing = true
           } catch(e) {
              // Can happen if it's already started somehow, log it
              console.warn("Initial speech recognition start failed:", e);
           }
        }

      } catch (err: unknown) {
        setError(`Speech recognition init error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    const initPeer = async () => {
      cleanupCalledRef.current = false;
      try {
        setConnecting(true);
        setError('');

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          // Muted locally to prevent echo, audio still sent via stream
          localVideoRef.current.muted = true;
          localVideoRef.current.play().catch((e) => console.error("Local video play failed:", e));
        }

        initSpeechRecognition(); // Initialize Speech Recognition after getting stream

        const { default: Peer } = await import('peerjs');
        const newPeer = new Peer({
          debug: 2, // Set to 0 or 1 for less verbose logs in production
          config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
        });

        setPeer(newPeer);
        peerDestroyedRef.current = false;

        newPeer.on('open', (id: string) => {
          setPeerId(id);
          setConnecting(false);
          if (!isHost && roomId) {
              console.log(`Attempting to connect to host: ${roomId}`);
              initiateConnection(newPeer, roomId);
          } else if (isHost) {
              console.log(`Host Peer ID: ${id}. Waiting for connections.`);
          }
        });

        newPeer.on('error', (err: PeerError) => {
          if (peerDestroyedRef.current || err.type === 'peer-unavailable') {
              // Don't show error if peer is intentionally destroyed or just unavailable during connection attempt
              if(err.type === 'peer-unavailable' && !isHost) {
                  setError(`Could not connect to host (${roomId}). Please check the Room ID.`);
              } else if (err.type !== 'peer-unavailable') {
                 console.error('PeerJS error:', err);
                 setError(`Connection error: ${err.message} (Type: ${err.type})`);
              }
              setConnecting(false); // Ensure connecting state is updated
              return;
          }
          console.error('PeerJS error:', err);
          setError(`Connection error: ${err.message} (Type: ${err.type})`);
          setConnecting(false);
        });

        newPeer.on('disconnected', () => {
          if (peerDestroyedRef.current) return;
          console.log('Peer disconnected. Attempting reconnect...');
          setError('Connection lost. Reconnecting...');
          // PeerJS attempts reconnection automatically by default unless destroy() is called
          // If manual reconnection is needed: setTimeout(() => newPeer.reconnect(), 5000);
        });

        newPeer.on('call', (call) => {
           console.log("Incoming call...");
          if (localStreamRef.current) {
            call.answer(localStreamRef.current); // Answer the call with stream

            call.on('stream', (remoteStream: MediaStream) => {
              console.log("Received remote stream");
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play().catch((e) => console.error("Remote video play failed:", e));
                setCallEstablished(true); // Mark call as established once stream received
              }
            });

            call.on('close', () => {
              console.log("Call closed");
              setCallEstablished(false);
              if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
            });
            call.on('error', (err: PeerError) => {
                 console.error('Call error:', err);
                 setError(`Call error: ${err.message}`);
                 setCallEstablished(false);
                 if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
            });
          } else {
              console.error("Cannot answer call: Local stream not available.");
          }
        });

        newPeer.on('connection', (conn) => {
            console.log("Incoming data connection...");
            setupDataConnection(conn as PeerJSDataConnection);
        });

      } catch (err: unknown) {
        console.error("Initialization error:", err);
        let message = 'Unknown error during setup.';
        if (err instanceof Error) {
            message = err.message;
             // Provide more specific feedback for common errors
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                message = 'Camera/Microphone access denied. Please allow access in your browser settings.';
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                 message = 'No camera/microphone found. Please ensure they are connected and enabled.';
            }
        }
        setError(message);
        setConnecting(false);
        // Ensure stream is stopped if partially obtained before error
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach(track => track.stop());
          localStreamRef.current = null!;
        }
      }
    };

    initPeer();

    // Cleanup function
    return () => {
      console.log("Running cleanup...");
      cleanupCalledRef.current = true;
      setIsRecognizing(false); // Ensure state reflects recognition stopped

      // Stop media tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null!;
      }

      // Clear video elements
      [localVideoRef, remoteVideoRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.srcObject = null;
        }
      });

      // Stop speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onstart = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors during cleanup stop
          console.log('Ignoring cleanup recognition error:', e);
        }
        recognitionRef.current = null!;
      }

       // Destroy PeerJS connection
      if (peer) {
        console.log("Destroying Peer object");
        peerDestroyedRef.current = true;
        // Close connections manually before destroying
        connectionsRef.current.forEach(conn => conn.close());
        peer.destroy();
        setPeer(null);
      }

       // Reset state variables
      setPeerId('');
      setConnections([]);
      connectionsRef.current = []; // Clear the ref too
      setTranscripts([]);
      setAudioText('');
      setCallEstablished(false);
      setPeerName('');
      setError('');
      setConnecting(false); // Ensure connecting is false on cleanup
      setIsMuted(false); // Reset mute state
      console.log("Cleanup complete.");
    };
    // Ensure dependencies cover all used variables and functions from outer scope
  }, [roomId, isHost, userName, initiateConnection, setupDataConnection]); // Removed isMuted, isRecognizing from here as they are managed internally or via toggleMute

  const copyRoomId = () => {
    if (peerId) {
        navigator.clipboard.writeText(peerId)
          .then(() => alert('Room ID copied!'))
          .catch((err) => {
              console.error('Failed to copy Room ID:', err);
              setError('Failed to copy Room ID. Check browser permissions.');
          });
    } else {
        setError("Cannot copy Room ID: Connection not established yet.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Error Display Area */}
      {error && (
        <div className="md:col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError('')}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            aria-label="Close error message"
          >
            {/* Simple X icon */}
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </button>
        </div>
      )}

      {/* Left Column: Local Video & Controls */}
      <div className="space-y-4">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video shadow-md">
          <video
            ref={localVideoRef}
            autoPlay
            muted // Keep muted locally to prevent echo
            playsInline
            className="w-full h-full object-cover"
            aria-label="My video feed"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
            {userName} (You) {isMuted ? <span className="text-red-400 ml-1">(Muted)</span> : ''}
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Connection & Controls</h2>

           {/* Connection Status */}
           <div className="mb-2">
               {connecting && <p className="text-gray-600 animate-pulse">Connecting...</p>}
               {!connecting && peerId && <p className="text-green-700 font-semibold">Connected</p>}
               {!connecting && !peerId && !error && <p className="text-orange-600">Idle</p>}
            </div>


          {/* Room ID Display (Host Only) */}
          {isHost && peerId && (
            <div className="mb-3 border-t pt-3 mt-3">
              <p className="text-sm text-gray-600 mb-1">Share this Room ID:</p>
              <div className="flex items-center space-x-2">
                <input
                    type="text"
                    readOnly
                    value={peerId}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm flex-grow border border-gray-300 focus:outline-none"
                    aria-label="Room ID"
                 />
                <button
                  onClick={copyRoomId}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-150 ease-in-out flex-shrink-0"
                  disabled={!peerId}
                  aria-label="Copy Room ID"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Mic Mute Button */}
           <div className="mt-3 pt-3 border-t">
               <button
                 onClick={toggleMute}
                 disabled={!localStreamRef.current || connecting} // Disable if stream not ready or connecting
                 className={`w-full px-4 py-2 rounded text-white font-medium transition duration-150 ease-in-out ${
                   isMuted
                     ? 'bg-red-500 hover:bg-red-600'
                     : 'bg-green-500 hover:bg-green-600'
                 } ${(!localStreamRef.current || connecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                 aria-pressed={isMuted}
               >
                 {isMuted ? 'Unmute Mic' : 'Mute Mic'}
               </button>
            </div>


          {/* Debug/Dev Tools */}
          <div className="mt-3 pt-3 border-t">
             <p className="text-xs text-gray-500 mb-1">Dev Tools:</p>
             <button onClick={() => console.log("Current Transcripts:", transcripts)} className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs">
                Log Transcripts
             </button>
             <button onClick={() => console.log("Peer:", peer, "Connections:", connectionsRef.current, "Recognizing:", isRecognizing, "Muted:", isMuted)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs">
                Log State
             </button>
           </div>

          {/* Conditionally render TranscriptProcessor based on isHost */}
          {isHost && <TranscriptProcessor transcripts={transcripts} />}

          {/* Peer Connection Status */}
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-700">
              {callEstablished
                ? <span className="text-green-700 font-semibold">Call established with: {peerName || 'Peer'}</span>
                : peerId // Show waiting only if we are connected but call isn't established
                  ? (isHost ? 'Waiting for participant to join...' : 'Attempting to establish call...')
                  : (!connecting ? 'Ready to connect.' : '') // If not connecting and no peerId
                }
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Remote Video & Transcription */}
      <div className="space-y-4">
        <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video shadow-md flex items-center justify-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`w-full h-full object-cover ${!callEstablished ? 'hidden' : ''}`} // Hide video element if not established
            aria-label="Peer's video feed"
          />
          {callEstablished && peerName && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
              {peerName}
            </div>
          )}
          {/* Placeholder when no call */}
          {!callEstablished && (
            <div className="text-center text-gray-400">
              {connecting ? 'Initializing...' : (peerId ? (isHost ? 'Waiting for connection...' : 'Connecting to host...') : 'Not connected.')}
            </div>
          )}
        </div>

        {/* Transcription Display */}
        <Transcription
          transcripts={transcripts}
          currentAudioText={audioText}
          userName={userName}
        />
      </div>
    </div>
  );
}