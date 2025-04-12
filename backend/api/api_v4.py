from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
# from ai import GeminiClient, DeepseekClient, Compare  # Ensure these are adapted or removed if not needed
import json
import os
from icrawler.builtin import GoogleImageCrawler
from PIL import Image
import uuid  # For generating unique filenames
import re  # Import re
from structuredoutputai import GeminiClient

# Initialize Flask app
app = Flask(__name__, static_folder='static')  # Specify static folder
CORS(app)

# Static directory for serving images
UPLOAD_FOLDER = os.path.abspath('static/medicine_images')  # Use absolute path
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

i1 = GeminiClient()
data = []


def get_medicine_image(medicine_name):
    """Downloads an image for the given medicine name and returns the filename."""
    output_dir = app.config['UPLOAD_FOLDER']
    os.makedirs(output_dir, exist_ok=True)
    print(f"Output directory for images: {output_dir}")

    google_crawler = GoogleImageCrawler(storage={'root_dir': output_dir})

    try:
        print(f"Crawling for image: {medicine_name}")
        google_crawler.crawl(keyword=medicine_name, max_num=1)
        print(f"Crawling completed for: {medicine_name}")
    except Exception as crawl_error:
        print(f"Error during image crawling for {medicine_name}: {crawl_error}")
        return None

    files = os.listdir(output_dir)
    print(f"Files found in output directory: {files}")

    if files:
        img_path = os.path.join(output_dir, files[0])
        print(f"Original image path: {img_path}")

        unique_id = str(uuid.uuid4())
        file_extension = os.path.splitext(img_path)[1]
        new_filename = re.sub(r'[^a-zA-Z0-9\.]', '', f"{unique_id}{file_extension}")
        new_path = os.path.join(output_dir, new_filename)

        try:
            os.rename(img_path, new_path)
            print(f"Image saved with filename: {new_filename}")
            print(f"Renamed file is located at: {new_path}")
            return new_filename
        except Exception as e:
            print(f"Error processing the image {img_path}: {e}")
            return None
    else:
        print(f"No image found for {medicine_name}.")
        return None


# Route to serve static files (images)
@app.route('/static/medicine_images/<filename>')
def serve_image(filename):
    """Serves the requested image."""
    print(f"Current working directory: {os.getcwd()}")
    print(f"Attempting to serve image: {filename}")
    print(f"UPLOAD_FOLDER: {app.config['UPLOAD_FOLDER']}")

    try:
        # Normalize the path to use forward slashes
        normalized_path = app.config['UPLOAD_FOLDER'].replace('\\', '/')
        print(f"Normalized Path: {normalized_path}")
        filename = filename.strip()  # remove any problematic characters
        return send_from_directory(normalized_path, filename)
    except Exception as e:
        print(f"Error serving image {filename}: {e}")
        return "Image not found", 404


# --- API Route ---
@app.route('/api/recommend', methods=['GET'])
def get_data_summary():
    """
    API endpoint that receives patient data, gets medicine image, and returns JSON object.
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
        gender = request.args.get('gender', 'Not Provided')  # Get Gender

        # Log received data
        print(f"Age: {age}, Location: {location}, Weight: {weight}, Height: {height}, Gender: {gender}")
        print(f"Organ Function: {organ_function}, Allergies: {allergies}")
        print(f"Severity: {severity}, Stage: {condition_stage}, Body Part: {selected_body_part}")
        print(f"Symptoms: {symptoms}")

        # --- 2. Generate AI Response (Adapt or Mock) ---
        try:
            ai_response = i1.generate(age, gender, location, height, weight, organ_function, allergies, symptoms, condition_stage, severity)
            print(f"Type of ai_response: {type(ai_response)}")

            # Mock response
            #ai_response = {'disease': 'Seborrheic Dermatitis (Dandruff)', 'medications': [{'medicine': 'Ketoconazole Shampoo', 'dosage': '2%', 'frequency': '2', 'duration': '4 weeks'}, {'medicine': 'Selenium Sulfide Shampoo', 'dosage': '2.5%', 'frequency': '2', 'duration': '4 weeks'}]}

        except Exception as ai_err:
            print(f"Error calling AI: {ai_err}")
            return jsonify({"error": "Failed to get AI response"}), 500

        # --- Adapt to handle the case where the AI returns a dictionary, wrap in a list  ---
        if isinstance(ai_response, dict):
            ai_response = [ai_response]
        elif ai_response is None:
             ai_response = []
        # ---Ensure it is a list---
        if not isinstance(ai_response, list):
             print("The AI Response is not a list as expected")
             return jsonify({"error": "AI response is not a list"}), 500

        # --- 3. Get and Append Medicine Image Filenames ---
        for recommendation_dict in ai_response:
            if isinstance(recommendation_dict, dict) and 'medications' in recommendation_dict:  # Check if it is actually a dictionary
                for medication in recommendation_dict['medications']:
                    if 'medicine' in medication:
                        image_filename = get_medicine_image(medication['medicine'])
                        medication['imageFilename'] = image_filename

        # *** ADD THIS LOGGING: ***
        print("--- BEFORE SENDING: ai_response with imageFilenames ---")
        print(ai_response) # Print the whole thing

        # --- 4. Prepare and Send Response ---
        print("--- Sending Data Summary Response ---")
        #print(ai_response)
        return jsonify(ai_response), 200

    except Exception as e:
        print(f"--- Error: Internal server error --- \n{e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "An internal server error occurred processing the request."}), 500


# --- Run the App ---
if __name__ == '__main__':
    # Use port 5001 (or any other free port different from your frontend)
    app.run(debug=True, port=5001)