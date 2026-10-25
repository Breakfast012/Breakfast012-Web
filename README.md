# EMBODIED MOTION CONSOLE // JIAYI WU (`@Breakfast012`)

> **Technical Artist · Mocap & Rigging Pipeline Engineer · Embodied Media Researcher**  
> **Live Deployment Ready**: Zero-config static architecture for **GitHub Pages** & **Vercel**.

---

## 1. Architecture & Concept

Designed around the **"Embodied Motion Console"** aesthetic (`#07080c` hacker black, `#00f0ff` bone-trajectory cyan, `#e2e8f0` silver, `backdrop-filter: blur(16px)` terminal glass):

- **Full-Screen Showreel Montage Hero (Option 2)**:
  - Muted auto-looping Vimeo Mocap Showreel background + 4K Keyvisual crossfader + real-time 60 FPS 3D articulated humanoid skeleton canvas (`js/skeleton-canvas.js`) visualizing `SO(3)` trajectory ribbons, forearm Swing-Twist vectors, and planted-foot IK lock rings.
  - One-click **Fullscreen Showreel Theater** integrating all 15 video & interactive deck streams (Vimeo, Adobe CCV, YouTube, Canva).
  - Highlight Badges: `Tencent IEGG Technical Artist (Rank #1)` · `IEEE TVCG Best Paper Award (ISMAR 2026)` · `IEEE VR 2026 XR Gallery` · `UAL First-Class Honours (14.3/15, 1st)`.
- **Sticky Identity Mode Switcher**:
  - `[ALL WORKS]`
  - `[01 // TECH & PIPELINE]` — Pinned flagship cards for **Motion Forge: UE5 C++/Python Salience-Guided Animation & Mocap Engine** and **3A Optical/Inertial Mocap & Cross-Skeleton Retargeting Pipeline**, plus `Boss Plz - VR Game`, `Terms and Conditions (Mocap Animator)`, `Edenflux`, `BoundFusion`, `VR/AI Multi-agent Roleplay`, and `VR Body Mapping`.
  - `[02 // RESEARCH & PUBLICATIONS]` — Dedicated peer-reviewed publications console (`IEEE TVCG / ISMAR 2026 Best Paper`, two First-Author `IEEE VRW 2026` papers, `IEEE VR 2027` Under Review full paper, `Motion Forge` biomechanical journal manuscript with Dr. Hubin Zhao at UCL MPBE, and `IEEE VR 2026 XR Gallery`) + research prototypes.
  - `[03 // IMMERSIVE ART & THEATRE]` — Complete archive (`EveryMacbeth` 2026, `BoundFusion` 2026, `The Unchanging Change` 2025, `Terms and Conditions` 2025, `Edenflux` 2025, `Erased Resistance` 2025, `Unseemly` 2024, `Desert Drifter` 2024, `Endless` 2024, `BlackBox` 2023, `Overseer` 2023).
  - `[04 // COMMERCIAL & DESIGN]` — Complete commercial archive (`Unexpected × Ericaliga`, `Tencent Music × WeChat Spring Festival`, `“Absolute” Chill Jazz Concert`, `Angel School`, `Empty Space`, `Poster Design`, `Album Design`).
- **100% Zero-Omission Archive Integrity (`731` Images · `16` Media Entries · `26` Pages)**:
  - Every project opens in the **Cinema Project Modal** with all embedded videos/Canva decks, collaborator Credits (with clickable Instagram links), and a **High-Res Waterfall Gallery** supporting 3840px 4K Lightbox zoom and instant switching between deduplicated master stills and all 731 raw archive URLs.

---

## 2. Directory Structure

```text
Breakfast012-Web/
├── index.html                           # Main Embodied Motion Console entry
├── css/
│   └── console.css                      # Dark terminal & responsive glassmorphic styles
├── js/
│   ├── projects-data.js                 # Compiled dataset (23 projects, 6 publications, 26 raw pages, 731 images, 16 embeds)
│   ├── skeleton-canvas.js               # 60fps 3D kinematic skeleton & point-cloud canvas engine
│   └── app.js                           # Identity mode filter, Cinema Modal, 4K Lightbox & Showreel Theater
├── data/
│   └── breakfast012_full_archive.json   # Complete raw crawl archive from breakfast012.com
├── vercel.json                          # Zero-config Vercel deployment descriptor
└── .nojekyll                            # Zero-config GitHub Pages bypass
```
