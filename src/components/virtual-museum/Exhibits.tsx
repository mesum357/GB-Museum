import { Suspense } from 'react';
import { Painting } from './Painting';
import { MarkhorStatue } from './MarkhorStatue';
import { LeopardStatue } from './LeopardStatue';
import { DressDisplay } from './DressDisplay';
import { GoatHead } from './GoatHead';
import { GemsDisplay } from './GemsDisplay';
import { Cupboard } from './Cupboard';
import { Bookshelf } from './Bookshelf';
import { AttireDisplay } from './AttireDisplay';

interface ExhibitsProps {
  onInteract?: (id: string, data: any) => void;
}

interface Exhibit {
  id: string;
  type: 'painting' | 'statue' | 'leopard' | 'dress' | 'goathead' | 'gems' | 'cupboard' | 'bookshelf' | 'attire';
  position: [number, number, number];
  rotation?: [number, number, number];
  modelPath?: string; // For attire models
  data: {
    title: string;
    description: string;
    year?: number;
    artist?: string;
    material?: string;
  };
}

const exhibits: Exhibit[] = [
  // Paintings on left wall
  // Left wall is at x = -10, wall thickness = 0.2, so wall surface is at x = -9.9
  // Painting frame depth = 0.05, so center should be at x = -9.9 - 0.025 = -9.925
  {
    id: 'painting-1',
    type: 'painting',
    position: [-9.925, 1.5, -2],
    rotation: [0, Math.PI / 2, 0],
    data: {
      title: 'Karakoram Landscape',
      description: 'A majestic view of the Karakoram mountain range showcasing the natural beauty of Gilgit-Baltistan.',
      year: 2023,
      artist: 'Ahmed Ali',
    },
  },
  {
    id: 'painting-2',
    type: 'painting',
    position: [-9.925, 1.5, 2],
    rotation: [0, Math.PI / 2, 0],
    data: {
      title: 'Silk Route Heritage',
      description: 'An artistic depiction of the ancient Silk Route passing through the mountains of Gilgit-Baltistan.',
      year: 2022,
      artist: 'Fatima Khan',
    },
  },
  // Paintings on back wall
  // Back wall is at z = -7.5, wall thickness = 0.2, so wall surface is at z = -7.4
  // Painting frame depth = 0.05, so center should be at z = -7.4 - 0.025 = -7.425
  {
    id: 'painting-3',
    type: 'painting',
    position: [-3, 1.5, -7.425],
    rotation: [0, 0, 0],
    data: {
      title: 'Cultural Festivals',
      description: 'Vibrant colors depicting traditional festivals and celebrations of the region.',
      year: 2023,
      artist: 'Ibrahim Shah',
    },
  },
  {
    id: 'painting-4',
    type: 'painting',
    position: [3, 1.5, -7.425],
    rotation: [0, 0, 0],
    data: {
      title: 'Traditional Architecture',
      description: 'The unique architectural heritage of Gilgit-Baltistan with its distinctive wooden structures.',
      year: 2022,
      artist: 'Nadia Khan',
    },
  },
  // Paintings on right wall
  // Right wall is at x = 10, wall thickness = 0.2, so wall surface is at x = 9.9
  // Painting frame depth = 0.05, so center should be at x = 9.9 + 0.025 = 9.925
  {
    id: 'painting-5',
    type: 'painting',
    position: [9.925, 1.5, -2],
    rotation: [0, -Math.PI / 2, 0],
    data: {
      title: 'Mountain Valleys',
      description: 'A serene depiction of the lush valleys and rivers flowing through the mountains.',
      year: 2023,
      artist: 'Dr. Imran Malik',
    },
  },
  {
    id: 'painting-6',
    type: 'painting',
    position: [9.925, 1.5, 2],
    rotation: [0, -Math.PI / 2, 0],
    data: {
      title: 'Ancient Rock Art',
      description: 'Petroglyphs and rock art from ancient civilizations that once inhabited the region.',
      year: 2021,
      artist: 'Archaeological Team',
    },
  },
  // Markhor statue - back-left area of room
  {
    id: 'markhor-centerpiece',
    type: 'statue',
    position: [-5, 0.5, -4], // Back-left area
    rotation: [0, Math.PI / 4, 0], // Facing towards center
    data: {
      title: 'Markhor - Capra falconeri',
      description: 'The national animal of Pakistan. This majestic wild goat with its distinctive spiral horns is native to the mountains of Gilgit-Baltistan. A highly detailed statue featuring realistic PBR materials.',
      year: 2023,
      material: 'Wood/Bronze',
    },
  },
  // Leopard statue - back-right area of room
  {
    id: 'leopard-statue',
    type: 'leopard',
    position: [5, 0.5, -4], // Back-right area
    rotation: [0, -Math.PI / 4, 0], // Facing towards center
    data: {
      title: 'Snow Leopard - Panthera uncia',
      description: 'The snow leopard, also known as the ounce, is a large cat native to the mountain ranges of Central and South Asia. This majestic predator is well-adapted to life in the high mountains of Gilgit-Baltistan.',
      year: 2023,
      material: 'Wood/Bronze',
    },
  },
  // Attire display 1 - front-left area of room
  {
    id: 'attire-1',
    type: 'attire',
    position: [-5, 0.5, 4], // Front-left area
    rotation: [0, -Math.PI / 4, 0], // Facing towards center
    modelPath: '/models/attire1/model.gltf',
    data: {
      title: 'Traditional Attire 1',
      description: 'A beautiful traditional attire showcasing the rich cultural heritage and craftsmanship of Gilgit-Baltistan.',
      year: 2023,
      material: 'Traditional Fabric',
    },
  },
  // Attire display 2 - front-right area of room
  {
    id: 'attire-2',
    type: 'attire',
    position: [5, 0.5, 4], // Front-right area
    rotation: [0, Math.PI / 4, 0], // Facing towards center
    modelPath: '/models/attire2/model.gltf',
    data: {
      title: 'Traditional Attire 2',
      description: 'An elegant traditional attire representing the cultural traditions and artistic heritage of the region.',
      year: 2023,
      material: 'Traditional Fabric',
    },
  },
  // Gems display on table - First table
  {
    id: 'gems-display-1',
    type: 'gems',
    position: [-3, 0, -3], // Positioned near left wall, back area
    rotation: [0, Math.PI / 4, 0], // Facing towards center
    data: {
      title: 'Precious Gems Collection',
      description: 'A collection of precious and semi-precious stones found in the mountains of Gilgit-Baltistan, including rubies, emeralds, and other rare gemstones.',
      year: 2023,
      material: 'Various Gemstones',
    },
  },
  // Gems display on table - Second table
  {
    id: 'gems-display-2',
    type: 'gems',
    position: [3, 0, 3], // Positioned near right wall, front area
    rotation: [0, -Math.PI / 4, 0], // Facing towards center
    data: {
      title: 'Precious Gems Collection',
      description: 'A collection of precious and semi-precious stones found in the mountains of Gilgit-Baltistan, including rubies, emeralds, and other rare gemstones.',
      year: 2023,
      material: 'Various Gemstones',
    },
  },
  // Cupboard 1 - Left wall, back
  {
    id: 'cupboard-1',
    type: 'cupboard',
    position: [-9.5, 0, -4], // Positioned against left wall, near back
    rotation: [0, Math.PI / 2, 0], // Facing into room
    data: {
      title: 'Traditional Cupboard',
      description: 'An antique wooden cupboard showcasing traditional craftsmanship and storage methods used in Gilgit-Baltistan households.',
      year: 2022,
      material: 'Wood',
    },
  },
  // Cupboard 2 - Back wall, center
  {
    id: 'cupboard-2',
    type: 'cupboard',
    position: [0, 0, -6.5], // Positioned against back wall, center
    rotation: [0, 0, 0], // Facing into room
    data: {
      title: 'Heritage Cupboard',
      description: 'A traditional wooden cupboard displaying artifacts and traditional items from Gilgit-Baltistan.',
      year: 2022,
      material: 'Wood',
    },
  },
  // Cupboard 3 - Right wall, front
  {
    id: 'cupboard-3',
    type: 'cupboard',
    position: [9.5, 0, 4], // Positioned against right wall, near front
    rotation: [0, -Math.PI / 2, 0], // Facing into room
    data: {
      title: 'Antique Cupboard',
      description: 'An antique wooden cupboard showcasing traditional craftsmanship and storage methods used in Gilgit-Baltistan households.',
      year: 2022,
      material: 'Wood',
    },
  },
  // Bookshelf 1 - Left wall, front
  {
    id: 'bookshelf-1',
    type: 'bookshelf',
    position: [-9.5, 0, 4], // Positioned against left wall, near front
    rotation: [0, Math.PI / 2, 0], // Facing into room
    data: {
      title: 'Heritage Bookshelf',
      description: 'A traditional bookshelf displaying historical documents and books related to the culture and history of Gilgit-Baltistan.',
      year: 2023,
      material: 'Wood',
    },
  },
  // Bookshelf 2 - Right wall, back
  {
    id: 'bookshelf-2',
    type: 'bookshelf',
    position: [9.5, 0, -4], // Positioned against right wall, near back
    rotation: [0, -Math.PI / 2, 0], // Facing into room
    data: {
      title: 'Historical Bookshelf',
      description: 'A traditional bookshelf displaying historical documents and books related to the culture and history of Gilgit-Baltistan.',
      year: 2023,
      material: 'Wood',
    },
  },
  // Bookshelf 3 - Back wall, left side
  {
    id: 'bookshelf-3',
    type: 'bookshelf',
    position: [-4, 0, -6.5], // Positioned against back wall, left side
    rotation: [0, 0, 0], // Facing into room
    data: {
      title: 'Cultural Bookshelf',
      description: 'A traditional bookshelf displaying historical documents and books related to the culture and history of Gilgit-Baltistan.',
      year: 2023,
      material: 'Wood',
    },
  },
  // Goat Heads mounted on walls above paintings
  // Paintings are at y = 1.5, height = 1.2, so top is at y = 2.1
  // Goat heads should be above paintings at y = 2.8 (0.7m above painting top)
  
  // Left wall - above painting-1
  // Left wall is at x = -10, wall thickness = 0.2, so wall surface is at x = -9.9
  // Goat head should be forward from wall to prevent embedding (offset by 0.5m total)
  {
    id: 'goathead-1',
    type: 'goathead',
    position: [-9.4, 2.8, -2], // Above painting-1 on left wall, forward from wall surface (0.5m offset)
    rotation: [0, Math.PI / 2, 0], // Facing into room (90° rotation)
    data: {
      title: 'Markhor Head Trophy',
      description: 'A traditional trophy mount of a Markhor head, symbolizing the cultural significance of this majestic mountain goat in the region.',
    },
  },
  // Back wall - above painting-3
  // Back wall is at z = -7.5, wall thickness = 0.2, so wall surface is at z = -7.4
  // Goat head should be forward from wall to prevent embedding (offset by 0.5m total)
  {
    id: 'goathead-2',
    type: 'goathead',
    position: [-3, 2.8, -6.9], // Above painting-3 on back wall, forward from wall surface (0.5m offset)
    rotation: [0, 0, 0], // Facing forward into room
    data: {
      title: 'Heritage Trophy',
      description: 'A ceremonial Markhor head mount representing the hunting traditions and cultural heritage of Gilgit-Baltistan.',
    },
  },
  // Right wall - above painting-5
  // Right wall is at x = 10, wall thickness = 0.2, so wall surface is at x = 9.9
  // Goat head should be forward from wall to prevent embedding (offset by 0.5m total)
  {
    id: 'goathead-3',
    type: 'goathead',
    position: [9.4, 2.8, -2], // Above painting-5 on right wall, forward from wall surface (0.5m offset)
    rotation: [0, -Math.PI / 2, 0], // Facing into room (-90° rotation)
    data: {
      title: 'Traditional Mount',
      description: 'A beautifully crafted Markhor head mount showcasing the artistic traditions and reverence for the national animal of Pakistan.',
    },
  },
];

export function Exhibits({ onInteract }: ExhibitsProps) {
  return (
    <group>
      {exhibits.map((exhibit) => {
        switch (exhibit.type) {
          case 'painting':
            return (
              <Painting
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'statue':
            return (
              <MarkhorStatue
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'leopard':
            return (
              <LeopardStatue
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'dress':
            return (
              <DressDisplay
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'goathead':
            return (
              <GoatHead
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'gems':
            return (
              <GemsDisplay
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'cupboard':
            return (
              <Cupboard
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'bookshelf':
            return (
              <Bookshelf
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          case 'attire':
            return (
              <AttireDisplay
                key={exhibit.id}
                id={exhibit.id}
                position={exhibit.position}
                rotation={exhibit.rotation || [0, 0, 0]}
                modelPath={exhibit.modelPath || ''}
                data={exhibit.data}
                onInteract={onInteract}
              />
            );
          default:
            return null;
        }
      })}
    </group>
  );
}

