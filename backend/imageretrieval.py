import os
from icrawler.builtin import GoogleImageCrawler
from PIL import Image
import base64

def get_medicine_image(medicine_name):
    # Define a directory to save downloaded images
    output_dir = 'medicine_images'
    os.makedirs(output_dir, exist_ok=True)

    # Create a GoogleImageCrawler instance to fetch the image
    google_crawler = GoogleImageCrawler(storage={'root_dir': output_dir})
    # Search for the medicine image. Adjust the query if necessary (e.g., add "Indian medicine")
    google_crawler.crawl(keyword=medicine_name, max_num=1)  # Reduced to 1 for simplicity

    # Find the downloaded image file in the directory
    files = os.listdir(output_dir)
    if files:
        img_path = os.path.join(output_dir, files[0])
        try:
            # Open and read the image file in binary mode
            with open(img_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8') # Read, encode and decode as string for JSON
            return encoded_string
        except Exception as e:
            print("Error encoding the image:", e)
            return None
    else:
        print("No image found for the given medicine name.")
        return None

if __name__ == "__main__":
    medicine = input("Enter the Indian medicine name: ")
    get_medicine_image(medicine)