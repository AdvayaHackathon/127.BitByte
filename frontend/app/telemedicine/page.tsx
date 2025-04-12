"use client";

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, PlusCircle, Video } from 'lucide-react'; // Added icons
import { generateRoomId } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Navbar from "@/components/navbar"; // Added Navbar
import Footer from "@/components/footer"; // Added Footer

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState<string>('');

  const handleHost = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    const roomId = generateRoomId();
    router.push(`/host?room=${roomId}&name=${encodeURIComponent(name)}`);
  };

  const handleJoin = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    router.push(`/join?name=${encodeURIComponent(name)}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <Card className="glass-card"> {/* Apply similar card style if defined */}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
                   <Video className="mr-2 h-6 w-6 text-primary" /> {/* Icon */}
                   Video Consultation
                </CardTitle>
                <CardDescription className="text-center pt-2">
                  Enter your name to host or join a video call.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                 <Button onClick={handleHost} className="w-full interactive-card blue-button-hover"> {/* Style button */}
                  <PlusCircle className="mr-2 h-4 w-4" /> {/* Icon */}
                  Host New Room
                </Button>
                <Button onClick={handleJoin} variant="secondary" className="w-full"> {/* Secondary button */}
                  <LogIn className="mr-2 h-4 w-4" /> {/* Icon */}
                  Join Existing Room
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}