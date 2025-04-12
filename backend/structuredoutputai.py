import json
from typing import Dict, Any
from google import genai

# JSON‐schema dict for the Gemini SDK:
TREATMENT_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "disease": {
            "type": "STRING",
            "description": "Name of the disease"
        },
        "medications": {
            "type": "ARRAY",
            "description": "List of recommended medications",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "medicine": {
                        "type": "STRING",
                        "description": "Name of the medicine with dosage form"
                    },
                    "dosage": {
                        "type": "STRING",
                        "description": "Amount per dose, e.g. '500mg'"
                    },
                    "frequency": {
                        "type": "STRING",
                        "description": "Number only, e.g. '2'"
                    },
                    "duration": {
                        "type": "STRING",
                        "description": "Duration of treatment, e.g. '3 days'"
                    }
                },
                "required": ["medicine", "dosage", "frequency", "duration"]
            }
        }
    },
    "required": ["disease", "medications"]
}


class GeminiClient:
    def __init__(self, model="gemini-2.0-flash"):
        self.client = genai.Client(api_key="AIzaSyB9MbX7j0ZzG6OF-JyeOD4sHVHrYhmvdiA")
        self.model = model
        
    def generate(self, age: int, gender: str, location: str, height: str, weight: str, organ_function: str, allergy: str, symptoms: str, condition_stage: str, severity: str) -> Dict[str, Any]:

        prompt = f"""
        You are a medical assistant. Given the patient details below, identify the disease and list appropriate allopathic IP medicines (with dosage form) in JSON:

        - Age: {age}
        - Gender: {gender}
        - Location: {location}
        - Height: {height}
        - Weight: {weight}
        - Organ function: {organ_function}
        - Allergies: {allergy}
        - Symptoms: {symptoms}
        - condition stage: {condition_stage}
        - symptom severity: {severity}

        Respond **only** with a JSON object matching this schema:
        1. "disease": string  
        2. "medications": array of objects with keys:
        - "medicine": string (include form, e.g. "Paracetamol Tablets")
        - "dosage": string (e.g. "500mg")
        - "frequency": string (number only, e.g. "2")
        - "duration": string (e.g. "3 days")
        """

        response = self.client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": TREATMENT_SCHEMA,
            },
        )

        # Parse and return as Python dict
        return json.loads(response.text)


# Example usage:
if __name__ == "__main__":
    result = GeminiClient().get_disease_treatment(
        age=18,
        gender="male",
        location="Bhilai, India",
        height="180 cm",
        weight="62 kg",
        organ_function="normal",
        allergy="none",
        symptoms="dandruff",
        confition_stage="acute"
    )
    print(result)
    print(json.dumps(result, indent=2))
