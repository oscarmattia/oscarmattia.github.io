#!/usr/bin/env python3
"""
Script to copy existing diagrams from data-converter-toolbox for blog posts.

This script looks for existing diagrams/images in the toolbox repository
and copies them to public/blog/ for use in blog posts.

For new diagrams, use Mermaid syntax in markdown instead of generating images.

Usage:
    python scripts/copy-toolbox-images.py  # Use this instead
    # OR
    python scripts/generate-blog-images.py  # Legacy - generates matplotlib diagrams

Note: This script is kept for reference but copy-toolbox-images.py is preferred.
"""

import os
import sys
import subprocess
from pathlib import Path

# Configuration
BLOG_IMAGES_DIR = Path(__file__).parent.parent / "public" / "blog"
# Update this path to point to your data-converter-toolbox repository
TOOLBOX_DIR = Path.home() / "projects" / "data_converter_toolbox"
# Alternative: Use environment variable
# TOOLBOX_DIR = Path(os.environ.get("DATA_CONVERTER_TOOLBOX_PATH", str(Path.home() / "projects" / "data_converter_toolbox")))

# Create blog images directory if it doesn't exist
BLOG_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

def generate_timing_skew_diagram():
    """Generate timing skew visualization diagram."""
    print("Generating timing skew diagram...")
    
    # Example: Run simple_digital_timing_skew.py and save output
    # This is a template - adjust based on actual script capabilities
    script_path = TOOLBOX_DIR / "simple_digital_timing_skew.py"
    
    if not script_path.exists():
        print(f"Warning: {script_path} not found. Skipping timing skew diagram.")
        return
    
    try:
        # Run the script and capture output
        # Note: You may need to modify the script to save plots
        result = subprocess.run(
            [sys.executable, str(script_path)],
            cwd=str(TOOLBOX_DIR),
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print("✓ Timing skew diagram generated")
        else:
            print(f"Warning: Script returned error: {result.stderr}")
    except Exception as e:
        print(f"Error generating timing skew diagram: {e}")

def generate_adc_architecture_diagram():
    """Generate TI-ADC architecture diagram."""
    print("Generating ADC architecture diagram...")
    
    # This would generate a block diagram of time-interleaved ADC
    # You can use matplotlib, graphviz, or other tools
    try:
        import matplotlib.pyplot as plt
        import matplotlib.patches as mpatches
        
        fig, ax = plt.subplots(figsize=(12, 6))
        
        # Simple block diagram example
        # Channel blocks
        for i in range(4):
            rect = mpatches.Rectangle((i * 2.5, 1), 2, 1, 
                                     linewidth=2, edgecolor='black', 
                                     facecolor='lightblue')
            ax.add_patch(rect)
            ax.text(i * 2.5 + 1, 1.5, f'ADC {i+1}', 
                   ha='center', va='center', fontsize=12, fontweight='bold')
        
        # Input signal
        ax.arrow(-0.5, 1.5, 0.5, 0, head_width=0.1, head_length=0.1, 
                fc='black', ec='black')
        ax.text(-0.5, 1.8, 'Input', ha='center', fontsize=10)
        
        # Output multiplexer
        rect = mpatches.Rectangle((10, 1), 2, 1, 
                                 linewidth=2, edgecolor='black', 
                                 facecolor='lightgreen')
        ax.add_patch(rect)
        ax.text(11, 1.5, 'MUX', ha='center', va='center', 
               fontsize=12, fontweight='bold')
        
        # Output arrow
        ax.arrow(12.5, 1.5, 0.5, 0, head_width=0.1, head_length=0.1, 
                fc='black', ec='black')
        ax.text(13, 1.8, 'Output', ha='center', fontsize=10)
        
        # Clock phases
        for i in range(4):
            ax.text(i * 2.5 + 1, 0.5, f'φ{i+1}', ha='center', 
                   fontsize=10, style='italic')
        
        ax.set_xlim(-1, 14)
        ax.set_ylim(0, 3)
        ax.axis('off')
        ax.set_title('Time-Interleaved ADC Architecture', fontsize=14, fontweight='bold', pad=20)
        
        output_path = BLOG_IMAGES_DIR / "ti-adc-architecture.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
        plt.close()
        
        print(f"✓ Architecture diagram saved to {output_path}")
    except ImportError:
        print("Warning: matplotlib not available. Skipping architecture diagram.")
    except Exception as e:
        print(f"Error generating architecture diagram: {e}")

def generate_calibration_comparison_diagram():
    """Generate comparison diagram of DSP vs Analog calibration."""
    print("Generating calibration comparison diagram...")
    
    try:
        import matplotlib.pyplot as plt
        import matplotlib.patches as mpatches
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
        
        # DSP-based calibration flow
        ax1.set_title('DSP-Based Calibration', fontsize=12, fontweight='bold', pad=10)
        
        # Blocks for DSP approach
        blocks_dsp = [
            ('ADC\nOutput', 0.5, 0.5),
            ('Digital\nProcessing', 0.5, 0.3),
            ('Correction\nApplied', 0.5, 0.1),
        ]
        
        for text, x, y in blocks_dsp:
            rect = mpatches.Rectangle((x-0.15, y-0.05), 0.3, 0.1,
                                     linewidth=2, edgecolor='black',
                                     facecolor='lightblue')
            ax1.add_patch(rect)
            ax1.text(x, y, text, ha='center', va='center', fontsize=9)
        
        # Arrows
        for i in range(len(blocks_dsp) - 1):
            ax1.arrow(0.5, blocks_dsp[i][1] - 0.05, 0, -0.1,
                     head_width=0.03, head_length=0.02, fc='black', ec='black')
        
        ax1.set_xlim(0, 1)
        ax1.set_ylim(0, 0.7)
        ax1.axis('off')
        
        # Analog/Mixed-Signal calibration flow
        ax2.set_title('Analog/Mixed-Signal Calibration', fontsize=12, fontweight='bold', pad=10)
        
        # Blocks for analog approach
        blocks_analog = [
            ('Clock\nAdjustment', 0.5, 0.5),
            ('Hardware\nCorrection', 0.5, 0.3),
            ('Calibrated\nADC', 0.5, 0.1),
        ]
        
        for text, x, y in blocks_analog:
            rect = mpatches.Rectangle((x-0.15, y-0.05), 0.3, 0.1,
                                     linewidth=2, edgecolor='black',
                                     facecolor='lightgreen')
            ax2.add_patch(rect)
            ax2.text(x, y, text, ha='center', va='center', fontsize=9)
        
        # Arrows
        for i in range(len(blocks_analog) - 1):
            ax2.arrow(0.5, blocks_analog[i][1] - 0.05, 0, -0.1,
                     head_width=0.03, head_length=0.02, fc='black', ec='black')
        
        ax2.set_xlim(0, 1)
        ax2.set_ylim(0, 0.7)
        ax2.axis('off')
        
        plt.tight_layout()
        output_path = BLOG_IMAGES_DIR / "calibration-comparison.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
        plt.close()
        
        print(f"✓ Calibration comparison diagram saved to {output_path}")
    except ImportError:
        print("Warning: matplotlib not available. Skipping comparison diagram.")
    except Exception as e:
        print(f"Error generating comparison diagram: {e}")

def main():
    """Main function to generate all blog images."""
    print("Generating blog images from data-converter-toolbox...")
    print(f"Output directory: {BLOG_IMAGES_DIR}")
    print()
    
    # Generate diagrams
    generate_adc_architecture_diagram()
    generate_calibration_comparison_diagram()
    generate_timing_skew_diagram()
    
    print()
    print("Image generation complete!")
    print(f"Images saved to: {BLOG_IMAGES_DIR}")

if __name__ == "__main__":
    main()
