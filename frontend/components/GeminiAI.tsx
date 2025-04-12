import React, { useEffect, useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface DiseaseInfo {
    Name: string;
    rationale: string;
    description: string;
    likelihood: 'high' | 'medium' | 'small';
}

interface OtherInfo {
    key: string;
}

interface ResponseData {
    disease: DiseaseInfo;
    otherInfo: OtherInfo;
}

interface TranscriptProcessorProps {
    transcripts: { name: string; text: string }[];
}

const TranscriptProcessor: React.FC<TranscriptProcessorProps> = ({ transcripts }) => {
    const [combinedText, setCombinedText] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<ResponseData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log('Received transcripts in TranscriptProcessor:', transcripts);

        // Combine transcripts into a single string
        if (transcripts && transcripts.length > 0) {
            const combined = transcripts.map(t => `${t.name}: ${t.text}`).join('\n');
            console.log('Combined transcript text:', combined);
            setCombinedText(combined); // Update state with combined text
        } else {
            setCombinedText(null); // Set combinedText to null when transcripts is empty or null
        }
    }, [transcripts]);

    const beforeprompt = `
You are a medical AI assistant.
Your task is to analyze the following doctor–patient consultation transcript and identify possible relevant diseases.
– Only suggest diseases if the transcript includes explicit medical data (e.g., symptoms, duration, severity).
  If there is insufficient medical information, return a JSON object with an empty diseases array.
– Output only valid JSON, nothing else.
– Top-level key: diseases (an array).
– Each element must be an object with two keys:
  1. disease: an object containing:
     - name (string)
     - rationale (string): why this disease fits (linking transcript clues)
     - description (string): a brief overview of the disease
     - likelihood (string enum: "high", "medium", or "low")
  2. otherInfo: an object containing:
     - id (string): a unique identifier (e.g., UUID or slug)

Schema example:
{
  "diseases": [
    {
      "disease": {
        "name": "Asthma",
        "rationale": "Patient reports episodic wheezing and shortness of breath, worse at night.",
        "description": "A chronic inflammatory disease of the airways causing reversible airflow obstruction.",
        "likelihood": "high"
      },
      "otherInfo": {
        "id": "asthma-001"
      }
    }
  ]
}
Ensure the model produces only this JSON structure and nothing else.
`;


    useEffect(() => {
        if (combinedText) {
            const ai = new GoogleGenAI({ apiKey: "AIzaSyAs0EnzNM1JVXS33XTxuZUm3uJh2Lsd484" }); // Replace with your actual API key

            async function main() {
                setIsLoading(true);
                setError(null);

                try {
                    const prompt =  beforeprompt + `\nTranscript:\n${combinedText}`;

                    const response = await ai.models.generateContent({
                        model: 'gemini-2.0-flash',
                        contents: prompt,
                        config: {
                            responseMimeType: 'application/json',
                            responseSchema: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        disease: {
                                            type: Type.OBJECT,
                                            properties: {
                                                Name: { type: Type.STRING, description: 'Name of the disease', nullable: false },
                                                rationale: { type: Type.STRING, description: "why this disease fits (linking transcript clues)", nullable: false },
                                                description: { type: Type.STRING, description: 'a brief overview of the disease.', nullable: false },
                                                likelihood: {
                                                    type: Type.STRING,
                                                    enum: ['high', 'medium', 'small', 'none'],
                                                    description: 'Likelihood of getting the disease',
                                                    nullable: false
                                                },
                                            },
                                            required: ['Name', 'rationale', 'description', 'likelihood'],
                                            description: 'Information about the disease',
                                        },
                                        otherInfo: {
                                            type: Type.OBJECT,
                                            properties: {
                                                key: {
                                                    type: Type.STRING,
                                                    description: 'Unique identifier for the disease',
                                                    nullable: false,
                                                },
                                            },
                                            required: ['key'],
                                            description: 'Other information related to the disease',
                                        },
                                    },
                                    required: ['disease', 'otherInfo'],
                                },
                            },
                        },
                    });

                    console.log("RESPONSE", response.text);
                    try {
                      setResponseData(JSON.parse(response.text));
                    } catch(e: any) {
                      setError(`Error parsing JSON: ${e.message}. Raw response: ${response.text}`);
                      setResponseData(null); // Clear any previous data
                    }


                } catch (err: any) {
                    console.error("Error generating content:", err);
                    setError(err.message || "An error occurred.");
                } finally {
                    setIsLoading(false);
                }
            }

            main();
        }
    }, [combinedText]);

    const getLikelihoodColor = (likelihood: string) => {
        switch (likelihood) {
            case 'high': return 'bg-red-200 text-red-800';
            case 'medium': return 'bg-yellow-200 text-yellow-800';
            case 'small': return 'bg-green-200 text-green-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                <span className="inline-block mr-2 align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-4.037m-7.32.732V5a7.5 7.5 0 00-7.5-7.5H4.5a7.5 7.5 0 007.5 7.5v13.189m-7.321-.732A9.004 9.004 0 003.284 4.037" />
                    </svg>
                </span>
                Transcript Analysis & Potential Health Insights
            </h2>

            {isLoading && (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
                    <p className="mt-2 text-gray-600">Analyzing transcript...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {responseData && responseData.length > 0 && (
                <div className="mt-6 overflow-x-auto"> {/* Make table scrollable */}
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Potential Conditions Identified:</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Disease Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rationale
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Likelihood
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Key
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {responseData.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.disease.Name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {item.disease.rationale.substring(0, 100)}...
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {item.disease.description.substring(0, 120)}...
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${getLikelihoodColor(item.disease.likelihood)} mr-2`}>
                                            {item.disease.likelihood}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.otherInfo.key}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!isLoading && !error && (!responseData || responseData.length === 0) && (
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        {combinedText ? 'No potential conditions identified in the transcript.' : 'No transcripts available.'}
                    </p>
                </div>
            )}

            {combinedText && (
                <div className="mt-6">
                    <details className="bg-gray-50 rounded-md p-2">
                        <summary className="font-semibold text-gray-700 cursor-pointer">Show Transcript</summary>
                        <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{combinedText}</p>
                    </details>
                </div>
            )}
        </div>
    );
};

export default TranscriptProcessor;