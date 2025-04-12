from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
# from ai import GeminiClient, DeepseekClient, Compare
import json
import os
from icrawler.builtin import GoogleImageCrawler
from PIL import Image
import uuid  # For generating unique filenames
import re # Import re
from structuredoutputai import GeminiClient

# Initialize Flask app
# IMPORTANT: Make sure 'static' is at the root of your project.
app = Flask(__name__, static_folder='static')
CORS(app)

# Static directory for serving images
# Use an absolute path to avoid working directory issues
UPLOAD_FOLDER = os.path.abspath('static/medicine_images')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

i1 = GeminiClient()
# i2 = DeepseekClient()
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
        filename = filename.strip() # remove any problematic characters
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

        # --- 3. Get and Append Medicine Image Filename ---
        # Assuming d1 is a list of recommendations, each with a "medication" key:
        for recommendation in d1:  # Loop through the recommendations
            medication_name = recommendation.get('medication')
            if medication_name:
                image_filename = get_medicine_image(medication_name)  # Get image filename
                recommendation['imageFilename'] = image_filename  # Append filename to recommendation

        # --- 4. Prepare and Send Response ---
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