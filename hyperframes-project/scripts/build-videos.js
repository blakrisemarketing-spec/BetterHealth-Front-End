#!/usr/bin/env node

/**
 * Build hyperframes videos from manifests
 * Uses @hyperframes/producer to compile manifests into video files
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const manifestsDir = path.join(projectRoot, 'manifests');
const distDir = path.join(projectRoot, 'dist');
const assetsDir = path.join(projectRoot, 'assets');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log(`✓ Created dist directory: ${distDir}`);
}

async function buildVideos() {
  console.log('\n🎬 Building BetterHealth Hyperframes Videos\n');
  console.log(`📁 Manifests: ${manifestsDir}`);
  console.log(`📁 Assets: ${assetsDir}`);
  console.log(`📁 Output: ${distDir}\n`);

  // Get all manifest files
  const manifestFiles = fs.readdirSync(manifestsDir)
    .filter(f => f.endsWith('-manifest.json'))
    .sort();

  if (manifestFiles.length === 0) {
    console.log('⚠️  No manifests found in manifests/ directory');
    return;
  }

  console.log(`Found ${manifestFiles.length} manifest(s):\n`);

  for (const file of manifestFiles) {
    const manifestPath = path.join(manifestsDir, file);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    console.log(`📋 ${file}`);
    console.log(`   Title: ${manifest.title}`);
    console.log(`   Duration: ${manifest.duration}ms`);
    console.log(`   Scenes: ${manifest.scenes.length}`);

    // NOTE: This is a placeholder implementation
    // In a real scenario, you would use the hyperframes producer library
    // to render the manifest into a video file

    // For now, we'll create a manifest summary file
    const outputName = file.replace('-manifest.json', '.json');
    const outputPath = path.join(distDir, outputName);

    // Create a render-ready manifest
    const renderManifest = {
      ...manifest,
      _metadata: {
        buildDate: new Date().toISOString(),
        buildTool: 'hyperframes-producer',
        status: 'ready_for_rendering'
      }
    };

    fs.writeFileSync(outputPath, JSON.stringify(renderManifest, null, 2));
    console.log(`   ✓ Prepared: ${outputName}\n`);
  }

  console.log('\n✅ Build preparation complete!\n');
  console.log('Next steps:');
  console.log('1. Use hyperframes studio to render manifests');
  console.log('2. Or use hyperframes producer API to compile videos');
  console.log('3. Output videos will be saved to: dist/\n');
  console.log('📝 To render with the producer:');
  console.log('   cd /Users/greatdamzi/Projects/hyperframes');
  console.log('   bun run --filter @hyperframes/producer build\n');
}

buildVideos().catch(err => {
  console.error('❌ Error building videos:', err.message);
  process.exit(1);
});
