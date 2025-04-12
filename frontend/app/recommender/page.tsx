"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Info, Check, RotateCw, Loader2, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HumanBody from "@/components/humanbody"
import OverlayMenu from '@/components/leftoverlay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation';

export default function RecommenderPage() {
  // --- State for Form Inputs ---
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [organFunction, setOrganFunction] = useState("")
  const [allergies, setAllergies] = useState("")
  const [severity, setSeverity] = useState(5)
  const [conditionStage, setConditionStage] = useState("")
  const [gender, setGender] = useState(""); // New State for Gender

  // --- State for UI and API Interaction ---
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Symptoms from checkboxes/overlay
  const [symptomsInputText, setSymptomsInputText] = useState("");   // NEW: Raw text from the Textarea
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cautions, setCautions] = useState<string[]>([]);

  const router = useRouter();

  // --- Sync selectedItems from OverlayMenu to the symptomsInputText ---
  useEffect(() => {
    setSymptomsInputText(selectedItems.join(", "));
  }, [selectedItems]);

  // --- Handle Body Part Click ---
  const handleBodyPartClick = (title: string) => {
    setSelectedPart(title);
    setSelectedBodyPart(title);
    console.log("Body part clicked:", title);
    setIsMenuOpen(true);
  };

  // --- Handle Form Submission and API Call ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const finalSymptomsArray = symptomsInputText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const API_BASE_URL = "http://localhost:5001/api/recommend";
    const params = new URLSearchParams();

    if (age) params.append("age", age);
    if (location) params.append("location", location);
    if (weight) params.append("weight", weight);
    if (height) params.append("height", height);
    if (organFunction) params.append("organFunction", organFunction);
    if (allergies) params.append("allergies", allergies);
    params.append("severity", severity.toString());
    if (conditionStage) params.append("conditionStage", conditionStage);
    if (gender) params.append("gender", gender); // Add Gender Parameter
    if (finalSymptomsArray.length > 0) params.append("symptoms", finalSymptomsArray.join(","));
    if (selectedBodyPart) params.append("selectedBodyPart", selectedBodyPart);

    const apiUrl = `${API_BASE_URL}?${params.toString()}`;

    console.log("Sending request to:", apiUrl);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        let errorMessage: string;
        try {
          const errJson = await response.json();
          errorMessage = errJson.error ?? JSON.stringify(errJson);
        } catch {
          errorMessage = await response.text();
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorMessage}`);
      }

      const data = await response.json();

      // Redirect to the result page with the data
      router.push(`/recommender/result?data=${encodeURIComponent(JSON.stringify(data))}`);

    } catch (err: any) {
      console.error("API request failed:", err);
      setError(err.message || "An unknown error occurred while fetching recommendations.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay Menu */}
      <OverlayMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        selectedPart={selectedPart}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">AI Medicine Recommender</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - User Inputs */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                  <CardDescription>Enter your details for personalized medicine recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="Enter your age" className="bg-background" value={age} onChange={(e) => setAge(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, Country" className="bg-background" value={location} onChange={(e) => setLocation(e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input id="weight" type="number" placeholder="Enter weight" className="bg-background" value={weight} onChange={(e) => setWeight(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input id="height" type="number" placeholder="Enter height" className="bg-background" value={height} onChange={(e) => setHeight(e.target.value)} />
                      </div>
                    </div>
                      {/* Gender Select */}
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger id="gender" className="bg-background">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    <div className="space-y-2">
                      <Label htmlFor="organ-function">Organ Function</Label>
                      <Select value={organFunction} onValueChange={setOrganFunction}>
                        <SelectTrigger id="organ-function" className="bg-background">
                          <SelectValue placeholder="Select organ function status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="kidney-impaired">Kidney Impairment</SelectItem>
                          <SelectItem value="liver-impaired">Liver Impairment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Known Allergies</Label>
                      <Textarea id="allergies" placeholder="List any known allergies (e.g., penicillin, aspirin)" className="bg-background" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="severity">Symptom Severity</Label>
                        <span className="text-sm text-muted-foreground">{severity}/10</span>
                      </div>
                      <Slider id="severity" min={1} max={10} step={1} value={[severity]} onValueChange={(value) => setSeverity(value[0])} className="py-4" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stage">Condition Stage</Label>
                      <Select value={conditionStage} onValueChange={setConditionStage}>
                        <SelectTrigger id="stage" className="bg-background">
                          <SelectValue placeholder="Select condition stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acute">Acute (Recent onset)</SelectItem>
                          <SelectItem value="subacute">Subacute (Few weeks)</SelectItem>
                          <SelectItem value="chronic">Chronic (Months/Years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Symptoms Textarea */}
                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Symptoms</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Textarea
                              id="symptoms"
                              placeholder="Click body part or manually list symptoms (comma-separated)"
                              className="bg-background"
                              value={symptomsInputText}
                              onChange={(e) => setSymptomsInputText(e.target.value)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Symptoms selected via the body model will appear here. You can also add/edit manually, separated by commas.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {selectedBodyPart && (
                      <div className="flex items-center text-sm text-blue-400 mb-2">
                        <Info className="h-4 w-4 mr-2" />
                        <span>Selected body part: {selectedBodyPart.charAt(0).toUpperCase() + selectedBodyPart.slice(1)}</span>
                      </div>
                    )}

                    <Button type="submit" className="w-full interactive-card blue-button-hover" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Recommendation"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Panel - Human Body Model */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle>Interactive Body Model</CardTitle>
                  <CardDescription>Click on the affected body part to add symptoms</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div>
                    <HumanBody onBodyPartClick={handleBodyPartClick} />
                  </div>
                   {error && (
                      <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                   )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}