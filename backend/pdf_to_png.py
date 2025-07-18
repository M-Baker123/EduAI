import fitz  # PyMuPDF
from pathlib import Path

def pdf_to_images_with_fitz(pdf_path):
    pdf_path = Path(pdf_path)
    output_dir = pdf_path.parent / "extracted_images"
    output_dir.mkdir(exist_ok=True)

    # Open the PDF
    doc = fitz.open(str(pdf_path))

    # Loop through pages and save each as PNG
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=300)
        output_file = output_dir / f"page_{i+1}.png"
        pix.save(str(output_file))

    print(f"Saved {len(doc)} images to {output_dir}")

# -------------------
# 🔧 Replace with your PDF path
# -------------------
if __name__ == "__main__":
    pdf_file_path = "C:\\Users\\karak\\OneDrive\\Desktop\\Telecom 2\\Chap6.pdf"  # Change to your PDF path
    pdf_to_images_with_fitz(pdf_file_path)
