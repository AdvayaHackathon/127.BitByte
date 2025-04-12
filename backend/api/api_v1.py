from flask import Flask, request, jsonify
from flask_cors import CORS
from ai import GeminiClient, DeepseekClient, Compare
import json
from imageretrieval import GetMedicineImage

# Initialize Flask app
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) for all routes
# Restrict origins in production: CORS(app, origins=["http://localhost:3000", "https://your-frontend-domain.com"])
CORS(app)

i1 = GeminiClient()
i2 = DeepseekClient()
data = []


# --- API Route ---
@app.route('/api/recommend', methods=['GET'])
def get_data_summary():
    """
    API endpoint that receives patient data and returns it
    formatted as a single summary string within a JSON object.
    Now includes JSON decoding of model output.
    """
    print("\n--- Received Request (Data Summary API) ---")
    try:
        # --- 1. Get Data from Query Parameters ---
        age_str = request.args.get('age')
        age = age_str if age_str else "Not Provided"
        location = request.args.get('location', 'Unknown')
        weight_str = request.args.get('weight')
        weight = weight_str if weight_str else "Not Provided"
        height_str = request.args.get('height')
        height = height_str if height_str else "Not Provided"
        organ_function = request.args.get('organFunction', 'normal')
        allergies_str = request.args.get('allergies', '')
        allergies = allergies_str if allergies_str else "None"
        severity = request.args.get('severity', '5')
        condition_stage = request.args.get('conditionStage', 'unknown')
        symptoms_str = request.args.get('symptoms', '')
        symptoms = symptoms_str if symptoms_str else "None"
        selected_body_part = request.args.get('selectedBodyPart', 'None')

        # Log received data
        print(f"Age: {age}, Location: {location}, Weight: {weight}, Height: {height}")
        print(f"Organ Function: {organ_function}, Allergies: {allergies}")
        print(f"Severity: {severity}, Stage: {condition_stage}, Body Part: {selected_body_part}")
        print(f"Symptoms: {symptoms}")

        # --- 2. Generate Response from AI ---
        d1_raw = i1.generate(age, "male", location, height, weight, organ_function, allergies, symptoms)

        try:
            d1 = json.loads(d1_raw)  # Decode JSON string
        except json.JSONDecodeError as e:
            print(f"Failed to decode JSON from GeminiClient: {e}")
            print(f"Raw response from GeminiClient: {d1_raw}")  # Print raw response
            return jsonify({"error": "Failed to decode AI response. Check server logs."}), 500

        data.append(d1)

        # --- 3. Prepare and Send Response ---
        print("--- Sending Data Summary Response ---")
        print(d1)
        return jsonify(d1), 200  # Send decoded JSON directly

    except Exception as e:
        print(f"--- Error: Internal server error --- \n{e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "An internal server error occurred processing the request."}), 500


# --- Run the App ---
if __name__ == '__main__':
    # Use port 5001 (or any other free port different from your frontend)
    app.run(debug=True, port=5001)