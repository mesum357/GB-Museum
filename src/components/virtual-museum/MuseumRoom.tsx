import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMuseum } from '@/contexts/MuseumContext';

// Browish gradient colors (specification)
const DARK_BROWN = '#2B1A12'; // Dark brown base
const MID_BROWN = '#7D5A46'; // Mid brown
const LIGHT_BEIGE = '#D6BBA8'; // Light warm beige for highlights

// Warm brownish gradient colors (legacy)
const WALL_COLOR_1 = '#3b2f2a'; // Deep brown
const WALL_COLOR_2 = '#5c493e';
const WALL_COLOR_3 = '#8d6b5c';
const FLOOR_COLOR = '#2a1f1a';
const CEILING_COLOR = '#4a3d35';

// Create browish gradient texture for walls and ceiling
function createBrowishGradientTexture(width: number, height: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  // Create vertical gradient from dark to light
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, DARK_BROWN); // Bottom - darker
  gradient.addColorStop(0.5, MID_BROWN); // Middle
  gradient.addColorStop(1, LIGHT_BEIGE); // Top - lighter
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add subtle radial highlight at center (for room center vignette)
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
  
  const radialGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
  radialGradient.addColorStop(0, 'rgba(214, 187, 168, 0.2)'); // Light beige highlight
  radialGradient.addColorStop(0.4, 'rgba(214, 187, 168, 0.1)');
  radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = radialGradient;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'source-over';
  
  // Add texture with noise for plaster effect
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 0.12;
    data[i] = Math.max(0, Math.min(255, data[i] + noise * 255));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 255));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 255));
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Create eye-catching whitish wall texture with beautiful designs
function createRealisticWallTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;
  
  // Base color - whitish/cream with subtle gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 2048);
  gradient.addColorStop(0, '#f5f5f0'); // Bottom - slightly darker
  gradient.addColorStop(0.3, '#fafaf5'); // Lower middle
  gradient.addColorStop(0.7, '#ffffff'); // Upper middle - pure white
  gradient.addColorStop(1, '#fafaf5'); // Top - slightly off-white
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2048, 2048);
  
  // Add elegant geometric patterns - Islamic/Museum style
  ctx.strokeStyle = 'rgba(200, 180, 150, 0.5)'; // Warm beige for patterns
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(240, 230, 210, 0.3)'; // Light beige fill
  
  // Create repeating ornate patterns
  const patternSize = 256;
  for (let y = 0; y < 2048; y += patternSize) {
    for (let x = 0; x < 2048; x += patternSize) {
      const centerX = x + patternSize / 2;
      const centerY = y + patternSize / 2;
      
      // Central medallion pattern
      ctx.beginPath();
      ctx.arc(centerX, centerY, patternSize / 4, 0, Math.PI * 2);
      ctx.stroke();
      
      // 8-pointed star inside
      for (let i = 0; i < 8; i++) {
        const angle1 = (i * Math.PI * 2) / 8;
        const angle2 = ((i + 0.5) * Math.PI * 2) / 8;
        const radius1 = patternSize / 4;
        const radius2 = patternSize / 8;
        const x1 = centerX + Math.cos(angle1) * radius1;
        const y1 = centerY + Math.sin(angle1) * radius1;
        const x2 = centerX + Math.cos(angle2) * radius2;
        const y2 = centerY + Math.sin(angle2) * radius2;
        
        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
        } else {
          ctx.lineTo(x2, y2);
          ctx.lineTo(x1, y1);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Corner decorative elements
      const corners = [
        [x + patternSize / 8, y + patternSize / 8],
        [x + patternSize * 7 / 8, y + patternSize / 8],
        [x + patternSize / 8, y + patternSize * 7 / 8],
        [x + patternSize * 7 / 8, y + patternSize * 7 / 8],
      ];
      
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, patternSize / 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }
  }
  
  // Add elegant floral motifs
  ctx.fillStyle = 'rgba(220, 200, 170, 0.25)'; // Light warm beige
  ctx.strokeStyle = 'rgba(180, 160, 130, 0.4)';
  ctx.lineWidth = 2;
  
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 2048;
    const y = Math.random() * 2048;
    const size = 30 + Math.random() * 40;
    
    // Draw elegant flower pattern
    ctx.beginPath();
    for (let j = 0; j < 12; j++) {
      const angle = (j * Math.PI * 2) / 12;
      const px = x + Math.cos(angle) * size;
      const py = y + Math.sin(angle) * size;
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Center of flower
    ctx.beginPath();
    ctx.arc(x, y, size / 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200, 180, 150, 0.4)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(220, 200, 170, 0.25)';
  }
  
  // Add subtle border patterns
  ctx.strokeStyle = 'rgba(200, 180, 150, 0.3)';
  ctx.lineWidth = 2;
  const borderSize = 100;
  for (let i = 0; i < 4; i++) {
    const offset = borderSize + i * 50;
    ctx.strokeRect(offset, offset, 2048 - offset * 2, 2048 - offset * 2);
  }
  
  // Add fine texture with subtle noise
  const imageData = ctx.getImageData(0, 0, 2048, 2048);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % 2048;
    const y = Math.floor((i / 4) / 2048);
    // Create subtle texture pattern
    const weave = Math.sin(x * 0.05) * Math.sin(y * 0.05) * 0.02;
    const noise = (Math.random() - 0.5) * 0.03;
    const variation = weave + noise;
    
    data[i] = Math.max(0, Math.min(255, data[i] + variation * 255)); // R
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + variation * 255)); // G
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + variation * 255)); // B
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  return texture;
}

// Create realistic brownish floor texture with reflections
function createRealisticFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;
  
  // Base color - rich brown with variations
  const gradient = ctx.createLinearGradient(0, 0, 2048, 2048);
  gradient.addColorStop(0, '#5c4033'); // Dark brown
  gradient.addColorStop(0.2, '#6b4e37'); // Medium-dark brown
  gradient.addColorStop(0.5, '#8b6f47'); // Medium brown
  gradient.addColorStop(0.8, '#6b4e37'); // Medium-dark brown
  gradient.addColorStop(1, '#5c4033'); // Dark brown
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2048, 2048);
  
  // Add wood grain patterns for realistic floor
  ctx.strokeStyle = 'rgba(60, 40, 25, 0.4)';
  ctx.lineWidth = 2;
  
  // Horizontal wood planks effect
  for (let y = 0; y < 2048; y += 128) {
    const variation = Math.random() * 0.1;
    const gradient = ctx.createLinearGradient(0, y, 0, y + 128);
    gradient.addColorStop(0, `rgba(${92 + variation * 20}, ${64 + variation * 15}, ${51 + variation * 10}, 1)`);
    gradient.addColorStop(0.5, `rgba(${92 - variation * 15}, ${64 - variation * 10}, ${51 - variation * 8}, 1)`);
    gradient.addColorStop(1, `rgba(${92 + variation * 20}, ${64 + variation * 15}, ${51 + variation * 10}, 1)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, y, 2048, 128);
    
    // Wood grain lines
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y + Math.sin(y * 0.01) * 3);
    ctx.stroke();
  }
  
  // Add subtle geometric patterns (marble/stone effect)
  ctx.strokeStyle = 'rgba(100, 70, 50, 0.2)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    const x1 = Math.random() * 2048;
    const y1 = Math.random() * 2048;
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(
      Math.random() * 2048, Math.random() * 2048,
      Math.random() * 2048, Math.random() * 2048
    );
    ctx.stroke();
  }
  
  // Add texture with noise for realistic feel
  const imageData = ctx.getImageData(0, 0, 2048, 2048);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % 2048;
    const y = Math.floor((i / 4) / 2048);
    // Create subtle texture pattern
    const grain = Math.sin(x * 0.1) * Math.sin(y * 0.05) * 0.03;
    const noise = (Math.random() - 0.5) * 0.05;
    const variation = grain + noise;
    
    data[i] = Math.max(0, Math.min(255, data[i] + variation * 255));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + variation * 255));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + variation * 255));
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// Create realistic ceiling texture with ornate patterns
function createRealisticCeilingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  
  // Base color - warm brown gradient
  const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
  gradient.addColorStop(0, '#6B5238'); // Center - medium brown
  gradient.addColorStop(0.4, '#5a4d45'); // Mid
  gradient.addColorStop(0.7, '#4a3d35'); // Outer
  gradient.addColorStop(1, '#3a2d25'); // Edge - dark brown
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Add ornate Islamic/Museum style patterns
  const centerX = 512;
  const centerY = 512;
  
  // Central medallion - intricate star pattern
  ctx.strokeStyle = 'rgba(214, 187, 168, 0.5)'; // Light beige
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(214, 187, 168, 0.2)';
  
  // Draw 8-pointed star
  for (let i = 0; i < 8; i++) {
    const angle1 = (i * Math.PI * 2) / 8;
    const angle2 = ((i + 0.5) * Math.PI * 2) / 8;
    const radius1 = 180;
    const radius2 = 100;
    const x1 = centerX + Math.cos(angle1) * radius1;
    const y1 = centerY + Math.sin(angle1) * radius1;
    const x2 = centerX + Math.cos(angle2) * radius2;
    const y2 = centerY + Math.sin(angle2) * radius2;
    
    if (i === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
    } else {
      ctx.lineTo(x2, y2);
      ctx.lineTo(x1, y1);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Inner geometric patterns
  ctx.strokeStyle = 'rgba(200, 180, 150, 0.4)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI * 2) / 16;
    const innerRadius = 120;
    const outerRadius = 160;
    const x1 = centerX + Math.cos(angle) * innerRadius;
    const y1 = centerY + Math.sin(angle) * innerRadius;
    const x2 = centerX + Math.cos(angle) * outerRadius;
    const y2 = centerY + Math.sin(angle) * outerRadius;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  // Corner decorative elements
  const cornerSize = 150;
  const corners = [
    [cornerSize, cornerSize],
    [1024 - cornerSize, cornerSize],
    [cornerSize, 1024 - cornerSize],
    [1024 - cornerSize, 1024 - cornerSize],
  ];
  
  corners.forEach(([x, y]) => {
    ctx.strokeStyle = 'rgba(180, 160, 130, 0.4)';
    ctx.lineWidth = 2;
    // Draw corner floral/geometric motif
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const radius = 50;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) {
        ctx.beginPath();
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.stroke();
  });
  
  // Border pattern
  ctx.strokeStyle = 'rgba(214, 187, 168, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(100, 100, 824, 824);
  
  // Add repeating geometric patterns across the ceiling
  ctx.strokeStyle = 'rgba(180, 160, 130, 0.25)';
  ctx.lineWidth = 1;
  const patternGrid = 256;
  for (let y = 128; y < 1024; y += patternGrid) {
    for (let x = 128; x < 1024; x += patternGrid) {
      // Small decorative pattern
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.stroke();
      
      // Cross pattern
      ctx.beginPath();
      ctx.moveTo(x - 20, y);
      ctx.lineTo(x + 20, y);
      ctx.moveTo(x, y - 20);
      ctx.lineTo(x, y + 20);
      ctx.stroke();
    }
  }
  
  // Add texture with noise for depth
  const imageData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 0.12;
    data[i] = Math.max(0, Math.min(255, data[i] + noise * 255));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 255));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 255));
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

function createNormalMap(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256; // Reduced from 512 for performance
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  
  // Create a normal map (blue base with height variations) - simplified
  const imageData = ctx.createImageData(256, 256);
  const data = imageData.data;
  
  // Use simpler noise generation
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 0.3 + 0.7;
    
    data[i] = Math.floor(128 + noise * 127); // R
    data[i + 1] = Math.floor(128 + noise * 127); // G
    data[i + 2] = Math.floor(255); // B (normal maps are blue-based)
    data[i + 3] = 255; // A
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// Texture cache - generate once, reuse everywhere
const textureCache: {
  wall?: THREE.CanvasTexture;
  floor?: THREE.CanvasTexture;
  ceiling?: THREE.CanvasTexture;
  normal?: THREE.CanvasTexture;
  wallGradient?: THREE.CanvasTexture;
} = {};

function getCachedWallTexture(): THREE.CanvasTexture {
  if (!textureCache.wall) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // White base with subtle vertical gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#f6f7f9');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Rectangular brownish checks on white
    const tileW = 160; // rectangular width
    const tileH = 100; // rectangular height
    for (let y = 0; y < 1024; y += tileH) {
      for (let x = 0; x < 1024; x += tileW) {
        const ix = Math.floor(x / tileW);
        const iy = Math.floor(y / tileH);
        const isAlt = (ix + iy) % 2 === 0;

        // two warm brown tones
        const brownLight = '#d4a574';
        const brownMid = '#c59976';
        ctx.fillStyle = isAlt ? brownLight : brownMid;
        ctx.globalAlpha = 0.18; // light overlay so white shows through
        ctx.fillRect(x, y, tileW, tileH);
        ctx.globalAlpha = 1.0;

        // fine tile border
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x + 0.5, y + 0.5, tileW - 1, tileH - 1);

        // subtle vertical wood-like streaks inside the brownish checks
        ctx.strokeStyle = 'rgba(120, 90, 60, 0.15)';
        ctx.lineWidth = 1;
        for (let l = 1; l < 5; l++) {
          const lx = x + (l * tileW) / 5;
          ctx.beginPath();
          ctx.moveTo(lx, y + 4);
          ctx.lineTo(lx + Math.sin((lx + y) * 0.03) * 3, y + tileH - 4);
          ctx.stroke();
        }
      }
    }

    // gentle noise for plaster feel
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const n = (Math.random() - 0.5) * 6;
      data[i] = Math.max(0, Math.min(255, data[i] + n));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
    }
    ctx.putImageData(imageData, 0, 0);

    textureCache.wall = new THREE.CanvasTexture(canvas);
    textureCache.wall.wrapS = THREE.RepeatWrapping;
    textureCache.wall.wrapT = THREE.RepeatWrapping;
    textureCache.wall.generateMipmaps = true;
    textureCache.wall.minFilter = THREE.LinearMipmapLinearFilter;
  }
  return textureCache.wall;
}

function getCachedFloorTexture(): THREE.CanvasTexture {
  if (!textureCache.floor) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Brownish gradient base darker than walls
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#4a2f22');
    grad.addColorStop(0.5, '#7a553e');
    grad.addColorStop(1, '#5b3e2d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Rectangular wooden tiles (wider tiles)
    const tileW = 220;
    const tileH = 120;
    for (let y = 0; y < 1024; y += tileH) {
      for (let x = 0; x < 1024; x += tileW) {
        const ix = Math.floor(x / tileW);
        const iy = Math.floor(y / tileH);
        // alternate subtle tint
        const tint = (ix + iy) % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)';
        ctx.fillStyle = tint;
        ctx.fillRect(x, y, tileW, tileH);

        // wood grain curves
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1.5;
        for (let l = 0; l < 8; l++) {
          const ly = y + (l * tileH) / 8;
          ctx.beginPath();
          for (let px = x + 4; px < x + tileW - 4; px += 6) {
            const py = ly + Math.sin((px + ly) * 0.05) * 2;
            if (px === x + 4) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

        // tile edge/border
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 0.5, y + 0.5, tileW - 1, tileH - 1);
      }
    }

    // subtle reflection/noise
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const shine = Math.random() * 4 - 2;
      data[i] = Math.max(0, Math.min(255, data[i] + shine));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + shine));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + shine));
    }
    ctx.putImageData(imageData, 0, 0);

    textureCache.floor = new THREE.CanvasTexture(canvas);
    textureCache.floor.wrapS = THREE.RepeatWrapping;
    textureCache.floor.wrapT = THREE.RepeatWrapping;
    textureCache.floor.repeat.set(2, 2);
    textureCache.floor.generateMipmaps = true;
    textureCache.floor.minFilter = THREE.LinearMipmapLinearFilter;
  }
  return textureCache.floor;
}

function getCachedCeilingTexture(): THREE.CanvasTexture {
  if (!textureCache.ceiling) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // White gradient base
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#f4f5f8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Larger soft checks
    const check = 180;
    for (let y = 0; y < 1024; y += check) {
      for (let x = 0; x < 1024; x += check) {
        const even = ((x / check) + (y / check)) % 2 === 0;
        ctx.fillStyle = even ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.0)';
        ctx.fillRect(x, y, check, check);
      }
    }

    // subtle noise for depth
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const n = (Math.random() - 0.5) * 6;
      data[i] = Math.max(0, Math.min(255, data[i] + n));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
    }
    ctx.putImageData(imageData, 0, 0);

    textureCache.ceiling = new THREE.CanvasTexture(canvas);
    textureCache.ceiling.wrapS = THREE.RepeatWrapping;
    textureCache.ceiling.wrapT = THREE.RepeatWrapping;
    textureCache.ceiling.repeat.set(1, 1);
    textureCache.ceiling.generateMipmaps = true;
    textureCache.ceiling.minFilter = THREE.LinearMipmapLinearFilter;
  }
  return textureCache.ceiling;
}

function getCachedNormalMap(): THREE.CanvasTexture {
  if (!textureCache.normal) {
    textureCache.normal = createNormalMap();
  }
  return textureCache.normal;
}

export function MuseumRoom() {
  const floorRef = useRef<THREE.Mesh>(null);
  const wallRefs = useRef<THREE.Mesh[]>([]);
  const { ledLightsEnabled } = useMuseum();
  
  // State for interactive wall elements
  const [hoveredWall, setHoveredWall] = useState<string | null>(null);

  // Room dimensions: 20m x 15m x 4m height
  const roomWidth = 20;
  const roomDepth = 15;
  const roomHeight = 4;
  const wallThickness = 0.2;

  // Use cached textures for better performance
  const realisticWallTexture = useMemo(() => getCachedWallTexture(), []);
  const floorTexture = useMemo(() => getCachedFloorTexture(), []);
  const ceilingTexture = useMemo(() => getCachedCeilingTexture(), []);
  const normalMap = useMemo(() => getCachedNormalMap(), []);
  
  // Reduced LED bulb count for performance
  const ledBulbCount = 10; // Reduced from 20
  const wireBulbCount = 12; // Reduced from 25

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          map={floorTexture}
          normalMap={normalMap}
          roughness={0.2}
          metalness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Ceiling with browish gradient */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, roomHeight, 0]}
      >
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          map={ceilingTexture}
          normalMap={normalMap}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* LED Light Strips on Ceiling */}
      {/* Main LED strips running along the length */}
      {[-6, -2, 2, 6].map((x) => (
        <group key={`led-strip-x-${x}`} position={[x, roomHeight - 0.05, 0]}>
          {/* LED strip housing */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.15, roomDepth * 0.8, 0.08]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* LED light emission */}
          {ledLightsEnabled && (
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
              <boxGeometry args={[0.12, roomDepth * 0.8, 0.02]} />
              <meshStandardMaterial
                color="#ffedd5"
                emissive="#ffedd5"
                emissiveIntensity={2}
              />
            </mesh>
          )}
        </group>
      ))}
      
      {/* LED strips running along the width */}
      {[-5, 0, 5].map((z) => (
        <group key={`led-strip-z-${z}`} position={[0, roomHeight - 0.05, z]}>
          {/* LED strip housing */}
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <boxGeometry args={[0.15, roomWidth * 0.8, 0.08]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* LED light emission */}
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]} position={[0, 0, 0.01]}>
            <boxGeometry args={[0.12, roomWidth * 0.8, 0.02]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      ))}

      {/* Recessed LED panels for accent lighting */}
      {[
        [-6, -5], [-2, -5], [2, -5], [6, -5],
        [-6, 0], [-2, 0], [2, 0], [6, 0],
        [-6, 5], [-2, 5], [2, 5], [6, 5],
      ].map(([x, z], i) => (
        <group key={`led-panel-${i}`} position={[x, roomHeight - 0.1, z]}>
          {/* Recessed panel frame */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.1]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          {/* LED panel light */}
          {ledLightsEnabled && (
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.02]}>
              <boxGeometry args={[0.7, 0.7, 0.02]} />
              <meshStandardMaterial
                color="#ffedd5"
                emissive="#ffedd5"
                emissiveIntensity={2.5}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* LED Wire Lights (String Lights) on Ceiling */}
      {/* Wire lights running along the length */}
      {[-6, -2, 2, 6].map((x, i) => (
        <group key={`wire-light-x-${i}`} position={[x, roomHeight - 0.15, 0]}>
          {/* Wire cable */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.005, roomDepth * 0.9, 8]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* LED bulbs along the wire - reduced count for performance */}
          {Array.from({ length: ledBulbCount }, (_, j) => {
            const z = -roomDepth * 0.45 + (j * roomDepth * 0.9) / (ledBulbCount - 1);
            return (
              <group key={`bulb-${j}`} position={[0, 0, z]}>
                {/* Bulb housing */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                  <sphereGeometry args={[0.02, 8, 8]} />
                  <meshStandardMaterial
                    color="#2a2a2a"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </mesh>
                {/* LED light emission */}
                {ledLightsEnabled && (
                  <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
                    <sphereGeometry args={[0.015, 8, 8]} />
                    <meshStandardMaterial
                      color="#ffedd5"
                      emissive="#ffedd5"
                      emissiveIntensity={2}
                    />
                  </mesh>
                )}
              </group>
            );
          })}
        </group>
      ))}

      {/* Wire lights running along the width */}
      {[-5, 0, 5].map((z, i) => (
        <group key={`wire-light-z-${i}`} position={[0, roomHeight - 0.15, z]}>
          {/* Wire cable */}
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.005, 0.005, roomWidth * 0.9, 8]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* LED bulbs along the wire - reduced count for performance */}
          {Array.from({ length: wireBulbCount }, (_, j) => {
            const x = -roomWidth * 0.45 + (j * roomWidth * 0.9) / (wireBulbCount - 1);
            return (
              <group key={`bulb-${j}`} position={[x, 0, 0]}>
                {/* Bulb housing */}
                <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]} position={[0, 0, 0]}>
                  <sphereGeometry args={[0.02, 8, 8]} />
                  <meshStandardMaterial
                    color="#2a2a2a"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </mesh>
                {/* LED light emission */}
                <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]} position={[0, 0, 0.01]}>
                  <sphereGeometry args={[0.015, 8, 8]} />
                  <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={1.5}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}

      {/* Decorative hanging wire lights (curved patterns) */}
      {[
        { x: -4, z: -3, curve: 0.3 },
        { x: 0, z: -3, curve: 0.2 },
        { x: 4, z: -3, curve: 0.3 },
        { x: -4, z: 3, curve: 0.3 },
        { x: 0, z: 3, curve: 0.2 },
        { x: 4, z: 3, curve: 0.3 },
      ].map(({ x, z, curve }, i) => (
        <group key={`hanging-wire-${i}`} position={[x, roomHeight - 0.2, z]}>
          {/* Curved wire cable */}
          {Array.from({ length: 15 }, (_, j) => {
            const t = j / 14;
            const y = -curve * Math.sin(t * Math.PI);
            const wireX = Math.sin(t * Math.PI) * 0.3;
            return (
              <mesh
                key={`wire-segment-${j}`}
                position={[wireX, y, 0]}
                rotation={[0, 0, Math.PI / 4]}
              >
                <cylinderGeometry args={[0.004, 0.004, 0.1, 8]} />
                <meshStandardMaterial
                  color="#1a1a1a"
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            );
          })}
          {/* LED bulbs on hanging wire */}
          {Array.from({ length: 8 }, (_, j) => {
            const t = j / 7;
            const y = -curve * Math.sin(t * Math.PI);
            const wireX = Math.sin(t * Math.PI) * 0.3;
            return (
              <group key={`hanging-bulb-${j}`} position={[wireX, y, 0]}>
                <mesh>
                  <sphereGeometry args={[0.018, 8, 8]} />
                  <meshStandardMaterial
                    color="#2a2a2a"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </mesh>
                {ledLightsEnabled && (
                  <mesh position={[0, 0, 0.01]}>
                    <sphereGeometry args={[0.012, 8, 8]} />
                    <meshStandardMaterial
                      color="#ffedd5"
                      emissive="#ffedd5"
                      emissiveIntensity={2.2}
                    />
                  </mesh>
                )}
              </group>
            );
          })}
        </group>
      ))}

      {/* Back Wall - interactive */}
      <mesh
        ref={(el) => (wallRefs.current[0] = el!)}
        position={[0, roomHeight / 2, -roomDepth / 2]}
        receiveShadow
        onPointerOver={() => setHoveredWall('back')}
        onPointerOut={() => setHoveredWall(null)}
        onClick={() => {
          // Interactive wall click - could trigger info or animation
          console.log('Back wall clicked');
        }}
      >
        <boxGeometry args={[roomWidth, roomHeight, wallThickness]} />
        <meshStandardMaterial
          map={realisticWallTexture}
          normalMap={normalMap}
          roughness={0.85}
          metalness={0}
          emissive={hoveredWall === 'back' ? '#f0f0f0' : '#000000'}
          emissiveIntensity={hoveredWall === 'back' ? 0.1 : 0}
        />
      </mesh>

      {/* Front Wall (with door opening) - interactive */}
      <group position={[0, roomHeight / 2, roomDepth / 2]}>
        {/* Left section */}
        <mesh
          position={[-roomWidth / 4, 0, 0]}
          receiveShadow
          onPointerOver={() => setHoveredWall('front-left')}
          onPointerOut={() => setHoveredWall(null)}
          onClick={() => console.log('Front left wall clicked')}
        >
          <boxGeometry args={[roomWidth / 2, roomHeight, wallThickness]} />
          <meshStandardMaterial
            map={realisticWallTexture}
            normalMap={normalMap}
            roughness={0.85}
            metalness={0}
            emissive={hoveredWall === 'front-left' ? '#f0f0f0' : '#000000'}
            emissiveIntensity={hoveredWall === 'front-left' ? 0.1 : 0}
          />
        </mesh>
        {/* Right section */}
        <mesh
          position={[roomWidth / 4, 0, 0]}
          receiveShadow
          onPointerOver={() => setHoveredWall('front-right')}
          onPointerOut={() => setHoveredWall(null)}
          onClick={() => console.log('Front right wall clicked')}
        >
          <boxGeometry args={[roomWidth / 2, roomHeight, wallThickness]} />
          <meshStandardMaterial
            map={realisticWallTexture}
            normalMap={normalMap}
            roughness={0.85}
            metalness={0}
            emissive={hoveredWall === 'front-right' ? '#f0f0f0' : '#000000'}
            emissiveIntensity={hoveredWall === 'front-right' ? 0.1 : 0}
          />
        </mesh>
      </group>

      {/* Left Wall - interactive */}
      <mesh
        ref={(el) => (wallRefs.current[1] = el!)}
        rotation={[0, Math.PI / 2, 0]}
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        receiveShadow
        onPointerOver={() => setHoveredWall('left')}
        onPointerOut={() => setHoveredWall(null)}
        onClick={() => console.log('Left wall clicked')}
      >
        <boxGeometry args={[roomDepth, roomHeight, wallThickness]} />
        <meshStandardMaterial
          map={realisticWallTexture}
          normalMap={normalMap}
          roughness={0.85}
          metalness={0}
          emissive={hoveredWall === 'left' ? '#f0f0f0' : '#000000'}
          emissiveIntensity={hoveredWall === 'left' ? 0.1 : 0}
        />
      </mesh>

      {/* Right Wall - interactive */}
      <mesh
        ref={(el) => (wallRefs.current[2] = el!)}
        rotation={[0, -Math.PI / 2, 0]}
        position={[roomWidth / 2, roomHeight / 2, 0]}
        receiveShadow
        onPointerOver={() => setHoveredWall('right')}
        onPointerOut={() => setHoveredWall(null)}
        onClick={() => console.log('Right wall clicked')}
      >
        <boxGeometry args={[roomDepth, roomHeight, wallThickness]} />
        <meshStandardMaterial
          map={realisticWallTexture}
          normalMap={normalMap}
          roughness={0.85}
          metalness={0}
          emissive={hoveredWall === 'right' ? '#f0f0f0' : '#000000'}
          emissiveIntensity={hoveredWall === 'right' ? 0.1 : 0}
        />
      </mesh>

      {/* Baseboards */}
      {[
        { pos: [0, 0.1, -roomDepth / 2], rot: 0 }, // Back
        { pos: [-roomWidth / 2, 0.1, 0], rot: Math.PI / 2 }, // Left
        { pos: [roomWidth / 2, 0.1, 0], rot: -Math.PI / 2 }, // Right
      ].map((wall, i) => (
        <mesh
          key={i}
          rotation={[0, wall.rot, 0]}
          position={wall.pos as [number, number, number]}
        >
          <boxGeometry args={[i === 0 ? roomWidth : roomDepth, 0.15, 0.05]} />
          <meshStandardMaterial
            color="#2a1f1a"
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Ceiling Cornices */}
      {[
        { pos: [0, roomHeight - 0.1, -roomDepth / 2], rot: 0 },
        { pos: [-roomWidth / 2, roomHeight - 0.1, 0], rot: Math.PI / 2 },
        { pos: [roomWidth / 2, roomHeight - 0.1, 0], rot: -Math.PI / 2 },
      ].map((wall, i) => (
        <mesh
          key={i}
          rotation={[0, wall.rot, 0]}
          position={wall.pos as [number, number, number]}
        >
          <boxGeometry args={[i === 0 ? roomWidth : roomDepth, 0.2, 0.1]} />
          <meshStandardMaterial
            color="#5c493e"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}


