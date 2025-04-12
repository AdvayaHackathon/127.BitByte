"use client";

import { useEffect, useRef } from 'react';

interface Transcript {
  name: string;
  text: string;
}

interface TranscriptionProps {
  transcripts: Transcript[];
  currentAudioText: string;
  userName: string;
}

export default function Transcription({ transcripts, currentAudioText, userName }: TranscriptionProps) {
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new transcripts are added
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcripts, currentAudioText]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Live Transcription</h2>
      <div className="h-64 overflow-y-auto p-2 bg-gray-50 rounded">
        {transcripts.map((transcript, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{transcript.name}: </span>
            <span>{transcript.text}</span>
          </div>
        ))}

        {currentAudioText && (
          <div className="mb-2 text-gray-500 italic">
            <span className="font-semibold">{userName} (typing): </span>
            <span>{currentAudioText}</span>
          </div>
        )}

        <div ref={transcriptEndRef} />
      </div>
    </div>
  );
}