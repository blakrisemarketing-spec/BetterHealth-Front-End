# BetterHealth App Workflows

Complete list of captured workflows and their interactive video manifests.

## 📋 Workflow Index

### 1. ✅ Patient Login Flow
**Status**: Complete and ready to build
- **Duration**: 26 seconds
- **Manifest**: `manifests/patient-login-manifest.json`
- **Screenshots**: 01-07
- **Content**:
  - Splash screen
  - Login form
  - Email entry (interactive text input)
  - Password entry (interactive text input)
  - Login submission (interactive button click)
  - Authentication loading
  - Dashboard success screen
  - Dashboard exploration (scroll)

**Build command**:
```bash
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/patient-login-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/
```

---

### 2. ✅ Dashboard Overview
**Status**: Complete and ready to build
- **Duration**: 20 seconds
- **Manifest**: `manifests/dashboard-overview-manifest.json`
- **Screenshots**: 08-10
- **Content**:
  - Main dashboard view
  - Dashboard cards with statistics
  - Dashboard bottom section
  - Scroll interactions

**Build command**:
```bash
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/dashboard-overview-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/
```

---

### 3. ✅ Appointment Booking
**Status**: Complete and ready to build
- **Duration**: 25 seconds
- **Manifest**: `manifests/appointment-booking-manifest.json`
- **Screenshots**: 12-14
- **Content**:
  - Appointments list/page
  - Appointment booking form
  - Form fields and details
  - Form submission (interactive)

**Build command**:
```bash
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/appointment-booking-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/
```

---

### 4. ⏳ Test Results (Placeholder)
**Status**: Needs additional screenshots
- **Duration**: (Not yet created)
- **Manifest**: `manifests/test-results-manifest.json` (needs to be created)
- **Screenshots**: Needed
- **Content**:
  - Results list
  - Result detail view
  - Result interpretation
  - Sharing/exporting results

**To capture**: Run the capture script and navigate to the test results section of the app.

---

### 5. ⏳ Profile & Settings (Placeholder)
**Status**: Needs additional screenshots
- **Duration**: (Not yet created)
- **Manifest**: `manifests/profile-settings-manifest.json` (needs to be created)
- **Screenshots**: Needed
- **Content**:
  - Profile information
  - Editable profile fields
  - Settings options
  - Logout action

**To capture**: Run the capture script and navigate to the profile/settings section of the app.

---

## 📊 Captured Screenshots

Total: 14 screenshots

### Login Flow (01-07)
```
01-splash.png                    52 KB - App splash screen
02-login-form.png                52 KB - Login form
03-login-email-filled.png        53 KB - Email entered
04-login-password-filled.png     53 KB - Password entered
05-loading.png                   53 KB - Authenticating
06-dashboard.png                 10 KB - Dashboard loaded
07-dashboard-scrolled.png        11 KB - Dashboard scrolled
```

### Dashboard Overview (08-10)
```
08-dashboard-main.png            53 KB - Main dashboard
09-dashboard-cards.png           53 KB - Dashboard cards view
10-dashboard-bottom.png          53 KB - Dashboard bottom section
```

### Appointment Booking (12-14)
```
12-appointments-list.png         46 KB - Appointments page
13-appointment-form.png          49 KB - Booking form
14-appointment-form-fields.png   49 KB - Form with all fields
```

### Other
```
11-no-results-section.png        8.9 KB - No results found (fallback)
```

---

## 🎬 Build All Videos

To build all available workflows at once:

```bash
cd /Users/greatdamzi/Projects/hyperframes

# Build patient login
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/patient-login-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/

# Build dashboard overview
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/dashboard-overview-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/

# Build appointment booking
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/appointment-booking-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/
```

Or create a batch script:

```bash
#!/bin/bash
cd /Users/greatdamzi/Projects/hyperframes

for manifest in ../BetterHealth-Front-End/hyperframes-project/manifests/*-manifest.json; do
  echo "Building: $(basename $manifest)"
  bun run --filter @hyperframes/producer build \
    --manifest "$manifest" \
    --output ../BetterHealth-Front-End/hyperframes-project/dist/
done
```

---

## 📝 Creating Additional Workflows

To capture more workflows (like Test Results or Profile):

### Step 1: Run Enhanced Capture Script
```bash
node scripts/capture-all-workflows.js
```

This will:
- Log in automatically
- Navigate through different sections
- Take screenshots at key points
- Save with sequential numbering

### Step 2: Copy Manifest Template
```bash
cp templates/manifest-template.json manifests/new-workflow-manifest.json
```

### Step 3: Edit Manifest
- Update screenshots paths
- Add interactions for each scene
- Set realistic timings
- Add title overlay

### Step 4: Build and Test
```bash
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/producer build \
  --manifest ../BetterHealth-Front-End/hyperframes-project/manifests/new-workflow-manifest.json \
  --output ../BetterHealth-Front-End/hyperframes-project/dist/
```

---

## 🎥 Preview Videos

Once videos are built to `dist/`, preview them:

```bash
cd /Users/greatdamzi/Projects/hyperframes
bun run --filter @hyperframes/player dev

# Open: http://localhost:3001
# Load videos from: ../BetterHealth-Front-End/hyperframes-project/dist/
```

---

## 📂 File Structure

```
hyperframes-project/
├── assets/mobile-screens/          # 14 captured screenshots
│   ├── 01-07 (login workflow)
│   ├── 08-10 (dashboard workflow)
│   └── 12-14 (appointments workflow)
├── manifests/                       # Workflow definitions
│   ├── patient-login-manifest.json (✅ ready)
│   ├── dashboard-overview-manifest.json (✅ ready)
│   ├── appointment-booking-manifest.json (✅ ready)
│   └── [other manifests as created]
├── scripts/                         # Automation scripts
│   ├── capture-mobile-screenshots.js
│   └── capture-all-workflows.js
└── templates/                       # Templates for new workflows
    └── manifest-template.json
```

---

## 💡 Quick Tips

- **Timing**: Ensure scene durations sum to match total video duration
- **Interactions**: All timestamp values are relative to scene start time
- **Assets**: Keep screenshot filenames consistent (01-, 02-, 03-, etc.)
- **Testing**: Always build and preview before deployment
- **Scaling**: For each new workflow, ~5-7 screenshots is ideal

---

## Next Steps

1. **Build the 3 complete workflows** (Login, Dashboard, Appointments)
2. **Test in the player** to verify smooth playback
3. **Capture additional screenshots** for Test Results and Profile workflows
4. **Create manifests** for remaining workflows
5. **Deploy videos** to the BetterHealth website or app

