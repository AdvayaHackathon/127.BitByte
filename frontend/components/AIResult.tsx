import React, { useEffect, useState } from 'react';

interface TranscriptProcessorProps {
  transcripts: { name: string; text: string }[];
}

const TranscriptProcessor: React.FC<TranscriptProcessorProps> = ({ transcripts }) => {
  const [combinedText, setCombinedText] = useState<string | null>(null); // Initialize as null

  useEffect(() => {
    console.log('Received transcripts in TranscriptProcessor:', transcripts);

    // Combine transcripts into a single string
    if (transcripts && transcripts.length > 0) { // Add a check
      const combined = transcripts.map(t => `${t.name}: ${t.text}`).join('\n');
      console.log('Combined transcript text:', combined);
      setCombinedText(combined); // Update state with combined text
    } else {
      setCombinedText(null); // Set combinedText to null when transcripts is empty or null
    }
    // You could trigger other actions here, like sending the data to an API,
    // performing sentiment analysis, or updating other state.
  }, [transcripts]);  // This effect runs whenever the 'transcripts' prop changes.

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Transcript Processor</h3>
      <p className="text-sm text-gray-600">
        Processing transcripts... (See console for output)
      </p>
      <p className='text-sm text-black mt-2'>
        {combinedText !== null ? combinedText : 'No transcripts available.'}
      </p>
      {/* You might add a loading indicator or some status message here */}
    </div>
  );
};

export default TranscriptProcessor;