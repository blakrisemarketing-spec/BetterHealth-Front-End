#!/usr/bin/env node

/**
 * Render hyperframes manifests to videos using the producer
 * This creates HTML pages for each manifest and renders them with Puppeteer
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

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

/**
 * Generate an HTML template from a manifest
 * This creates a playable interactive video representation
 */
function generateHTMLFromManifest(manifest, assetBaseDir) {
  const scenes = manifest.scenes.map(scene => {
    const screenshotPath = path.join(assetBaseDir, scene.content.assetPath);
    const screenshotExists = fs.existsSync(screenshotPath);

    return `
    <div class="scene" data-id="${scene.id}" data-start="${scene.startTime}" data-duration="${scene.duration}">
      <div class="scene-title">${scene.name}</div>
      <div class="scene-content">
        ${screenshotExists ? `<img src="${scene.content.assetPath}" alt="${scene.name}" />` : `<div class="placeholder">Screenshot: ${scene.content.assetPath}</div>`}
      </div>
      ${scene.interactions && scene.interactions.length > 0 ? `
      <div class="interactions">
        ${scene.interactions.map(int => `
        <div class="interaction" data-type="${int.type}" data-timestamp="${int.timestamp}">
          ${int.type}: ${int.target || int.direction || ''}
        </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
    `;
  }).join('');

  const overlays = manifest.overlays ? manifest.overlays.map(overlay => `
    <div class="overlay" id="${overlay.id}" data-type="${overlay.type}">
      ${overlay.text || overlay.html || ''}
    </div>
  `).join('') : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${manifest.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      overflow: hidden;
    }

    .container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #111;
    }

    .viewport {
      width: ${manifest.viewport?.width || 375}px;
      height: ${manifest.viewport?.height || 812}px;
      position: relative;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      border-radius: 40px;
      border: 12px solid #000;
    }

    .scenes {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .scene {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .scene.active {
      opacity: 1;
      z-index: 10;
    }

    .scene-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      overflow: hidden;
    }

    .scene-content img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .scene-title {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 12px;
      color: #999;
      z-index: 20;
      background: rgba(0,0,0,0.3);
      padding: 4px 8px;
      border-radius: 4px;
    }

    .placeholder {
      color: #ccc;
      font-size: 14px;
      text-align: center;
    }

    .overlays {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 30;
    }

    .overlay {
      position: absolute;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      background: rgba(0,0,0,0.5);
      padding: 10px;
      border-radius: 4px;
    }

    .controls {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 40;
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px 20px;
      background: #007AFF;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    }

    button:hover { background: #0051D5; }

    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: #007AFF;
      width: 0%;
      z-index: 35;
    }

    .info {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 12px;
      color: #999;
      background: rgba(0,0,0,0.3);
      padding: 4px 8px;
      border-radius: 4px;
      z-index: 25;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="viewport">
      <div class="scenes" id="scenes">
        ${scenes}
      </div>
      <div class="overlays">
        ${overlays}
      </div>
      <div class="info" id="info">0:00 / ${(manifest.duration / 1000).toFixed(1)}s</div>
      <div class="progress" id="progress"></div>
      <div class="controls">
        <button id="playBtn">▶ Play</button>
        <button id="resetBtn">⟲ Reset</button>
      </div>
    </div>
  </div>

  <script>
    const manifest = ${JSON.stringify(manifest)};
    const scenesEl = document.getElementById('scenes');
    const progressEl = document.getElementById('progress');
    const infoEl = document.getElementById('info');
    const playBtn = document.getElementById('playBtn');
    const resetBtn = document.getElementById('resetBtn');

    let currentTime = 0;
    let isPlaying = false;
    let animationFrame = null;
    let startTime = 0;

    function updateScene() {
      const scenes = document.querySelectorAll('.scene');
      scenes.forEach(scene => {
        const sceneStart = parseInt(scene.dataset.start);
        const sceneDuration = parseInt(scene.dataset.duration);
        const sceneEnd = sceneStart + sceneDuration;

        if (currentTime >= sceneStart && currentTime < sceneEnd) {
          scene.classList.add('active');
        } else {
          scene.classList.remove('active');
        }
      });

      const progress = (currentTime / manifest.duration) * 100;
      progressEl.style.width = progress + '%';

      const minutes = Math.floor(currentTime / 60000);
      const seconds = ((currentTime % 60000) / 1000).toFixed(1);
      const totalSeconds = (manifest.duration / 1000).toFixed(1);
      infoEl.textContent = \`\${minutes}:\${String(Math.floor(seconds)).padStart(2, '0')} / \${totalSeconds}s\`;
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      currentTime = timestamp - startTime;

      if (currentTime >= manifest.duration) {
        currentTime = manifest.duration;
        isPlaying = false;
        playBtn.textContent = '▶ Play';
      }

      updateScene();

      if (isPlaying) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        isPlaying = false;
        playBtn.textContent = '▶ Play';
        cancelAnimationFrame(animationFrame);
      } else {
        isPlaying = true;
        playBtn.textContent = '⏸ Pause';
        startTime = performance.now() - currentTime;
        animationFrame = requestAnimationFrame(animate);
      }
    });

    resetBtn.addEventListener('click', () => {
      isPlaying = false;
      currentTime = 0;
      startTime = 0;
      playBtn.textContent = '▶ Play';
      cancelAnimationFrame(animationFrame);
      updateScene();
    });

    updateScene();
  </script>
</body>
</html>
`;
}

async function renderManifests() {
  console.log('\n🎬 Rendering Hyperframes Manifests\n');
  console.log(`📁 Manifests: ${manifestsDir}`);
  console.log(`📁 Output: ${distDir}\n`);

  // Get all manifest files
  const manifestFiles = fs.readdirSync(manifestsDir)
    .filter(f => f.endsWith('-manifest.json'))
    .sort();

  if (manifestFiles.length === 0) {
    console.log('⚠️  No manifests found');
    return;
  }

  for (const file of manifestFiles) {
    const manifestPath = path.join(manifestsDir, file);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    const htmlFileName = file.replace('-manifest.json', '.html');
    const htmlPath = path.join(distDir, htmlFileName);

    // Generate HTML
    const html = generateHTMLFromManifest(manifest, projectRoot);
    fs.writeFileSync(htmlPath, html);

    console.log(`✓ ${file}`);
    console.log(`  → ${htmlFileName}\n`);
  }

  console.log('\n✅ Rendering complete!\n');
  console.log('📱 To view videos:');
  console.log(`   1. Start a local server in ${distDir}`);
  console.log('   2. Open the HTML files in your browser');
  console.log('   3. Click "Play" to watch the interactive videos\n');
  console.log('Example:');
  console.log(`   cd ${distDir}`);
  console.log('   python3 -m http.server 8000');
  console.log('   # Then open http://localhost:8000 in browser\n');
}

renderManifests().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
