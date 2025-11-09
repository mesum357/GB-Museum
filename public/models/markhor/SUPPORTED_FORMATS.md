# Supported 3D Model File Formats

The virtual museum supports the following 3D model file formats:

## ✅ Fully Supported Formats

### 1. **GLTF/GLB** (.gltf, .glb) ⭐ RECOMMENDED
- **Best choice** for web applications
- Supports: meshes, materials, textures, animations, lights, cameras
- Efficient file size and fast loading
- **Loader**: `useGLTF` from `@react-three/drei`
- **Usage**: `useGLTF('/models/markhor/model.glb')`

### 2. **OBJ** (.obj, .mtl)
- Simple text-based format
- Supports: geometry and basic materials
- Requires separate .mtl file for materials
- **Loader**: `useOBJ` from `@react-three/drei`
- **Usage**: `useOBJ('/models/markhor/model.obj')`

### 3. **FBX** (.fbx)
- Popular in game design and animation
- Supports: complex animations, materials, textures
- **Loader**: `useFBX` from `@react-three/drei`
- **Usage**: `useFBX('/models/markhor/model.fbx')`

### 4. **PLY** (.ply)
- Used for 3D scanner data
- Supports: geometry with vertex properties
- **Loader**: `PLYLoader` from Three.js
- **Usage**: Requires manual loader setup

## 📝 Format Comparison

| Format | File Size | Animation | Materials | Textures | Recommended For |
|--------|-----------|-----------|-----------|----------|-----------------|
| **GLB** | Small | ✅ Yes | ✅ Yes | ✅ Yes | **Web/Production** |
| GLTF | Medium | ✅ Yes | ✅ Yes | ✅ Yes | Web/Development |
| OBJ | Large | ❌ No | Basic | ✅ Yes | Simple models |
| FBX | Large | ✅ Yes | ✅ Yes | ✅ Yes | Animated models |
| PLY | Small | ❌ No | ❌ No | ❌ No | Point clouds |

## 🎯 Recommended Approach

**For your Markhor statue:**
1. **Best option**: Convert to **GLB** format
   - Best performance and file size
   - Supports all features (textures, materials, animations)
   - Use online converter: https://rigmodels.com/convert3d

2. **Alternative**: Use **OBJ + MTL**
   - If GLB conversion fails
   - Requires both .obj and .mtl files
   - Place both files in `public/models/markhor/`

## 📁 File Structure

Place your model files in:
```
public/models/markhor/
├── model.glb          (GLB format - recommended)
├── model.obj          (OBJ format)
├── model.mtl          (Material file for OBJ)
├── model.fbx          (FBX format)
└── textures/
    ├── color.png
    ├── normal.png
    └── ...
```

## 🔧 Conversion Tools

1. **Online Converters:**
   - https://rigmodels.com/convert3d (supports .g3d → GLB/OBJ/FBX)
   - https://products.aspose.app/3d/conversion
   - https://www.creators3d.com/online-viewer

2. **Desktop Software:**
   - **Blender** (free) - supports all formats
   - **Autodesk FBX Converter** - for FBX files
   - **MeshLab** - for PLY and mesh processing

## ⚡ Quick Start

1. **For GLB/GLTF:**
   ```typescript
   import { useGLTF } from '@react-three/drei';
   const { scene } = useGLTF('/models/markhor/model.glb');
   ```

2. **For OBJ:**
   ```typescript
   import { useOBJ } from '@react-three/drei';
   const obj = useOBJ('/models/markhor/model.obj');
   ```

3. **For FBX:**
   ```typescript
   import { useFBX } from '@react-three/drei';
   const fbx = useFBX('/models/markhor/model.fbx');
   ```

## 🚨 Important Notes

- **GLB is binary GLTF** - more compact, single file
- **GLTF is JSON-based** - text format, may have separate textures
- **OBJ requires .mtl file** for materials
- All formats should be placed in `public/` folder to be accessible
- File paths are relative to `public/` (use `/models/...` not `/public/models/...`)

