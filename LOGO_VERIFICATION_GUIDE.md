# Wizardwayz Logo Verification & Troubleshooting Guide

**Critical: This document prevents logo display failures when handing off to another Manus instance.**

## Logo Specifications

The Wizardwayz logo must have these exact properties:

| Property | Requirement | Verification |
|----------|-------------|--------------|
| **Black Outline** | Evolution silhouettes + "WIZARDWAYZ" text in black | ✓ ~800k black pixels |
| **White Fill** | Interior of letters filled with white | ✓ ~490k white pixels |
| **Transparent Background** | Gaps between letters show background image | ✓ ~40% transparent pixels |
| **File Format** | PNG with RGBA color space | ✓ `/client/public/logo.png` |
| **Display** | White letters visible against dark background | ✓ Tested on homepage |

## Verification Script

Run this script to verify logo correctness BEFORE presenting to user:

```bash
python3 << 'EOF'
from PIL import Image
import numpy as np

logo_path = '/home/ubuntu/wizardwayz/client/public/logo.png'
img = Image.open(logo_path).convert('RGBA')
pixels = np.array(img)

total_pixels = pixels.shape[0] * pixels.shape[1]
transparent = np.sum(pixels[:,:,3] == 0)
white_pixels = np.sum((pixels[:,:,0] > 200) & (pixels[:,:,1] > 200) & (pixels[:,:,2] > 200) & (pixels[:,:,3] > 0))
black_pixels = np.sum((pixels[:,:,0] < 100) & (pixels[:,:,1] < 100) & (pixels[:,:,2] < 100) & (pixels[:,:,3] > 0))

print(f"Logo Verification Report:")
print(f"  Transparent: {100*transparent/total_pixels:.1f}% (expected: 30-50%)")
print(f"  White fill: {white_pixels} pixels (expected: >400k)")
print(f"  Black outline: {black_pixels} pixels (expected: >700k)")

success = (white_pixels > 400000 and black_pixels > 700000)
print(f"\n{'✅ PASS' if success else '❌ FAIL'}: Logo is {'correct' if success else 'broken'}")
EOF
```

**Expected output:**
```
Logo Verification Report:
  Transparent: 40.3% (expected: 30-50%)
  White fill: 492383 pixels (expected: >400k)
  Black outline: 797606 pixels (expected: >700k)

✅ PASS: Logo is correct
```

## Common Failures & Fixes

### Problem 1: Logo is Completely Transparent (100% alpha=0)

**Symptom:** Logo doesn't appear on homepage at all (white rectangle or invisible)

**Root Cause:** Script filled entire image with transparent pixels instead of preserving silhouettes

**Fix:**
```bash
python3 << 'EOF'
from PIL import Image
import numpy as np
from scipy import ndimage

# Open original
original = Image.open('/home/ubuntu/upload/WIZARDWAYZ_print_transparent_bg.png').convert('RGBA')
pixels_orig = np.array(original)

# Create output with black silhouettes
output = Image.new('RGBA', original.size, (0, 0, 0, 0))
out_array = np.array(output)

# Copy all non-transparent pixels as black
alpha = pixels_orig[:,:,3]
non_transparent = alpha > 50
out_array[non_transparent] = (0, 0, 0, 255)

# Find interior holes and fill with white
background_mask = ~non_transparent
labeled_bg, num_bg_features = ndimage.label(background_mask)

for bg_id in range(1, num_bg_features + 1):
    bg_component = labeled_bg == bg_id
    coords = np.where(bg_component)
    
    if len(coords[0]) > 5:
        y_min, y_max = coords[0].min(), coords[0].max()
        x_min, x_max = coords[1].min(), coords[1].max()
        
        # Interior regions don't touch image edges
        if (y_min > 5 and y_max < out_array.shape[0] - 5 and
            x_min > 5 and x_max < out_array.shape[1] - 5):
            out_array[bg_component] = (255, 255, 255, 255)

result = Image.fromarray(out_array, 'RGBA')
result.save('/home/ubuntu/wizardwayz/client/public/logo.png', 'PNG')
print("✓ Logo fixed")
EOF
```

### Problem 2: Logo is Solid White Rectangle

**Symptom:** Logo appears as white block instead of silhouettes

**Root Cause:** Inverted colors or incorrect fill logic

**Fix:** Verify the original PNG has the correct structure:
```bash
python3 << 'EOF'
from PIL import Image
import numpy as np

original = Image.open('/home/ubuntu/upload/WIZARDWAYZ_print_transparent_bg.png').convert('RGBA')
pixels = np.array(original)

# Check top 3 colors
unique_colors = {}
for y in range(pixels.shape[0]):
    for x in range(pixels.shape[1]):
        r, g, b, a = pixels[y, x]
        color = (r, g, b, a)
        if color not in unique_colors:
            unique_colors[color] = 0
        unique_colors[color] += 1

sorted_colors = sorted(unique_colors.items(), key=lambda x: x[1], reverse=True)
print("Top 3 colors in original:")
for color, count in sorted_colors[:3]:
    print(f"  RGBA{color} - {count} pixels")
EOF
```

Expected: `RGBA(0, 0, 0, 0)` (transparent) and `RGBA(0, 0, 0, 255)` (black silhouettes)

### Problem 3: White Fill is Missing

**Symptom:** Logo shows black outline but no white interior

**Root Cause:** Interior detection failed (holes not identified correctly)

**Fix:** Manually verify the scipy ndimage.label is finding interior regions:
```bash
python3 << 'EOF'
from PIL import Image
import numpy as np
from scipy import ndimage

original = Image.open('/home/ubuntu/upload/WIZARDWAYZ_print_transparent_bg.png').convert('RGBA')
pixels_orig = np.array(original)

alpha = pixels_orig[:,:,3]
non_transparent = alpha > 50
background_mask = ~non_transparent

labeled_bg, num_bg_features = ndimage.label(background_mask)
print(f"Found {num_bg_features} background regions")

# Count interior regions
interior_count = 0
for bg_id in range(1, num_bg_features + 1):
    bg_component = labeled_bg == bg_id
    coords = np.where(bg_component)
    y_min, y_max = coords[0].min(), coords[0].max()
    x_min, x_max = coords[1].min(), coords[1].max()
    
    if (y_min > 5 and y_max < background_mask.shape[0] - 5 and
        x_min > 5 and x_max < background_mask.shape[1] - 5):
        interior_count += 1

print(f"Found {interior_count} interior regions (expected: 10-20)")
EOF
```

If interior_count is 0, the scipy installation may have failed. Reinstall:
```bash
sudo pip3 install scipy --upgrade -q
```

## Deployment Checklist

Before handing off to another Manus instance:

- [ ] Run verification script and confirm "✅ PASS"
- [ ] Rebuild project: `cd /home/ubuntu/wizardwayz && pnpm build`
- [ ] Check homepage screenshot: logo should show white letters with black outline
- [ ] Verify on mobile view: logo should scale responsively
- [ ] Save checkpoint with message: "Logo verified and correct"

## Critical Notes for Next Manus Instance

1. **ALWAYS verify logo before presenting** - Use the verification script above
2. **The original PNG is in `/home/ubuntu/upload/WIZARDWAYZ_print_transparent_bg.png`** - Never delete this
3. **scipy is required** - Install with: `sudo pip3 install scipy -q`
4. **The ndimage.label approach is the only reliable method** - Avoid floodfill (doesn't work with alpha channel)
5. **Test visually after every change** - Don't trust pixel counts alone
6. **If logo breaks, regenerate from original** - Don't try to patch the PNG

## Related Files

- Logo source: `/home/ubuntu/upload/WIZARDWAYZ_print_transparent_bg.png`
- Logo output: `/home/ubuntu/wizardwayz/client/public/logo.png`
- Homepage: `/home/ubuntu/wizardwayz/client/src/pages/Home.tsx`
- Generation script: `/home/ubuntu/wizardwayz/generate-pillars.mjs` (for reference)
