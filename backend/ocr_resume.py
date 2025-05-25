import os
import pytesseract # type: ignore
from PIL import Image
from config import RESUME_FOLDER

def process_resumes():
    print(f"[OCR] Processing resumes in folder: {RESUME_FOLDER}")
    resume_texts = {}
    for filename in os.listdir(RESUME_FOLDER):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.pdf')):
            file_path = os.path.join(RESUME_FOLDER, filename)
            try:
                if filename.lower().endswith('.pdf'):
                    # Simple fallback: convert first page PDF to image with pdf2image if available
                    print(f"[OCR] PDF support not implemented. Skipping {filename}")
                    continue
                else:
                    img = Image.open(file_path)
                    text = pytesseract.image_to_string(img)
                    resume_texts[filename] = text
                    print(f"[OCR] Extracted text from {filename}, length: {len(text)} chars")
            except Exception as e:
                print(f"[OCR ERROR] Could not process {filename}: {e}")
    return resume_texts
