"use client";

import { useState, FormEvent, ChangeEvent, Suspense } from 'react'; // Added Suspense, ChangeEvent
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, ArrowLeft, Info, User, LogOut } from 'lucide-react'; // Added icons
import VideoCall from '@/components/VideoCall';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Use Badge for Room ID
import Navbar from "@/components/navbar"; // Added Navbar
import Footer from "@/components/footer"; // Added Footer


// Helper component to read search params
function JoinContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [roomId, setRoomId] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const [error, setError] = useState<string>(''); // For input validation

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous error
    if (!roomId.trim()) {
      setError('Please enter a valid Room ID.');
      return;
    }
    // Add more sophisticated Room ID validation if needed here
    setJoined(true);
  };

  if (!name) {
     return (
       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
          <Card className="w-full max-w-md glass-card">
           <CardHeader>
             <CardTitle className="text-destructive flex items-center justify-center">
                <Info className="mr-2 h-5 w-5" /> Error
             </CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground mb-4">Missing user name.</p>
             <Link href="/">
               <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
               </Button>
             </Link>
           </CardContent>
         </Card>
       </div>
     );
   }

  // Show Join Form if not joined
  if (!joined) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="w-full max-w-md"
         >
           <Card className="glass-card">
             <CardHeader>
               <CardTitle className="text-2xl">Join a Room</CardTitle>
               <CardDescription>Enter the Room ID provided by the host.</CardDescription>
             </CardHeader>
             <form onSubmit={handleJoin}>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="roomId">Room ID</Label>
                   <Input
                     id="roomId"
                     value={roomId}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)}
                     placeholder="Enter Room ID"
                     required
                     aria-describedby="roomId-error" // For accessibility
                   />
                   {error && <p id="roomId-error" className="text-sm text-destructive mt-1">{error}</p>}
                 </div>
               </CardContent>
               <CardFooter className="flex justify-between">
                  <Link href="/" passHref legacyBehavior>
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                  </Link>
                 <Button type="submit" className="interactive-card blue-button-hover">
                    <LogIn className="mr-2 h-4 w-4" /> Join Room
                 </Button>
               </CardFooter>
             </form>
           </Card>
         </motion.div>
       </div>
    );
  }

  // Show Video Call view if joined
  return (
     <div className="space-y-6">
       <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
       >
         <Card className="glass-card">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-lg font-medium flex items-center">
               <User className="mr-2 h-5 w-5 text-primary" /> Participant: {name}
             </CardTitle>
              <Link href="/" passHref legacyBehavior>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-1" /> Leave Room
                </Button>
              </Link>
           </CardHeader>
           <CardContent>
              <div className="text-sm text-muted-foreground">Room ID:</div>
              <div className="flex items-center space-x-2 mt-1">
                 <Badge variant="secondary" className="text-base px-3 py-1">{roomId}</Badge>
              </div>
           </CardContent>
         </Card>
       </motion.div>

       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.2 }}
         className="aspect-video bg-muted rounded-lg overflow-hidden" // Placeholder container
       >
         <VideoCall roomId={roomId} isHost={false} userName={name} />
       </motion.div>
     </div>
  );
}

export default function JoinPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Wrap content reading searchParams in Suspense */}
          <Suspense fallback={<div>Loading...</div>}>
            <JoinContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}