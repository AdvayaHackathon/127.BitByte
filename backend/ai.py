from google import genai
from google.genai import types
from openai import OpenAI
import math

gemini_client = genai.Client(
    api_key="AIzaSyB9MbX7j0ZzG6OF-JyeOD4sHVHrYhmvdiA",
)

class GeminiClient:
    def __init__(self, model="gemini-2.0-flash"):
        self.model = model
    def generate(self, age: int, gender: str, location: str, height: str, weight: str, organ_function: str, allergy: str, symptoms: str):
        prompt = f"""
            You are a medical assistant. Given the following details:
            - Age: {age}
            - Gender: {gender}
            - Location: {location}
            - Height: {height} ft
            - Weight: {weight} kg
            - Organ function: {organ_function}
            - Allergies: {allergy}
            - Symptoms: {symptoms} (symptoms is acute)

            From these medical details, you need to find the disease.

            Provide allopathy IP medicines suitable for treating disease. Append the dosage form (e.g., tablets, syrup, etc.) after each medicine name.

            Instructions:
            - Respond with only the disease, medicine names and their dosage forms. You can choose the number of medicines based on the severity of the disease.
            - Do not include any additional information or meta commentary.
            - example : [
                "disease": "Flu"
                "medication": "Artesunate Tablets",
                "dosage": "200mg",
                "frequency": "2" (number only no words),
                "duration": "3 days"
                ]
        """
        

        model = self.model #gemini-2.5-pro-exp-03-25
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=prompt),
                ],
            ),
        ]
        generate_content_config = types.GenerateContentConfig(
            response_mime_type="application/json",
        )

        result = ""
        for chunk in gemini_client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
        ):
            result += chunk.text
        
        return result


openai_client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="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",
)

class DeepseekClient:
    def __init__(self, model="deepseek/deepseek-r1-zero:free"):
        self.model = model

    def clean_data(self, data):
        prefix = r'\boxed{'
        if data.startswith(prefix) and data.endswith('}'):
            cleaned_data = data[len(prefix):-1]
        else:
            cleaned_data = data
        return cleaned_data
    
    def generate(self, age: int, gender: str, location: str, height: str, weight: str, organ_function: str, allergy: str, symptoms: str):
        prompt = f"""
            You are a medical assistant. Given the following details:
            - Age: {age}
            - Gender: {gender}
            - Location: {location}
            - Height: {height} cm
            - Weight: {weight} kg
            - Organ function: {organ_function}
            - Allergies: {allergy}
            - Symptoms: {symptoms} (symptoms started 2 days ago)

            From these medical details, you need to find the disease.

            Provide allopathy IP medicines suitable for treating disease. Append the dosage form (e.g., tablets, syrup, etc.) after each medicine name.

            Instructions:
            - Respond with only the medicine names and their dosage forms. You can choose the number of medicines based on the severity of the disease.
            - Do not include any additional information or meta commentary.
            - example : [
                "medication": "Artesunate Tablets",
                "dosage": "200mg",
                "frequency": "2" (number only no words),
                "duration": "3 days"
                ]
        """

        completion = openai_client.chat.completions.create(
        extra_body={},
        model=self.model,
        messages=[
            {
            "role": "user",
            "content": prompt
            }
        ]
        )
        return self.clean_data(completion.choices[0].message.content)
    
class Compare:
    def __init__(self, client1, client2, model1, model2):
        self.model1 = model1
        self.model2 = model2
        self.client_1 = client1
        self.client_2 = client2

    def clean_data(self, data):
        prefix = r'\boxed{'
        if data.startswith(prefix) and data.endswith('}'):
            cleaned_data = data[len(prefix):-1]
        else:
            cleaned_data = data
        return cleaned_data
        
    def generate(self, age: int, gender: str, location: str, height: str, weight: str, organ_function: str, allergy: str, symptoms: str):
        prompt = f"""
        You are provided with a clinical profile for a patient along with two medication recommendations (Output 1 and Output 2) generated by two different models. Your task is to evaluate these recommendations based solely on the patient’s clinical details and return exactly the original text of the recommendation that is best suited for this patient. Do not include any additional commentary, analysis, or modifications—simply output either Output 1 or Output 2.
        Patient Clinical Profile:
        - Age: {age}
        - Gender: {gender}
        - Location: {location}
        - Height: {height} cm
        - Weight: {weight} kg
        - Organ function: {organ_function}
        - Allergies: {allergy}
        - Symptoms: {symptoms} (symptoms started 2 days ago)

        Medication Recommendations:
        - Output 1 [0]: {self.client_1}
        - Output 2 [1]: {self.client_2}

        Instructions:
        1. Analyze the patient’s profile and determine which recommendation is most appropriate for treating {symptoms} given the clinical context.
        2. Return 0 if output 1 is better than output 2 else return 1, without any additional explanation or commentary.
        """

        completion = openai_client.chat.completions.create(
        extra_body={},
        model=self.model1,
        messages=[
            {
            "role": "user",
            "content": prompt
            }
        ]
        )
        data1 = self.clean_data(completion.choices[0].message.content)

        model = self.model2 #gemini-2.5-pro-exp-03-25
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=prompt),
                ],
            ),
        ]
        generate_content_config = types.GenerateContentConfig(
            response_mime_type="application/json",
        )

        result = ""
        for chunk in gemini_client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
        ):
            result += chunk.text
        
        data2 = result

        print("Data1: ", data1)
        print("Data2: ", data2)

        return math.floor((int(data1) + int(data2))/2)


if __name__ == "__main__":
    i1 = GeminiClient().generate(19, "male", "chhattisgarh, India", "5.8", "58", "normal", "none", "dandruff")
    print(i1)
    # i2 = DeepseekClient().generate(18, "male", "India", "5.8", "70", "normal", "none", "common cold")
    # print(i2)
    # print(Compare(str(i1), str(i2), "deepseek/deepseek-r1-zero:free", "gemini-2.0-flash").generate(18, "male", "India", "5.8", "70", "normal", "none", "common cold"))