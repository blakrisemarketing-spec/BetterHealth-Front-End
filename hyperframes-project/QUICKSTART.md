# Hyperframes BetterHealth Project - Quick Start

## ✅ Project Created

Your hyperframes project is ready. Here's what you have:

```
hyperframes-project/
├── hyperframes.config.json       # Project configuration
├── manifests/                     # Video workflow definitions
│   └── patient-login-manifest.json (example)
├── templates/                     # Template for new manifests
├── assets/mobile-screens/         # Mobile UI screenshots
├── content/                       # Raw content files
├── dist/                          # Generated videos (output)
└── package.json                   # Project metadata
```

## 🚀 Next Steps

### Step 1: Capture Mobile Screenshots

Get screenshots of the BetterHealth app in mobile view:

```bash
# Option A: Using Chrome DevTools
# 1. Open https://app.betterhealth.africa in Chrome
# 2. Login with: peter.dag@gmail.com / Pass.1234
# 3. Toggle iPhone 12 emulation (375x812)
# 4. Take screenshots of each screen
# 5. Save to: assets/mobile-screens/

# Option B: Using Playwright (automated)
npm install -D @playwright/test
npx playwright codegen https://app.betterhealth.africa --device "iPhone 12"
```

Screenshot naming convention:
```
01-splash.png
02-login-form.png
03-loading.png
04-dashboard.png
05-menu.png
06-results.png
07-appointments.png
08-settings.png
```

### Step 2: Create Manifests

Copy the template and create manifests for each workflow:

```bash
# Copy template for new workflow
cp templates/manifest-template.json manifests/dashboard-manifest.json

# Edit the manifest with:
# - Scene definitions (one per screenshot)
# - Interactions (clicks, scrolls, text input)
# - Transitions between scenes
# - Overlays (titles, captions)
```

### Step 3: Build Videos

Once you have assets and manifests:

```bash
cd /Users/greatdamzi/Projects/hyperframes

# Build a specific manifest
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/patient-login-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/

# Or build all manifests in the project
bun run --filter @hyperframes/producer build:project \
  ../BetterHealth-Front-End/hyperframes-project
```

### Step 4: Preview Videos

Test your videos in the Hyperframes player:

```bash
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/player dev

# Open: http://localhost:3001
# Load videos from: ../BetterHealth-Front-End/hyperframes-project/dist/
```

## 📝 Manifest Structure Quick Reference

### Basic Scene
```json
{
  "id": "scene_1",
  "name": "Login Form",
  "startTime": 0,
  "duration": 5000,
  "content": {
    "type": "screenshot",
    "assetPath": "assets/mobile-screens/02-login-form.png"
  },
  "interactions": []
}
```

### Scene with Interactions
```json
{
  "id": "scene_2",
  "name": "Submitting Login",
  "startTime": 5000,
  "duration": 3000,
  "interactions": [
    {
      "type": "text_input",
      "target": "email_field",
      "value": "peter.dag@gmail.com",
      "timestamp": 500
    },
    {
      "type": "button_click",
      "target": "login_btn",
      "timestamp": 2000
    }
  ]
}
```

### Transition
```json
{
  "from": "scene_1",
  "to": "scene_2",
  "type": "fade",
  "duration": 500
}
```

### Title Overlay
```json
{
  "id": "title",
  "type": "text",
  "text": "Login to BetterHealth",
  "position": {"x": 10, "y": 10},
  "styling": {
    "fontSize": "18px",
    "color": "#ffffff",
    "backgroundColor": "rgba(0,0,0,0.5)"
  },
  "duration": [0, 30000]
}
```

## 🎥 Interaction Types

| Type | Example | Timestamp |
|------|---------|-----------|
| `text_input` | Type email | 1000ms |
| `button_click` | Click Login | 2000ms |
| `scroll` | Scroll down | 3000ms |
| `tap` | Touch menu | 1500ms |
| `swipe` | Swipe page | 2500ms |

All timestamps are relative to scene start time.

## 📱 Mobile Viewport

All videos use iPhone 12 proportions:
- **Width**: 375px
- **Height**: 812px
- **DPI**: 72 (web)
- **Orientation**: Portrait

## 🔗 Workflows to Create

1. **Patient Login** ✓ (template provided)
2. **Dashboard Overview** - Main dashboard tour
3. **Viewing Test Results** - Results detail flow
4. **Booking Appointments** - Appointment scheduling
5. **Profile Settings** - User settings management

## 📚 Resources

- **Hyperframes Skill**: `/Users/greatdamzi/Projects/shared-skills/hyperframes/`
- **Full README**: `README.md` (detailed documentation)
- **Hyperframes Monorepo**: `/Users/greatdamzi/Projects/hyperframes/`
- **Studio**: Run `bun run studio` in hyperframes dir
- **Player**: Run `bun run player dev` in hyperframes dir

## ⚡ Quick Commands

```bash
# View project config
cat hyperframes.config.json

# List all manifests
ls -la manifests/

# List mobile screenshots
ls -la assets/mobile-screens/

# Open Hyperframes Studio
cd ../../hyperframes && bun run studio

# Check hyperframes installation
cd ../../hyperframes && bun install
```

## 💡 Tips

- Start with one workflow to test the build process
- Use consistent naming for assets (01-, 02-, 03-, etc.)
- Set realistic interaction timings (typing takes time!)
- Transitions should be 300-800ms for smooth playback
- Test videos in the player before deployment
- Keep manifest files under 100KB for fast builds

## ❓ Troubleshooting

**Problem**: Manifests won't build
- Check asset paths are correct
- Verify scene IDs are unique
- Ensure interactions timestamps are within scene duration

**Problem**: Videos look choppy
- Increase transition duration
- Add more intermediate scenes
- Verify screenshot dimensions are 375x812

**Problem**: Interactions don't show
- Check interaction types are supported
- Verify target IDs match your screenshot
- Ensure timestamps are within scene duration

---

Ready? Start with Step 1: Capture mobile screenshots of the app! 🎬
