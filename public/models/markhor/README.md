# Markhor Statue 3D Model

## Model Conversion Required

The model file `model.g3d` needs to be converted to `model.glb` format to be used in the web application.

### Conversion Steps:

1. **Use an online converter:**
   - Visit: https://rigmodels.com/convert3d
   - Upload `model.g3d`
   - Convert to GLB format
   - Download the converted `model.glb` file

2. **Place the converted file:**
   - Save the converted `model.glb` file in this directory: `public/models/markhor/`
   - The file should be named exactly: `model.glb`

3. **Verify textures:**
   - All texture files (PNG images) should remain in this directory
   - The textures will be automatically applied to the model

### File Structure:
```
public/models/markhor/
├── model.glb          (REQUIRED - convert from model.g3d)
├── model.g3d          (Original file - can be removed after conversion)
├── model.mtl          (Material file - optional for GLB)
├── RGB_d81de30a7d1949de82a7d560a909c55d_T_Rove_Goat_Color.png
├── N_8273b3dfdefd4f208bfdc8dfe85e8d50_T_Rove_Goat_Normal.png
└── ... (other texture files)
```

### Alternative: Using Blender

If you have Blender installed:
1. Open Blender
2. Import the `.g3d` file (you may need a plugin)
3. Export as `.glb` format
4. Place the exported file in this directory

Once the `model.glb` file is in place, the statue will automatically load in the 3D museum.

