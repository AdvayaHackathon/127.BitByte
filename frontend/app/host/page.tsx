"use client";

import { useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react'; // Added useEffect for potential checks
import { motion } from 'framer-motion';
import { Copy, LogOut, User, Info, Video } from 'lucide-react'; // Added Video icon potentially
import VideoCall from '@/components/VideoCall'; // Ensure this path is correct
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar"; // Assuming Navbar component exists
import Footer from "@/components/footer"; // Assuming Footer component exists
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading

// Helper component to read search params because useSearchParams needs Suspense
function HostContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');
  const name = searchParams.get('name');
  const [copied, setCopied] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false); // State to ensure component mounts client-side

  // Ensure component runs only on the client for clipboard and potentially VideoCall setup
  useEffect(() => {
    setIsClient(true);
  }, []);

  const copyRoomId = () => {
    if (roomId && navigator.clipboard) { // Check for navigator.clipboard support
      navigator.clipboard.writeText(roomId)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error("Failed to copy Room ID: ", err);
          // Fallback or alert might be needed for older browsers/http
          alert("Failed to copy. Please copy manually.");
        });
    } else if (roomId) {
      // Basic fallback for environments without navigator.clipboard (less common now)
      try {
        const textArea = document.createElement("textarea");
        textArea.value = roomId;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error("Fallback copy failed: ", err);
         alert("Failed to copy automatically. Please copy the ID manually.");
      }
    } else {
      console.warn("Room ID is null or clipboard API not available, cannot copy.");
    }
  };

  // Display loading or error state if params are missing
  if (!roomId || !name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
         <Card className="w-full max-w-md glass-card">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center justify-center">
               <Info className="mr-2 h-5 w-5" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Missing required Room ID or User Name.</p>
            <Link href="/telemedicine">
              <Button variant="outline">
                Return to Setup
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display loading state until client-side mount is confirmed (important for VideoCall)
  if (!isClient) {
     return (
        <div className="space-y-6">
           <Skeleton className="h-32 w-full" /> {/* Skeleton for header card */}
           <Skeleton className="aspect-video w-full" /> {/* Skeleton for video area */}
        </div>
     );
  }

  // Render the main content once client-side and params are valid
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2">
            <div className="flex-1">
                <CardTitle className="text-lg font-medium flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary flex-shrink-0" /> Host: {name}
                </CardTitle>
                <div className="text-sm text-muted-foreground mt-2">Room ID:</div>
                 <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-base px-3 py-1 break-all">{roomId}</Badge>
                    <Button variant="outline" size="sm" onClick={copyRoomId} className="h-8 px-2 flex-shrink-0">
                      {copied ? (
                        <>Copied!</>
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy Room ID</span>
                    </Button>
                 </div>
                 <CardDescription className="mt-2 text-xs">Share this ID with participants to invite them.</CardDescription>
            </div>
             <Link href="/telemedicine" >
              <Button variant="ghost" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                <LogOut className="h-4 w-4 mr-1" /> Leave Room
              </Button>
            </Link>
          </CardHeader>
          {/* CardContent can be used for more details if needed, otherwise it can be removed if header has all info */}
          {/* <CardContent> Optional </CardContent> */}
        </Card>
      </motion.div>

      {/* Video Call Component Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        // --- REMOVED restrictive styles like overflow-hidden, aspect-video, bg-muted ---
        // --- ADDED styles to provide basic structure and allow VideoCall to render ---
        className="relative w-full rounded-lg border bg-card shadow-sm" // Added background, border, shadow for consistency
        style={{ minHeight: '400px' }} // Added min-height to prevent collapse before video loads
      >
         {/* Render VideoCall only on the client side */}
        <VideoCall roomId={roomId} isHost={true} userName={name} />
      </motion.div>
    </div>
  );
}


export default function HostPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 pb-8"> {/* Added pb-8 for spacing */}
        <div className="container mx-auto px-4 py-8">
          {/* Wrap content reading searchParams in Suspense */}
          {/* Provide a more descriptive fallback for Suspense */}
          <Suspense fallback={
             <div className="space-y-6">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="aspect-video w-full" />
             </div>
           }>
             <HostContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}