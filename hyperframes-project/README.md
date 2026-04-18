# BetterHealth Interactive Videos

Interactive video demonstrations of the BetterHealth Africa app interface in mobile view using Hyperframes.

## Overview

This project uses the Hyperframes framework to create interactive, animated video walkthroughs of key user workflows in the BetterHealth app. Videos are generated from manifests that define scenes, interactions, and transitions.

## Project Structure

```
hyperframes-project/
├── hyperframes.config.json          # Main project configuration
├── manifests/                       # Video manifest definitions
│   ├── patient-login-manifest.json
│   ├── dashboard-manifest.json
│   ├── test-results-manifest.json
│   └── appointment-booking-manifest.json
├── content/                         # Raw content files
├── templates/                       # Reusable template definitions
├── assets/
│   └── mobile-screens/              # Screenshots and mobile UI assets
├── dist/                            # Generated video output
└── README.md
```

## Configuration

### `hyperframes.config.json`

Main project configuration file with:
- **viewport**: Mobile device dimensions (375x812 - iPhone proportions)
- **demoCredentials**: Test account credentials
- **workflows**: List of video workflow definitions
- **outputDir**: Where generated videos are saved

```json
{
  "name": "BetterHealth Interactive Videos",
  "viewport": {
    "width": 375,
    "height": 812,
    "type": "mobile"
  },
  "demoCredentials": {
    "email": "peter.dag@gmail.com",
    "password": "Pass.1234",
    "appUrl": "https://app.betterhealth.africa"
  }
}
```

## Manifests

Each manifest defines a video workflow using:

### Scenes
Snapshots of the app state with:
- **screenshot**: Asset path to mobile UI image
- **interactions**: User actions (clicks, scrolls, text input)
- **duration**: How long the scene plays

Example scene with interactions:
```json
{
  "id": "scene_2_login_form",
  "name": "Login Form",
  "startTime": 3000,
  "duration": 8000,
  "content": {
    "type": "screenshot",
    "assetPath": "assets/mobile-screens/02-login-form.png"
  },
  "interactions": [
    {
      "id": "email_input",
      "type": "text_input",
      "target": "email_field",
      "value": "peter.dag@gmail.com",
      "timestamp": 1000
    },
    {
      "id": "login_button",
      "type": "button_click",
      "target": "login_btn",
      "timestamp": 6000
    }
  ]
}
```

### Transitions
Animated transitions between scenes:
- **fade**: Fade in/out
- **slide**: Slide transition
- **dissolve**: Dissolve effect

```json
{
  "from": "scene_1_splash",
  "to": "scene_2_login_form",
  "type": "fade",
  "duration": 500
}
```

### Overlays
Text, graphics, or annotations overlaid on the video:
- Titles and captions
- Instructions or callouts
- Highlighting interactive elements

```json
{
  "id": "title_overlay",
  "type": "text",
  "text": "Patient Login Flow",
  "position": {"x": 10, "y": 10},
  "styling": {
    "fontSize": "18px",
    "fontWeight": "bold",
    "color": "#ffffff"
  }
}
```

## Interaction Types

| Type | Description | Example |
|------|-------------|---------|
| `text_input` | Type text in a field | Entering email address |
| `button_click` | Click a button | Submit login button |
| `scroll` | Scroll in a direction | Scrolling down dashboard |
| `tap` | Tap/touch interaction | Opening menu |
| `swipe` | Swipe gesture | Swiping between tabs |
| `long_press` | Long press action | Context menu trigger |

## Usage

### 1. Capturing Mobile Screenshots

Use the Hyperframes studio or capture tools to get mobile screenshots of different app states:

```bash
# Using Playwright to capture mobile screenshots
npx playwright codegen https://app.betterhealth.africa --device "iPhone 12"
```

Save screenshots to `assets/mobile-screens/` with naming convention:
- `01-splash.png`
- `02-login-form.png`
- `03-loading.png`
- `04-dashboard.png`
- etc.

### 2. Creating Manifests

Define video workflows in `manifests/` folder:
- Copy and modify the template manifests
- Update scene references to your assets
- Define interactions with timing
- Add transitions and overlays

### 3. Building Videos

Once manifests are complete and assets are in place:

```bash
# Build a specific manifest
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/producer build manifest:patient-login

# Build all manifests in the BetterHealth project
bun run --filter @hyperframes/producer build:project ../BetterHealth-Front-End/hyperframes-project

# Output videos appear in: hyperframes-project/dist/
```

### 4. Playback

Use the Hyperframes player to test videos:

```bash
# Start the player
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/player dev

# Navigate to: http://localhost:3001
# Load video from: ../BetterHealth-Front-End/hyperframes-project/dist/
```

## Workflow Definitions

### Patient Login Flow
- **File**: `manifests/patient-login-manifest.json`
- **Duration**: 30 seconds
- **Scenes**: Splash → Login Form → Loading → Dashboard
- **Demo**: Interactive login with credentials

### Dashboard Overview
- **File**: `manifests/dashboard-manifest.json`
- **Duration**: 45 seconds
- **Scenes**: Dashboard cards, navigation, widgets
- **Demo**: Scrolling and exploring dashboard

### Viewing Test Results
- **File**: `manifests/test-results-manifest.json`
- **Duration**: 40 seconds
- **Scenes**: Results list, result detail, interpretation guide
- **Demo**: Accessing and understanding results

### Booking Appointments
- **File**: `manifests/appointment-booking-manifest.json`
- **Duration**: 50 seconds
- **Scenes**: Calendar, availability, confirmation
- **Demo**: Step-by-step appointment booking

## Asset Guidelines

### Mobile Screenshots
- **Size**: 375x812 pixels (iPhone 12 size)
- **Format**: PNG or JPEG
- **DPI**: 72 DPI for web
- **Color**: Ensure good contrast for accessibility
- **Naming**: Sequential numbering (01-, 02-, 03-, etc.)

### High-Quality Capture

For accurate mobile screenshots:
1. Use Chrome DevTools with iPhone 12 emulation
2. Set viewport to 375x812
3. Capture individual screens as you navigate
4. Save with consistent naming

## Hyperframes Integration

This project uses the shared hyperframes skill:
- **Location**: `/Users/greatdamzi/Projects/shared-skills/hyperframes/`
- **Commands**: Available via `bun run` in the hyperframes monorepo
- **Builder**: @hyperframes/producer package handles manifest compilation
- **Player**: @hyperframes/player renders the final videos

## Next Steps

1. **Capture Assets**: Get mobile screenshots of each workflow
2. **Refine Manifests**: Adjust timings, interactions, and transitions
3. **Add Overlays**: Include titles, instructions, or highlights
4. **Build Videos**: Compile manifests into playable video files
5. **Test Playback**: Verify videos in the Hyperframes player
6. **Deploy**: Host videos on the BetterHealth website or app

## Resources

- [Hyperframes Documentation](../shared-skills/hyperframes/references/HYPERFRAMES.md)
- [Hyperframes Studio](../hyperframes/packages/studio) - Visual editor
- [Hyperframes Player](../hyperframes/packages/player) - Video playback
- [Hyperframes Producer](../hyperframes/packages/producer) - Manifest compiler

## Support

For issues or questions about hyperframes:
1. Check the shared hyperframes skill documentation
2. Refer to hyperframes monorepo examples
3. Review manifests in this project for patterns
4. Consult the producer documentation for build options
