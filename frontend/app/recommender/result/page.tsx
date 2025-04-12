"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Pill, Clock, Calendar, Droplet } from "lucide-react";
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface Medication {
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
    imageFilename?: string;
}

interface AIResponse {
    disease: string;
    medications: Medication[];
}

export default function ResultPage() {
    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    const [aiResponseList, setAiResponseList] = useState<AIResponse[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setIsLoading(true);
            try {
                const parsed = JSON.parse(data) as AIResponse[];
                setAiResponseList(parsed);
                setError(null);
            } catch (e: any) {
                console.error("Error parsing data:", e);
                setError(`Failed to process data. Details: ${e.message}`);
                setAiResponseList(null);
            } finally {
                setIsLoading(false);
            }
        } else {
            setError("No data received");
            setIsLoading(false);
        }
    }, [data]);

    const getBaseUrl = () => {
        if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:5001';
        }
        return process.env.NEXT_PUBLIC_BACKEND_URL || '';
    };

    const baseUrl = getBaseUrl();

    return (
        <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-slate-800 border-slate-700 rounded-xl shadow-2xl">
                    <CardHeader className="border-b border-slate-700">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            Diagnosis Report
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                        {error && (
                            <Alert variant="destructive" className="border-red-400 bg-red-900/20">
                                <Terminal className="h-5 w-5 text-red-300" />
                                <AlertTitle className="text-red-200">Processing Error</AlertTitle>
                                <AlertDescription className="text-red-400">{error}</AlertDescription>
                            </Alert>
                        )}

                        {isLoading ? (
                            <div className="space-y-6">
                                <Skeleton className="h-8 w-48 bg-slate-700 rounded" />
                                <div className="space-y-4">
                                    {[0, 1].map((i) => (
                                        <Skeleton key={i} className="h-32 w-full bg-slate-700 rounded-lg" />
                                    ))}
                                </div>
                            </div>
                        ) : aiResponseList?.[0] ? (
                            <div className="space-y-8">
                                <div className="p-4 bg-slate-700/30 rounded-lg">
                                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Diagnosed Condition</h3>
                                    <p className="text-2xl font-bold text-blue-400 capitalize">
                                        {aiResponseList[0].disease}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-200">Recommended Treatment Plan</h3>
                                    {aiResponseList[0].medications?.map((item, index) => (
                                        <Card key={index} className="bg-slate-800 border-slate-700 rounded-lg hover:border-slate-600 transition-colors shadow-lg">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    {item.imageFilename && (
                                                        <div className="md:w-1/3 relative group">
                                                            <img
                                                                src={`${baseUrl}/static/medicine_images/${item.imageFilename}`}
                                                                alt={item.medicine}
                                                                className="rounded-lg border border-slate-700 w-full h-48 object-cover group-hover:border-slate-600 transition-colors"
                                                                onError={(e) => {
                                                                    console.warn("Error loading image:", item.imageFilename);
                                                                    e.currentTarget.style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <Pill className="h-6 w-6 text-emerald-400" />
                                                            <h2 className="text-2xl font-bold text-slate-100 capitalize">{item.medicine}</h2>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <Droplet className="h-5 w-5 text-blue-400" />
                                                                <div>
                                                                    <p className="text-sm text-slate-400">Dosage</p>
                                                                    <p className="text-slate-100 font-medium">{item.dosage}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-5 w-5 text-purple-400" />
                                                                <div>
                                                                    <p className="text-sm text-slate-400">Frequency</p>
                                                                    <p className="text-slate-100 font-medium">{item.frequency}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-5 w-5 text-amber-400" />
                                                                <div>
                                                                    <p className="text-sm text-slate-400">Duration</p>
                                                                    <p className="text-slate-100 font-medium">{item.duration}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 space-y-4">
                                <Terminal className="h-12 w-12 text-slate-600 mx-auto" />
                                <p className="text-slate-400">No treatment data available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}