#!/usr/bin/env python3
"""
Script to copy existing diagrams from data-converter-toolbox to blog images.

This script looks for existing diagrams/images in the toolbox repository
and copies them to public/blog/ for use in blog posts.

Usage:
    python scripts/copy-toolbox-images.py

Requirements:
    - data-converter-toolbox repository should be cloned or accessible
"""

import os
import shutil
from pathlib import Path

# Configuration
BLOG_IMAGES_DIR = Path(__file__).parent.parent / "public" / "blog"
# Update this path to point to your data-converter-toolbox repository
TOOLBOX_DIR = Path.home() / "projects" / "data_converter_toolbox"
# Alternative: Use environment variable
# TOOLBOX_DIR = Path(os.environ.get("DATA_CONVERTER_TOOLBOX_PATH", str(Path.home() / "projects" / "data_converter_toolbox")))

# Common locations where diagrams might be stored in the toolbox
DIAGRAM_LOCATIONS = [
    "docs/images",
    "docs/figures",
    "images",
    "figures",
    "doc/images",
    "doc/figures",
    "README_files",  # Jupyter notebook output
    ".",  # Root directory
]

# Image file extensions to look for
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".svg", ".gif", ".pdf"}

def find_diagrams(toolbox_dir):
    """Find all diagram/image files in the toolbox repository."""
    diagrams = []
    
    if not toolbox_dir.exists():
        print(f"Warning: Toolbox directory not found: {toolbox_dir}")
        return diagrams
    
    # Search in common locations
    for location in DIAGRAM_LOCATIONS:
        search_dir = toolbox_dir / location
        if search_dir.exists() and search_dir.is_dir():
            for ext in IMAGE_EXTENSIONS:
                for img_file in search_dir.rglob(f"*{ext}"):
                    diagrams.append(img_file)
    
    # Also search in root for common diagram names
    common_names = [
        "architecture", "diagram", "flowchart", "block", "schematic",
        "timing", "skew", "calibration", "adc", "interleaved"
    ]
    
    for img_file in toolbox_dir.glob("*"):
        if img_file.is_file() and img_file.suffix.lower() in IMAGE_EXTENSIONS:
            name_lower = img_file.stem.lower()
            if any(keyword in name_lower for keyword in common_names):
                diagrams.append(img_file)
    
    return diagrams

def copy_diagrams(diagrams, output_dir):
    """Copy diagrams to blog images directory."""
    output_dir.mkdir(parents=True, exist_ok=True)
    copied = []
    
    for diagram in diagrams:
        try:
            # Create a clean filename
            filename = diagram.name
            # Remove any path components that might cause issues
            clean_name = filename.replace(" ", "-").lower()
            
            dest = output_dir / clean_name
            
            # Avoid overwriting unless it's an update
            if dest.exists():
                # Compare file sizes to see if it's different
                if dest.stat().st_size != diagram.stat().st_size:
                    print(f"  Updating: {clean_name}")
                    shutil.copy2(diagram, dest)
                    copied.append(clean_name)
                else:
                    print(f"  Skipping (unchanged): {clean_name}")
            else:
                print(f"  Copying: {clean_name}")
                shutil.copy2(diagram, dest)
                copied.append(clean_name)
        except Exception as e:
            print(f"  Error copying {diagram.name}: {e}")
    
    return copied

def main():
    """Main function to copy toolbox diagrams."""
    print("Copying diagrams from data-converter-toolbox...")
    print(f"Toolbox directory: {TOOLBOX_DIR}")
    print(f"Output directory: {BLOG_IMAGES_DIR}")
    print()
    
    if not TOOLBOX_DIR.exists():
        print(f"Error: Toolbox directory not found: {TOOLBOX_DIR}")
        print("Please update TOOLBOX_DIR in this script to point to your toolbox repository.")
        return
    
    # Find diagrams
    print("Searching for diagrams...")
    diagrams = find_diagrams(TOOLBOX_DIR)
    
    if not diagrams:
        print("No diagrams found in toolbox repository.")
        print(f"Searched in: {', '.join(DIAGRAM_LOCATIONS)}")
        return
    
    print(f"Found {len(diagrams)} diagram(s):")
    for diagram in diagrams:
        print(f"  - {diagram.relative_to(TOOLBOX_DIR)}")
    
    print()
    print("Copying diagrams...")
    copied = copy_diagrams(diagrams, BLOG_IMAGES_DIR)
    
    print()
    print(f"Successfully copied {len(copied)} diagram(s) to {BLOG_IMAGES_DIR}")
    print()
    print("To use these images in blog posts, reference them like:")
    print("  ![Description](/blog/filename.png)")

if __name__ == "__main__":
    main()
