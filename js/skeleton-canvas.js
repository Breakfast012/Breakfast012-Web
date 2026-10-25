/**
 * EMBODIED MOTION CONSOLE // 3D Kinematic Skeleton & Motion Trajectory Canvas
 * Renders:
 * 1) #bg-skeleton-canvas: Ambient 3D mocap point-cloud & trajectory particles
 * 2) #hero-mocap-canvas: Articulated 3D humanoid mocap rig performing martial/dance kinematics
 *    with Swing-Twist vectors, planted-foot IK lock rings, and C2 trajectory ribbons.
 */
(function () {
  const bgCanvas = document.getElementById('bg-skeleton-canvas');
  const heroCanvas = document.getElementById('hero-mocap-canvas');
  const fpsEl = document.getElementById('hud-fps');
  const coordEl = document.getElementById('hud-coords');

  let mouseX = 0.5;
  let mouseY = 0.5;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / Math.max(1, window.innerWidth);
    mouseY = e.clientY / Math.max(1, window.innerHeight);
    if (coordEl) {
      const wx = ((mouseX - 0.5) * 400).toFixed(1);
      const wy = ((0.5 - mouseY) * 250).toFixed(1);
      const wz = (Math.sin(performance.now() * 0.001) * 45).toFixed(1);
      coordEl.textContent = `${wx}, ${wy}, ${wz}`;
    }
  });

  // ── 1. Background Mocap Point-Cloud & Trajectory Particles ──
  const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
  let bgW = 0, bgH = 0;
  const markers = [];
  const MARKER_COUNT = 58;

  function resizeCanvases() {
    if (bgCanvas) {
      bgW = bgCanvas.width = window.innerWidth;
      bgH = bgCanvas.height = window.innerHeight;
    }
    if (heroCanvas && heroCanvas.parentElement) {
      heroCanvas.width = heroCanvas.parentElement.clientWidth;
      heroCanvas.height = heroCanvas.parentElement.clientHeight;
    }
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  for (let i = 0; i < MARKER_COUNT; i++) {
    markers.push({
      x: Math.random() * (bgW || 1440),
      y: Math.random() * (bgH || 900),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2.0 + 1.1,
      history: []
    });
  }

  // ── 2. Hero 3D Articulated Humanoid Mocap Skeleton ──
  const heroCtx = heroCanvas ? heroCanvas.getContext('2d') : null;
  const pelHistory = [];
  const handLHistory = [];
  const handRHistory = [];

  // 21-joint anatomical hierarchy
  const BONE_PAIRS = [
    ['pelvis', 'spine1'], ['spine1', 'spine2'], ['spine2', 'neck'], ['neck', 'head'],
    ['spine2', 'clavL'], ['clavL', 'shoulderL'], ['shoulderL', 'elbowL'], ['elbowL', 'wristL'],
    ['spine2', 'clavR'], ['clavR', 'shoulderR'], ['shoulderR', 'elbowR'], ['elbowR', 'wristR'],
    ['pelvis', 'hipL'], ['hipL', 'kneeL'], ['kneeL', 'ankleL'], ['ankleL', 'toeL'],
    ['pelvis', 'hipR'], ['hipR', 'kneeR'], ['kneeR', 'ankleR'], ['ankleR', 'toeR']
  ];

  function computeHumanoidJoints(t) {
    // Fluid martial / contemporary dance mocap loop with planted left foot IK lock
    const phase = t * 1.45;
    const pelvisShiftX = Math.sin(phase) * 0.28;
    const pelvisShiftY = 0.05 + Math.abs(Math.cos(phase * 2)) * 0.08;
    const pelvisShiftZ = Math.cos(phase) * 0.18;

    const joints = {
      pelvis: [pelvisShiftX, pelvisShiftY, pelvisShiftZ],
      spine1: [pelvisShiftX * 0.9, pelvisShiftY + 0.28, pelvisShiftZ * 0.9],
      spine2: [pelvisShiftX * 0.8 + Math.sin(phase + 0.5) * 0.06, pelvisShiftY + 0.56, pelvisShiftZ * 0.8],
      neck:   [pelvisShiftX * 0.75 + Math.sin(phase + 0.8) * 0.08, pelvisShiftY + 0.76, pelvisShiftZ * 0.75],
      head:   [pelvisShiftX * 0.72 + Math.sin(phase + 1.0) * 0.1, pelvisShiftY + 0.98, pelvisShiftZ * 0.72],

      clavL:     [pelvisShiftX * 0.8 - 0.12, pelvisShiftY + 0.54, pelvisShiftZ * 0.8],
      shoulderL: [pelvisShiftX * 0.8 - 0.28, pelvisShiftY + 0.52, pelvisShiftZ * 0.8],
      elbowL:    [pelvisShiftX - 0.52, pelvisShiftY + 0.36 + Math.sin(phase * 1.5) * 0.22, pelvisShiftZ + Math.cos(phase) * 0.28],
      wristL:    [pelvisShiftX - 0.72 + Math.cos(phase * 2) * 0.18, pelvisShiftY + 0.55 + Math.sin(phase * 2) * 0.32, pelvisShiftZ + 0.38],

      clavR:     [pelvisShiftX * 0.8 + 0.12, pelvisShiftY + 0.54, pelvisShiftZ * 0.8],
      shoulderR: [pelvisShiftX * 0.8 + 0.28, pelvisShiftY + 0.52, pelvisShiftZ * 0.8],
      elbowR:    [pelvisShiftX + 0.52, pelvisShiftY + 0.42 + Math.cos(phase * 1.5) * 0.22, pelvisShiftZ - Math.sin(phase) * 0.28],
      wristR:    [pelvisShiftX + 0.76 + Math.sin(phase * 2) * 0.2, pelvisShiftY + 0.64 + Math.cos(phase * 2) * 0.28, pelvisShiftZ - 0.35],

      // Left leg: Stance IK Locked foot (zero foot-skate!)
      hipL:   [pelvisShiftX - 0.16, pelvisShiftY - 0.04, pelvisShiftZ],
      kneeL:  [pelvisShiftX * 0.45 - 0.20, -0.44 + pelvisShiftY * 0.3, pelvisShiftZ * 0.5 + 0.12],
      ankleL: [-0.22, -0.88, 0.05],
      toeL:   [-0.24, -0.92, 0.22],

      // Right leg: Dynamic swing phase with C1 soft-clamped extension
      hipR:   [pelvisShiftX + 0.16, pelvisShiftY - 0.04, pelvisShiftZ],
      kneeR:  [pelvisShiftX + 0.26 + Math.max(0, Math.sin(phase)) * 0.18, -0.38 + Math.max(0, Math.sin(phase)) * 0.26, pelvisShiftZ + Math.cos(phase) * 0.22],
      ankleR: [0.24 + Math.sin(phase) * 0.28, -0.88 + Math.max(0, Math.sin(phase)) * 0.25, Math.cos(phase) * 0.32],
      toeR:   [0.26 + Math.sin(phase) * 0.30, -0.92 + Math.max(0, Math.sin(phase)) * 0.24, Math.cos(phase) * 0.32 + 0.16]
    };
    return joints;
  }

  function project3D(pt, cx, cy, scale, yaw, pitch) {
    const [x, y, z] = pt;
    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
    const y2 = y * cosP - z1 * sinP;
    const z2 = y * sinP + z1 * cosP;
    const fov = 3.4 / (3.4 + z2 * 0.55);
    return [cx + x1 * scale * fov, cy - y2 * scale * fov, z2];
  }

  let lastFpsTime = performance.now();
  let frameCount = 0;

  function animate(now) {
    frameCount++;
    if (now - lastFpsTime >= 600) {
      const fps = Math.min(60.0, (frameCount * 1000) / (now - lastFpsTime));
      if (fpsEl) fpsEl.textContent = `${fps.toFixed(1)} FPS`;
      frameCount = 0;
      lastFpsTime = now;
    }

    const t = now * 0.001;

    // Render ambient background point-cloud
    if (bgCtx && bgW > 0) {
      bgCtx.clearRect(0, 0, bgW, bgH);
      for (let i = 0; i < markers.length; i++) {
        const m = markers[i];
        m.x += m.vx;
        m.y += m.vy;
        if (m.x < 0 || m.x > bgW) m.vx *= -1;
        if (m.y < 0 || m.y > bgH) m.vy *= -1;

        m.history.push([m.x, m.y]);
        if (m.history.length > 12) m.history.shift();

        // Draw subtle trajectory tail
        if (m.history.length > 2) {
          bgCtx.beginPath();
          bgCtx.moveTo(m.history[0][0], m.history[0][1]);
          for (let k = 1; k < m.history.length; k++) {
            bgCtx.lineTo(m.history[k][0], m.history[k][1]);
          }
          bgCtx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
          bgCtx.lineWidth = 1;
          bgCtx.stroke();
        }

        // Connect nearby markers like optical mocap rigid-body clusters
        for (let j = i + 1; j < markers.length; j++) {
          const m2 = markers[j];
          const dx = m.x - m2.x;
          const dy = m.y - m2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 18500) {
            const alpha = (1 - distSq / 18500) * 0.14;
            bgCtx.beginPath();
            bgCtx.moveTo(m.x, m.y);
            bgCtx.lineTo(m2.x, m2.y);
            bgCtx.strokeStyle = `rgba(0, 240, 255, ${alpha.toFixed(3)})`;
            bgCtx.lineWidth = 0.8;
            bgCtx.stroke();
          }
        }

        bgCtx.beginPath();
        bgCtx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        bgCtx.fillStyle = 'rgba(0, 240, 255, 0.38)';
        bgCtx.fill();
      }
    }

    // Render Hero 3D Articulated Mocap Rig Overlay (Right side of Hero)
    if (heroCtx && heroCanvas.width > 0) {
      const hw = heroCanvas.width;
      const hh = heroCanvas.height;
      heroCtx.clearRect(0, 0, hw, hh);

      const cx = hw > 900 ? hw * 0.78 : hw * 0.5;
      const cy = hh * 0.52;
      const scale = Math.min(hw, hh) * 0.25;
      const yaw = t * 0.35 + (mouseX - 0.5) * 0.85;
      const pitch = 0.16 + (mouseY - 0.5) * 0.25;

      const joints3D = computeHumanoidJoints(t);
      const proj = {};
      for (const [k, pt] of Object.entries(joints3D)) {
        proj[k] = project3D(pt, cx, cy, scale, yaw, pitch);
      }

      // Ground calibration grid ring under feet
      const groundOrigin = project3D([0, -0.92, 0], cx, cy, scale, yaw, pitch);
      heroCtx.beginPath();
      heroCtx.ellipse(groundOrigin[0], groundOrigin[1], scale * 0.65, scale * 0.22, 0, 0, Math.PI * 2);
      heroCtx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
      heroCtx.lineWidth = 1;
      heroCtx.stroke();

      // Planted Foot IK Lock indicator ring on ankleL
      const footL = proj.ankleL;
      heroCtx.beginPath();
      heroCtx.arc(footL[0], footL[1], 11 + Math.sin(t * 5) * 2.5, 0, Math.PI * 2);
      heroCtx.strokeStyle = 'rgba(16, 185, 129, 0.75)';
      heroCtx.lineWidth = 1.5;
      heroCtx.stroke();

      // Update motion trails
      pelHistory.push(proj.pelvis);
      handLHistory.push(proj.wristL);
      handRHistory.push(proj.wristR);
      if (pelHistory.length > 36) pelHistory.shift();
      if (handLHistory.length > 42) handLHistory.shift();
      if (handRHistory.length > 42) handRHistory.shift();

      const drawTrail = (arr, color) => {
        if (arr.length < 3) return;
        heroCtx.beginPath();
        heroCtx.moveTo(arr[0][0], arr[0][1]);
        for (let i = 1; i < arr.length; i++) {
          heroCtx.lineTo(arr[i][0], arr[i][1]);
        }
        heroCtx.strokeStyle = color;
        heroCtx.lineWidth = 1.8;
        heroCtx.stroke();
      };
      drawTrail(pelHistory, 'rgba(245, 158, 11, 0.55)');
      drawTrail(handLHistory, 'rgba(0, 240, 255, 0.55)');
      drawTrail(handRHistory, 'rgba(0, 240, 255, 0.45)');

      // Draw bones
      for (const [a, b] of BONE_PAIRS) {
        const pa = proj[a], pb = proj[b];
        if (!pa || !pb) continue;
        heroCtx.beginPath();
        heroCtx.moveTo(pa[0], pa[1]);
        heroCtx.lineTo(pb[0], pb[1]);
        heroCtx.strokeStyle = 'rgba(0, 240, 255, 0.72)';
        heroCtx.lineWidth = 2.2;
        heroCtx.stroke();
      }

      // Draw joints
      for (const [name, p] of Object.entries(proj)) {
        heroCtx.beginPath();
        const r = name === 'pelvis' || name === 'head' ? 4.5 : 3.2;
        heroCtx.arc(p[0], p[1], r, 0, Math.PI * 2);
        heroCtx.fillStyle = name === 'ankleL' ? '#10b981' : (name === 'pelvis' ? '#f59e0b' : '#00f0ff');
        heroCtx.fill();
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
