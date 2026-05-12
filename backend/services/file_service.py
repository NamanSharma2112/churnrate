"""
File Service — handles CSV and XML file parsing and storage.
Converts uploaded files into pandas DataFrames for prediction.
"""

import os
import uuid
import xml.etree.ElementTree as ET
from datetime import datetime
import pandas as pd
from config import get_settings


settings = get_settings()


def ensure_upload_dir():
    """Create the uploads directory if it doesn't exist."""
    os.makedirs(settings.upload_dir, exist_ok=True)


def save_uploaded_file(content: bytes, original_filename: str) -> tuple[str, str]:
    """
    Save an uploaded file to the uploads directory.
    Returns (saved_filename, full_path).
    """
    ensure_upload_dir()

    # Generate unique filename
    ext = os.path.splitext(original_filename)[1].lower()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = uuid.uuid4().hex[:8]
    saved_filename = f"{timestamp}_{unique_id}{ext}"
    full_path = os.path.join(settings.upload_dir, saved_filename)

    with open(full_path, "wb") as f:
        f.write(content)

    return saved_filename, full_path


def parse_csv(file_path: str) -> pd.DataFrame:
    """Parse a CSV file into a pandas DataFrame."""
    return pd.read_csv(file_path)


def parse_xml(file_path: str) -> pd.DataFrame:
    """
    Parse an XML file into a pandas DataFrame.
    
    Supports common XML structures:
    
    Structure 1 — Each child of root is a row:
    <customers>
      <customer>
        <age>45</age>
        <tenure>12</tenure>
        ...
      </customer>
    </customers>
    
    Structure 2 — Attributes as columns:
    <customers>
      <customer age="45" tenure="12" ... />
    </customers>
    
    Structure 3 — Mixed (attributes + child elements):
    <customers>
      <customer id="1">
        <age>45</age>
      </customer>
    </customers>
    """
    tree = ET.parse(file_path)
    root = tree.getroot()

    rows = []

    for child in root:
        row = {}

        # Get attributes
        if child.attrib:
            row.update(child.attrib)

        # Get child elements
        for sub in child:
            # Handle nested elements — flatten to text
            if sub.text and sub.text.strip():
                row[sub.tag] = sub.text.strip()
            elif len(sub) > 0:
                # Nested children — join as comma-separated
                row[sub.tag] = ",".join(
                    s.text.strip() for s in sub if s.text and s.text.strip()
                )

        if row:
            rows.append(row)

    if not rows:
        raise ValueError("No data rows found in XML file. Check the XML structure.")

    df = pd.DataFrame(rows)

    # Try to convert numeric columns
    for col in df.columns:
        try:
            df[col] = pd.to_numeric(df[col])
        except (ValueError, TypeError):
            pass

    return df


def parse_file(file_path: str, file_type: str) -> pd.DataFrame:
    """
    Parse a file based on its type.
    Supported types: 'csv', 'xml'
    """
    if file_type == "csv":
        return parse_csv(file_path)
    elif file_type == "xml":
        return parse_xml(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_type}. Use 'csv' or 'xml'.")


def get_file_type(filename: str) -> str:
    """Detect file type from extension."""
    ext = os.path.splitext(filename)[1].lower()
    if ext == ".csv":
        return "csv"
    elif ext == ".xml":
        return "xml"
    else:
        raise ValueError(f"Unsupported file extension: {ext}. Use .csv or .xml")
