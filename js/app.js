/**
 * JIAYI WU (@Breakfast012) — SWISS ARCHIVAL PROTOCOL & PORTFOLIO INDEX
 * Aesthetic & Structural References:
 * - masiliang.com (28% sticky left slash-metadata + 72% right figure/video & clause stream)
 * - edgarrodriguez.xyz (Swiss Index of Activities table with hover preview + dual-column Info/CV drawer)
 */
(function () {
  'use strict';

  const DATA = window.CONSOLE_DATA;
  if (!DATA || !Array.isArray(DATA.projects)) {
    console.error('CONSOLE_DATA missing or invalid.');
    return;
  }

  // ── 1. Curated masiliang.com / edgarrodriguez.xyz Metadata per Project ──
  const PROTOCOL_META = {
    'motion-forge-ue5': {
      shortTitle: 'MOTION FORGE (v4.0)',
      slashLines: [
        'UE5 C++ / Python / Control Rig',
        '/ SO(3) tangent denoising / C1-C2 IK lock',
        '/ interactive salience propagation'
      ],
      venueLine: 'Unreal Engine 5.4+ Production Engine / UCL MPBE Collaboration',
      yearLine: '2026–',
      catLabel: 'SYSTEMS & MOCAP',
      captions: [
        'Still from the running system — UE5 Control Rig & custom Slate timeline.',
        'Salience-guided keyframe extraction & 4D Echo propagation view.',
        'Dual-bone IK foot-ground contact locking & C¹ soft-clamped trajectory.',
        'Monocular video pose reconstruction with CoM support polygon stabilization.',
        'Cross-skeleton kinematic retargeting & forearm swing-twist volume preservation.',
        'Kimodo layer composition with 5th-order C² polynomial inertialization.'
      ]
    },
    'tencent-3a-mocap-pipeline': {
      shortTitle: '3A MOCAP & RETARGETING PIPELINE',
      slashLines: [
        'Vicon optical / Xsens inertial / Faceware',
        '/ cross-skeleton kinematic retargeting',
        '/ forearm swing-twist / FACS rigging'
      ],
      venueLine: 'Tencent Interactive Entertainment Group (IEGG), London',
      yearLine: '2025–2026',
      catLabel: 'SYSTEMS & MOCAP',
      captions: [
        'Optical & inertial capture volume calibration record.',
        'Cross-skeleton kinematic retargeting & joint axis alignment.',
        'High-density skeletal & FACS facial rig evaluation.',
        'Production motion cleanup & foot-skate suppression pass.',
        'Real-time UE5 character solver verification.',
        'Multi-performer synchronization & timecode tracking.'
      ]
    },
    'everymacbeth': {
      shortTitle: 'EVERYMACBETH',
      slashLines: [
        'Interactive digital theatre / live mocap',
        '/ real-time projection / spatial audio',
        '/ algorithmic stage protocol'
      ],
      venueLine: 'London / Immersive Theatre Production',
      yearLine: '2026',
      catLabel: 'ART PRACTICE',
      captions: [
        'Stage installation & real-time projection view.',
        'Performer kinematic tracking & virtual double.'
      ]
    },
    'boundfusion': {
      shortTitle: 'BOUNDFUSION',
      slashLines: [
        'VR installation / real-time body tracking',
        '/ haptic feedback / custom shaders',
        '/ sensorimotor coupling protocol'
      ],
      venueLine: 'IEEE VR 2026 XR Gallery Shortlisted',
      yearLine: '2026',
      catLabel: 'RESEARCH / ART',
      captions: [
        'Still from the running VR system — embodied shader field.',
        'Studio installation & wearable haptic apparatus view.',
        'Real-time body tracking & boundary dissolution state.',
        'Participant sensorimotor interaction record.',
        'Spatial calibration & multi-sensory feedback loop.',
        'Exhibition documentation & HMD view.'
      ]
    },
    'the-unchanging-change': {
      shortTitle: 'THE UNCHANGING CHANGE',
      slashLines: [
        'Audiovisual performance / motion capture',
        '/ generative particle dynamics',
        '/ live choreographic system'
      ],
      venueLine: 'London / Live Performance & Moving Image',
      yearLine: '2025',
      catLabel: 'ART PRACTICE',
      captions: [
        'Live performance stream I — kinematic particle coupling.',
        'Live performance stream II — temporal phase shift.',
        'Still from the running projection system.'
      ]
    },
    'terms-and-conditions': {
      shortTitle: 'TERMS AND CONDITIONS',
      slashLines: [
        'Live motion capture / 25-min performance',
        '/ digital doppelgänger / real-time avatar',
        '/ choreographed spatial dialogue'
      ],
      venueLine: 'Riverside Studios London / Open Online Theatre Festival',
      yearLine: '2025',
      catLabel: 'SYSTEMS & MOCAP / ART',
      captions: [
        'Riverside Studios installation & live performance view.',
        'Performer and digital doppelgänger spatial alignment.',
        'Real-time motion capture solver & avatar projection.',
        'Choreographed duet between biological body and rigged double.',
        'Stage lighting & real-time rendering apparatus.',
        'Rehearsal & optical/inertial calibration record.'
      ]
    },
    'edenflux': {
      shortTitle: 'EDENFLUX',
      slashLines: [
        'Full-body motion capture / ECG biofeedback',
        '/ real-time heart-rate coupling',
        '/ generative audiovisual environment'
      ],
      venueLine: 'University of the Arts London (UAL) / Embodied Systems',
      yearLine: '2025',
      catLabel: 'RESEARCH / SYSTEMS',
      captions: [
        'Real-time motion capture & physiological ECG telemetry view.',
        'System architecture & biofeedback protocol documentation.'
      ]
    },
    'erased-resistance': {
      shortTitle: 'ERASED RESISTANCE',
      slashLines: [
        'Interactive installation / sensor network',
        '/ archival media / spatial narrative',
        '/ documentary protocol'
      ],
      venueLine: 'UAL People’s Prize for Equality and Diversity',
      yearLine: '2025',
      catLabel: 'ART PRACTICE',
      captions: [
        'Installation view & interactive archival protocol.',
        'System documentation & design deck.'
      ]
    },
    'boss-plz': {
      shortTitle: 'BOSS PLZ (VR SYSTEM)',
      slashLines: [
        'VR interactive simulation / Unity C#',
        '/ physics-based gesture interaction',
        '/ spatial state machine'
      ],
      venueLine: 'Interactive VR System & Game Architecture',
      yearLine: '2025',
      catLabel: 'SYSTEMS & MOCAP',
      captions: [
        'Still from the running VR simulation.',
        'Interactive physics & spatial rig setup.',
        'Environment topology & lighting bake.',
        'User hand-tracking & object manipulation test.',
        'System walkthrough capture.'
      ]
    },
    'vr-ai-multi-agent-roleplay': {
      shortTitle: 'VR/AI MULTI-AGENT ROLEPLAY',
      slashLines: [
        'VR social simulation / LLM multi-agent',
        '/ embodied avatar kinematics',
        '/ behavioral telemetry protocol'
      ],
      venueLine: 'HKUST Visiting Research / IEEE VRW 2026 (First Author)',
      yearLine: '2025–2026',
      catLabel: 'RESEARCH',
      captions: [
        'Multi-agent VR interaction environment & autonomous avatar state.',
        'Experimental protocol & behavioral telemetry recording.'
      ]
    },
    'vr-body-mapping': {
      shortTitle: 'VR BODY MAPPING PROTOCOL',
      slashLines: [
        'Embodied pedagogy / 3D spatial drawing',
        '/ somatic affect evaluation',
        '/ virtual environment protocol'
      ],
      venueLine: 'Tom Burns Memorial Award 1st Place / IEEE VRW 2026 (First Author)',
      yearLine: '2025–2026',
      catLabel: 'RESEARCH',
      captions: [
        'Situated 3D body-mapping session inside the virtual field.',
        'Somatic annotation & spatial gesture trace.'
      ]
    },
    'unseemly': {
      shortTitle: 'UNSEEMLY',
      slashLines: [
        'Audiovisual installation / moving image',
        '/ spatial projection / corporeal archive',
        '/ multi-channel sound'
      ],
      venueLine: 'London / Exhibition & Moving Image Archive',
      yearLine: '2024',
      catLabel: 'ART PRACTICE',
      captions: [
        'Studio installation view — multi-channel projection.',
        'Still from the running moving-image sequence.',
        'Spatial framing & corporeal observation record.',
        'Exhibition view & viewer proximity test.',
        'Optical distortion & surface texture plate.',
        'Archival sequence documentation.'
      ]
    },
    'desert-drifter': {
      shortTitle: 'DESERT DRIFTER',
      slashLines: [
        'Real-time 3D environment / virtual production',
        '/ procedural terrain / kinematic camera',
        '/ atmospheric simulation'
      ],
      venueLine: 'Digital Environment & Moving Image',
      yearLine: '2024',
      catLabel: 'ART PRACTICE',
      captions: [
        'Wide-field render from the real-time terrain simulation.',
        'Atmospheric scattering & virtual camera trajectory.',
        'Architectural ruin & surface shader study.',
        'Sequence framing & lighting calibration.',
        'Environmental detail plate.',
        'Scene assembly documentation.'
      ]
    },
    'endless': {
      shortTitle: 'ENDLESS',
      slashLines: [
        'Generative visual system / recursive loop',
        '/ spatial light study / digital media'
      ],
      venueLine: 'Digital Media & Visual Protocol',
      yearLine: '2024',
      catLabel: 'ART PRACTICE',
      captions: [
        'Still from the generative loop — state 01.',
        'Still from the generative loop — state 02.',
        'Spatial installation & screen calibration.'
      ]
    },
    'blackbox': {
      shortTitle: 'BLACKBOX',
      slashLines: [
        'Physical computing / ultrasonic & IR sensors',
        '/ Arduino / real-time audiovisual feedback',
        '/ enclosed spatial apparatus'
      ],
      venueLine: 'Interactive Sensor Installation',
      yearLine: '2023',
      catLabel: 'ART PRACTICE',
      captions: [
        'Physical enclosure & sensor array apparatus.',
        'Internal optical/acoustic response during subject proximity.',
        'Hardware wiring & microcontroller calibration.',
        'Studio test of real-time feedback threshold.',
        'Exhibition documentation view.',
        'Structural detail of the black box unit.'
      ]
    },
    'overseer': {
      shortTitle: 'OVERSEER',
      slashLines: [
        'Computer vision / algorithmic gaze',
        '/ surveillance apparatus / real-time tracking',
        '/ installation document'
      ],
      venueLine: 'Media Installation & Vision System',
      yearLine: '2023',
      catLabel: 'ART PRACTICE',
      captions: [
        'Tracking interface & subject detection view.',
        'Spatial camera rig & monitor arrangement.',
        'Visual output from the observation protocol.',
        'Subject trajectory & bounding-box record.',
        'Installation perspective view.',
        'System calibration plate.'
      ]
    },
    'unexpected-ericaliga': {
      shortTitle: 'UNEXPECTED × ERICALIGA',
      slashLines: [
        '3D visual direction / garment simulation',
        '/ digital lookbook / CGI typography'
      ],
      venueLine: 'Commercial Collaboration / Ericaliga',
      yearLine: '2024',
      catLabel: 'COMMERCIAL',
      captions: [
        'Key visual plate 01 — cloth simulation & lighting.',
        'Key visual plate 02 — typographic & material study.',
        'Detail view of digital surface rendering.',
        'Editorial layout & composite frame.',
        'Series variation & color calibration.',
        'Production still.'
      ]
    },
    'tencent-music-wechat-spring-festival': {
      shortTitle: 'TENCENT MUSIC × WECHAT',
      slashLines: [
        'Interactive campaign system / 3D motion graphics',
        '/ real-time mobile visual assets',
        '/ large-scale broadcast design'
      ],
      venueLine: 'Tencent Music Entertainment × WeChat',
      yearLine: '2022',
      catLabel: 'COMMERCIAL',
      captions: [
        'Main interactive interface & 3D key visual.',
        'Character & asset modeling plate.',
        'Motion sequence & mobile viewport adaptation.',
        'Visual system modular specification.',
        'Broadcast graphic package view.',
        'Archival production plate.'
      ]
    },
    'absolute-chill-jazz-concert': {
      shortTitle: '“ABSOLUTE” CHILL JAZZ CONCERT',
      slashLines: [
        'Stage visual identity / live screen graphics',
        '/ typographic system / print & digital'
      ],
      venueLine: 'Live Music Production & Visual Direction',
      yearLine: '2023',
      catLabel: 'COMMERCIAL',
      captions: [
        'Main stage identity & typographic system.',
        'Spatial signage & collateral application.',
        'Screen projection & lighting integration.',
        'Print artifact documentation.',
        'Series overview.'
      ]
    },
    'angel-school': {
      shortTitle: 'ANGEL SCHOOL',
      slashLines: [
        '3D spatial concept / look development',
        '/ stylized architectural modelling',
        '/ lighting & shader study'
      ],
      venueLine: 'Visual Direction & 3D Concept',
      yearLine: '2022',
      catLabel: 'COMMERCIAL',
      captions: [
        'Architectural exterior render — lighting state 01.',
        'Interior spatial corridor & shader study.',
        'Modular asset & prop breakdown.',
        'Camera framing & color script.',
        'Detail view of surface materials.',
        'Concept archive plate.'
      ]
    },
    'empty-space': {
      shortTitle: 'EMPTY SPACE',
      slashLines: [
        'Spatial design / minimal architectural study',
        '/ light & shadow calibration / 3D rendering'
      ],
      venueLine: 'Architectural & Spatial Study',
      yearLine: '2021',
      catLabel: 'COMMERCIAL',
      captions: [
        'Monolithic volume & grazing light study.',
        'Interior void & proportion calibration.',
        'Material texture & orthographic section.',
        'Perspective sequence 04.',
        'Perspective sequence 05.',
        'Spatial archive plate.'
      ]
    },
    'poster-design': {
      shortTitle: 'POSTER ARCHIVE (2021–2024)',
      slashLines: [
        'Swiss & experimental typography / print media',
        '/ grid systems / exhibition graphics'
      ],
      venueLine: 'Selected Graphic Commissions & Exhibitions',
      yearLine: '2024',
      catLabel: 'COMMERCIAL',
      captions: [
        'Poster plate 01 — typographic grid & hierarchy.',
        'Poster plate 02 — exhibition identity.',
        'Poster plate 03 — experimental letterform study.',
        'Poster plate 04 — cultural event commission.',
        'Poster plate 05 — print proof & halftone detail.',
        'Poster plate 06 — series compilation.'
      ]
    },
    'album-design': {
      shortTitle: 'ALBUM PACKAGING & VISUAL ARCHIVE',
      slashLines: [
        'Record sleeve architecture / physical print',
        '/ 3D sonic visualization / editorial layout'
      ],
      venueLine: 'Music Release Commissions',
      yearLine: '2024',
      catLabel: 'COMMERCIAL',
      captions: [
        'Cover plate 01 — physical sleeve & disc assembly.',
        'Cover plate 02 — inner booklet & typographic spread.',
        'Cover plate 03 — 3D form & lighting study.',
        'Cover plate 04 — back cover tracklist protocol.',
        'Cover plate 05 — packaging material detail.',
        'Cover plate 06 — series archive.'
      ]
    }
  };

  // ── 2. Deduplicate High-Resolution Master Figures per Project ──
  function getResolutionScore(url) {
    if (!url) return 0;
    if (url.includes('_car_') || url.includes('_carw_')) return 10;
    const m = url.match(/(?:_rw_|x)(\d{2,4})\.(?:jpg|jpeg|png|webp|gif)/i);
    if (m) return parseInt(m[1], 10);
    return 1000;
  }

  function extractDistinctFigures(project) {
    const rawList = Array.isArray(project.raw_images) ? project.raw_images : [];
    const byUuid = new Map();

    rawList.forEach((url) => {
      // Match the 2nd UUID in cdn.myportfolio.com/<site_uuid>/<img_uuid>_...
      const m = url.match(/myportfolio\.com\/[^/]+\/([a-f0-9\-]+)_/i);
      const key = m ? m[1] : url;
      const isThumbCrop = url.includes('_car_202x158') || url.includes('_carw_202x158') || url.includes('x32.');
      const score = getResolutionScore(url);

      if (!byUuid.has(key)) {
        byUuid.set(key, {
          uuid: key,
          bestUrl: url,
          bestScore: score,
          displayUrl: url,
          displayScore: score,
          isThumbCrop,
          variants: [url]
        });
      } else {
        const entry = byUuid.get(key);
        entry.variants.push(url);
        if (!isThumbCrop) entry.isThumbCrop = false;
        if (score > entry.bestScore) {
          entry.bestScore = score;
          entry.bestUrl = url;
        }
        // Prefer 1920px or 3840px for crisp display
        if (score >= 1200 && (entry.displayScore < 1200 || score > entry.displayScore)) {
          entry.displayScore = score;
          entry.displayUrl = url;
        }
      }
    });

    let allGroups = Array.from(byUuid.values());
    const nonCropGroups = allGroups.filter((g) => !g.isThumbCrop);
    if (nonCropGroups.length > 0) {
      allGroups = nonCropGroups;
    }

    if (allGroups.length === 0 && project.cover_url) {
      allGroups.push({
        uuid: 'cover',
        bestUrl: project.cover_url,
        displayUrl: project.cover_url,
        bestScore: 3840,
        variants: [project.cover_url]
      });
    }

    return allGroups;
  }

  function getValidEmbeds(project) {
    const rawEmbeds = Array.isArray(project.embeds) ? project.embeds : [];
    const seen = new Set();
    const valid = [];
    rawEmbeds.forEach((emb) => {
      if (!emb || !emb.src) return;
      // Exclude non-embeddable profile links
      if (emb.src.includes('instagram.com/')) return;
      const cleanKey = emb.src.split('&autoplay')[0];
      if (seen.has(cleanKey)) return;
      seen.add(cleanKey);
      valid.push(emb);
    });
    return valid;
  }

  // Enrich projects once at boot
  const ENRICHED_PROJECTS = DATA.projects.map((p, idx) => {
    const meta = PROTOCOL_META[p.id] || {
      shortTitle: (p.title || '').toUpperCase(),
      slashLines: (p.tech_stack || []).slice(0, 3).map((t, i) => (i === 0 ? t : `/ ${t}`)),
      venueLine: p.role || 'London, UK',
      yearLine: p.year || '2025',
      catLabel: (p.categories || ['archive'])[0].toUpperCase(),
      captions: []
    };
    const distinctFigures = extractDistinctFigures(p);
    const validEmbeds = getValidEmbeds(p);
    return {
      ...p,
      archiveIndex: idx + 1,
      protocolMeta: meta,
      distinctFigures,
      validEmbeds
    };
  });

  // ── 3. State Management ──
  let activeCategory = 'all';
  let searchQuery = '';
  let currentLightboxItems = [];
  let currentLightboxIndex = 0;

  // DOM References
  const indexSection = document.getElementById('index-section');
  const indexStatusLine = document.getElementById('index-status-line');
  const indexTbody = document.getElementById('swiss-index-tbody');
  const btnCollapseIndex = document.getElementById('btn-collapse-index');
  const searchInput = document.getElementById('archive-search');

  const hoverPreview = document.getElementById('index-hover-preview');
  const hoverImg = document.getElementById('index-hover-img');
  const hoverCaption = document.getElementById('index-hover-caption');

  const streamPubArticle = document.getElementById('protocol-publications');
  const streamPubBody = document.getElementById('stream-publications-body');
  const streamContainer = document.getElementById('protocol-stream-container');

  const infoDrawer = document.getElementById('info-drawer');
  const btnToggleInfo = document.getElementById('btn-toggle-info');
  const btnCloseInfo = document.getElementById('btn-close-info');
  const infoPubList = document.getElementById('info-publications-list');

  // ── 4. Filter Projects ──
  function getFilteredProjects() {
    return ENRICHED_PROJECTS.filter((p) => {
      const catMatch =
        activeCategory === 'all' ||
        (Array.isArray(p.categories) && p.categories.includes(activeCategory));
      if (!catMatch) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const hay = [
        p.title,
        p.subtitle,
        p.summary,
        p.year,
        p.protocolMeta.shortTitle,
        p.protocolMeta.venueLine,
        ...(p.protocolMeta.slashLines || []),
        ...(p.tech_stack || []),
        ...(p.awards || []),
        p.archive_full_text || ''
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }

  // ── 5. Render Info/CV Drawer Publications ──
  function renderInfoPublications() {
    if (!infoPubList || !Array.isArray(DATA.publications)) return;
    infoPubList.innerHTML = DATA.publications
      .map(
        (pub, idx) => `
        <div class="pub-archive-entry">
          <div class="pub-entry-meta">[PUB.0${idx + 1}] // ${escapeHtml(pub.year)} — ${escapeHtml(pub.status)}</div>
          <div class="pub-entry-title">${escapeHtml(pub.title)}</div>
          <div class="pub-entry-venue">${escapeHtml(pub.venue)}</div>
          <div class="pub-entry-authors">${escapeHtml(pub.authors)}</div>
        </div>
      `
      )
      .join('');
  }

  // ── 6. Render Stream Publications Block (02. RESEARCH) ──
  function renderStreamPublications() {
    if (!streamPubBody || !Array.isArray(DATA.publications)) return;
    streamPubBody.innerHTML = `
      <div class="protocol-clauses-grid">
        <div class="protocol-clause">
          <span class="clause-tag">01. SCOPE</span>
          <span class="clause-body">Peer-reviewed journal articles, first-author conference workshop papers, and juried XR exhibitions across IEEE TVCG, IEEE ISMAR, and IEEE VR.</span>
        </div>
        <div class="protocol-clause">
          <span class="clause-tag">02. INSTITUTIONS</span>
          <span class="clause-body">University of the Arts London (UAL) / The Hong Kong University of Science and Technology (HKUST) / UCL Medical Physics &amp; Biomedical Engineering (MPBE).</span>
        </div>
      </div>
      <div class="pub-stream-grid">
        ${DATA.publications
          .map(
            (pub, idx) => `
            <div class="pub-protocol-card">
              <div class="pub-protocol-left">
                <div>PUB // 0${idx + 1}</div>
                <div>${escapeHtml(pub.year)}</div>
                <div>${escapeHtml(pub.type)}</div>
              </div>
              <div class="pub-protocol-right">
                <div class="pub-protocol-title">${escapeHtml(pub.title)}</div>
                <div class="pub-protocol-venue">${escapeHtml(pub.venue)}</div>
                <div class="pub-protocol-authors">${escapeHtml(pub.authors)} — [${escapeHtml(pub.status)}]</div>
                <p class="pub-protocol-abstract">${escapeHtml(pub.abstract)}</p>
              </div>
            </div>
          `
          )
          .join('')}
      </div>
    `;
  }

  // ── 7. Render Mode B: Swiss Archival Index Table (edgarrodriguez.xyz style) ──
  function renderIndexTable(filtered) {
    if (!indexTbody) return;

    const totalRawFigs = filtered.reduce((acc, p) => acc + (p.raw_image_count || 0), 0);
    const totalStreams = filtered.reduce((acc, p) => acc + p.validEmbeds.length, 0);

    if (indexStatusLine) {
      const catTag = activeCategory === 'all' ? 'ALL CATEGORIES' : activeCategory.toUpperCase();
      indexStatusLine.textContent = `INDEX OF ACTIVITIES [${catTag}] // ${filtered.length} ARCHIVED WORKS · ${totalRawFigs} ARCHIVAL FIGURES · ${totalStreams} EMBEDDED STREAMS`;
    }

    indexTbody.innerHTML = filtered
      .map((p) => {
        const noStr = String(p.archiveIndex).padStart(2, '0');
        const mediumStr = p.protocolMeta.slashLines
          .join(' ')
          .replace(/\s*\/\s*/g, ' / ')
          .replace(/^\/\s*/, '');
        const previewImg =
          (p.distinctFigures[0] && p.distinctFigures[0].displayUrl) || p.cover_url || '';

        return `
          <tr
            data-target-id="protocol-${escapeHtml(p.id)}"
            data-preview-img="${escapeHtml(previewImg)}"
            data-preview-caption="// REF. ${noStr} — ${escapeHtml(p.protocolMeta.shortTitle)} (${escapeHtml(p.protocolMeta.yearLine)})"
          >
            <td class="col-no mono-cell">${noStr}</td>
            <td class="col-year mono-cell">${escapeHtml(p.protocolMeta.yearLine)}</td>
            <td class="col-title">${escapeHtml(p.protocolMeta.shortTitle)}</td>
            <td class="col-medium muted-cell">${escapeHtml(mediumStr)}</td>
            <td class="col-cat mono-cell">${escapeHtml(p.protocolMeta.catLabel)}</td>
            <td class="col-venue muted-cell">${escapeHtml(p.protocolMeta.venueLine)}</td>
          </tr>
        `;
      })
      .join('');

    // Attach hover preview & click-to-scroll listeners
    indexTbody.querySelectorAll('tr').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const imgUrl = row.getAttribute('data-preview-img');
        const cap = row.getAttribute('data-preview-caption');
        if (imgUrl && hoverPreview && hoverImg && hoverCaption) {
          hoverImg.src = imgUrl;
          hoverCaption.textContent = cap || '';
          hoverPreview.classList.add('visible');
        }
      });

      row.addEventListener('mouseleave', () => {
        if (hoverPreview) hoverPreview.classList.remove('visible');
      });

      row.addEventListener('click', () => {
        if (hoverPreview) hoverPreview.classList.remove('visible');
        const targetId = row.getAttribute('data-target-id');
        const targetEl = targetId ? document.getElementById(targetId) : null;
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── 8. Render Mode A: Split-Column Protocol Stream (masiliang.com style) ──
  function getFigureCaption(project, figIndex, totalMaster) {
    const customList = project.protocolMeta.captions || [];
    const baseText =
      customList[figIndex] ||
      (figIndex === 0
        ? 'Still from the running system.'
        : figIndex === 1
        ? 'Studio installation & motion capture view.'
        : figIndex === 2
        ? 'Apparatus & spatial calibration record.'
        : `Archival documentation plate ${String(figIndex + 1).padStart(2, '0')}.`);
    const figNum = String(figIndex + 1).padStart(2, '0');
    return `// Fig. ${figNum} ${baseText}`;
  }

  function renderProtocolStream(filtered) {
    if (!streamContainer) return;

    // Show or hide the Publications Protocol Section based on active filter
    if (streamPubArticle) {
      if (
        (activeCategory === 'all' || activeCategory === 'research') &&
        (!searchQuery ||
          'ieee tvcg ismar vrw ucl hkust publication best paper'.includes(
            searchQuery.toLowerCase()
          ))
      ) {
        streamPubArticle.style.display = 'flex';
        // Put publications at top when in RESEARCH mode, or after #2 project in ALL mode
        const parent = streamContainer.parentElement;
        if (activeCategory === 'research' && parent) {
          parent.insertBefore(streamPubArticle, streamContainer);
        } else if (parent) {
          parent.appendChild(streamPubArticle);
        }
      } else {
        streamPubArticle.style.display = 'none';
      }
    }

    streamContainer.innerHTML = filtered
      .map((p) => {
        const noStr = String(p.archiveIndex).padStart(2, '0');
        const meta = p.protocolMeta;
        const distinctFigs = p.distinctFigures || [];
        const rawImgs = p.raw_images || [];
        const embeds = p.validEmbeds || [];
        const descBlocks = p.description_blocks || [];

        // Left Sticky Column: exact masiliang.com slash-separated metadata format
        const slashLinesHtml = meta.slashLines
          .map((line) => `<div>${escapeHtml(line)}</div>`)
          .join('');

        // External / Collaborator links
        const extLinks = (p.external_links || []).slice(0, 6);
        const extLinksHtml =
          extLinks.length > 0
            ? `<div class="meta-links-list">
                 ${extLinks
                   .map(
                     (l) =>
                       `<a href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                         l.text || 'Link'
                       )} ↗</a>`
                   )
                   .join('')}
               </div>`
            : '';

        // Right Column Clause 01–04
        const apparatusStr = (p.tech_stack || []).join(' / ') || meta.slashLines.join(' ');
        const protocolClauseText =
          descBlocks.length > 0
            ? descBlocks[0].replace(/^\d+\.\s*/, '')
            : p.subtitle || 'Executed under controlled studio & real-time engine parameters.';
        const recordClauseText = [
          p.role ? `Role: ${p.role}.` : '',
          p.awards && p.awards.length ? `Recognition: ${p.awards.join('; ')}.` : '',
          `Archive: ${distinctFigs.length} master plates (${rawImgs.length} total resolution records) · ${embeds.length} embedded stream(s).`
        ]
          .filter(Boolean)
          .join(' ');

        // Optional Swiss Benchmark Table (for technical systems with quantitative metrics)
        const metricsTableHtml =
          Array.isArray(p.metrics) && p.metrics.length > 0
            ? `<table class="protocol-metrics-table" aria-label="Measured System Parameters">
                 <thead>
                   <tr>
                     <th>PARAMETER / METRIC</th>
                     ${p.metrics.map((m) => `<th>${escapeHtml(m.label.toUpperCase())}</th>`).join('')}
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td class="mono-cell">MEASURED VALUE</td>
                     ${p.metrics.map((m) => `<td>${escapeHtml(m.value)}</td>`).join('')}
                   </tr>
                 </tbody>
               </table>`
            : '';

        // Embedded Video / Canva Streams (16:9 full width in stream)
        const embedsStreamHtml = embeds
          .map((emb, eIdx) => {
            const streamLabel =
              emb.title || `${emb.type ? emb.type.toUpperCase() : 'STREAM'} RECORD`;
            const streamFigNo = String(eIdx + 1).padStart(2, '0');
            return `
              <div class="protocol-embed-figure">
                <div class="embed-aspect-box">
                  <iframe
                    src="${escapeHtml(emb.src)}"
                    title="${escapeHtml(streamLabel)}"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div class="fig-caption">
                  <span class="fig-caption-main">// Stream ${streamFigNo} — ${escapeHtml(streamLabel)}.</span>
                  <a href="${escapeHtml(emb.src)}" target="_blank" rel="noopener noreferrer" class="fig-caption-sub">[ OPEN STREAM ↗ ]</a>
                </div>
              </div>
            `;
          })
          .join('');

        // Primary Figures in the Right Stream (show up to 5 distinct high-res figures directly, interleaved with protocol clauses)
        const primaryCount = Math.min(distinctFigs.length, 5);
        const primaryFigs = distinctFigs.slice(0, primaryCount);
        const streamFiguresBlocks = [];

        primaryFigs.forEach((fig, fIdx) => {
          const captionText = getFigureCaption(p, fIdx, distinctFigs.length);
          streamFiguresBlocks.push(`
            <figure class="protocol-figure">
              <div
                class="protocol-figure-img-wrap"
                data-project-id="${escapeHtml(p.id)}"
                data-fig-mode="distinct"
                data-fig-index="${fIdx}"
              >
                <img
                  src="${escapeHtml(fig.displayUrl)}"
                  alt="${escapeHtml(p.title)} — Figure ${fIdx + 1}"
                  loading="lazy"
                />
              </div>
              <figcaption class="fig-caption">
                <span class="fig-caption-main">${escapeHtml(captionText)}</span>
                <span class="fig-caption-sub">[ 3840px / HD PLATE · CLICK TO INSPECT ]</span>
              </figcaption>
            </figure>
          `);

          // Interleave additional protocol text blocks between figures (exact masiliang.com rhythm)
          if (fIdx === 0 && descBlocks.length > 1) {
            streamFiguresBlocks.push(`
              <div class="protocol-interleaved-text">
                <span class="clause-tag">03.1 PROCEDURE —</span>
                ${escapeHtml(descBlocks.slice(1).join(' '))}
              </div>
            `);
          } else if (
            fIdx === 1 &&
            p.archive_full_text &&
            p.archive_full_text.length > 45 &&
            p.archive_full_text !== p.summary
          ) {
            streamFiguresBlocks.push(`
              <div class="protocol-interleaved-text">
                <span class="clause-tag">04.1 ARCHIVAL TEXT —</span>
                ${escapeHtml(p.archive_full_text)}
              </div>
            `);
          }
        });

        // Full Archive Record Expander (for all raw figures / remaining master plates)
        const hasMoreFigures = rawImgs.length > primaryCount || distinctFigs.length > primaryCount;
        const expanderHtml = hasMoreFigures
          ? `
            <div class="archive-expander-wrap">
              <div class="archive-expander-bar">
                <span class="mono-label">
                  ARCHIVE RECORD // SHOWING ${primaryCount} OF ${distinctFigs.length} DISTINCT MASTER PLATES (${rawImgs.length} TOTAL ARCHIVE FILES)
                </span>
                <button
                  type="button"
                  class="expand-archive-btn"
                  data-expand-project="${escapeHtml(p.id)}"
                  data-total-raw="${rawImgs.length}"
                  data-total-distinct="${distinctFigs.length}"
                >
                  [ + EXPAND FULL ARCHIVE RECORD (${rawImgs.length} FIGURES) ]
                </button>
              </div>
              <div class="expanded-archive-drawer" id="drawer-${escapeHtml(p.id)}" data-mode="distinct"></div>
            </div>
          `
          : '';

        return `
          <article class="protocol-item" id="protocol-${escapeHtml(p.id)}">
            <!-- Left 28% Sticky Metadata Column (masiliang.com format) -->
            <div class="protocol-left">
              <div class="protocol-sticky-meta">
                <div class="meta-ref-no">REF // ${noStr} · ${escapeHtml(meta.catLabel)}</div>
                <h2 class="meta-title">${escapeHtml(meta.shortTitle)}</h2>
                <div class="meta-slash-lines">
                  ${slashLinesHtml}
                </div>
                <div class="meta-venue-line">${escapeHtml(meta.venueLine)}</div>
                <div class="meta-year">${escapeHtml(meta.yearLine)}</div>

                <div class="meta-extra-notes">
                  <div>FIGURES: ${distinctFigs.length} MASTER / ${rawImgs.length} RAW</div>
                  ${embeds.length > 0 ? `<div>STREAMS: ${embeds.length} EMBEDDED</div>` : ''}
                  <div><a href="#top">↑ INDEX OF ACTIVITIES</a></div>
                </div>
                ${extLinksHtml}
              </div>
            </div>

            <!-- Right 72% Media & Protocol Clause Stream -->
            <div class="protocol-right">
              <div class="protocol-clauses-grid">
                <div class="protocol-clause">
                  <span class="clause-tag">01. SCOPE</span>
                  <span class="clause-body">${escapeHtml(p.summary)}</span>
                </div>
                <div class="protocol-clause">
                  <span class="clause-tag">02. APPARATUS</span>
                  <span class="clause-body">${escapeHtml(apparatusStr)}</span>
                </div>
                <div class="protocol-clause">
                  <span class="clause-tag">03. PROTOCOL</span>
                  <span class="clause-body">${escapeHtml(protocolClauseText)}</span>
                </div>
                <div class="protocol-clause">
                  <span class="clause-tag">04. RECORD</span>
                  <span class="clause-body muted">${escapeHtml(recordClauseText)}</span>
                </div>
              </div>

              ${metricsTableHtml}
              ${embedsStreamHtml}
              ${streamFiguresBlocks.join('')}
              ${expanderHtml}
            </div>
          </article>
        `;
      })
      .join('');

    // Bind figure lightbox clicks in stream
    streamContainer.querySelectorAll('.protocol-figure-img-wrap').forEach((wrap) => {
      wrap.addEventListener('click', () => {
        const pid = wrap.getAttribute('data-project-id');
        const fIdx = parseInt(wrap.getAttribute('data-fig-index') || '0', 10);
        openProjectLightbox(pid, 'distinct', fIdx);
      });
    });

    // Bind [ + EXPAND FULL ARCHIVE RECORD (N FIGURES) ] buttons
    streamContainer.querySelectorAll('.expand-archive-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-expand-project');
        const totalRaw = btn.getAttribute('data-total-raw');
        const drawer = document.getElementById(`drawer-${pid}`);
        if (!drawer) return;

        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
          drawer.classList.remove('open');
          btn.textContent = `[ + EXPAND FULL ARCHIVE RECORD (${totalRaw} FIGURES) ]`;
        } else {
          drawer.classList.add('open');
          btn.textContent = `[ − COLLAPSE ARCHIVE RECORD (${totalRaw} FIGURES) ]`;
          renderExpandedArchiveDrawer(pid, 'raw');
        }
      });
    });
  }

  // ── 9. Render Expanded Full Archive Contact Sheet ──
  function renderExpandedArchiveDrawer(projectId, mode) {
    const proj = ENRICHED_PROJECTS.find((p) => p.id === projectId);
    const drawer = document.getElementById(`drawer-${projectId}`);
    if (!proj || !drawer) return;

    drawer.setAttribute('data-mode', mode);
    const distinctList = proj.distinctFigures || [];
    const rawList = proj.raw_images || [];

    const items =
      mode === 'distinct'
        ? distinctList.map((f, i) => ({
            thumb: f.displayUrl,
            full: f.bestUrl,
            caption: `// Fig. ${String(i + 1).padStart(2, '0')} Master Plate (${f.variants.length} res)`
          }))
        : rawList.map((u, i) => ({
            thumb: u,
            full: u,
            caption: `// Archive Record #${String(i + 1).padStart(2, '0')}`
          }));

    drawer.innerHTML = `
      <div class="expanded-archive-controls">
        <span>FULL ARCHIVAL CONTACT SHEET // ${escapeHtml(proj.protocolMeta.shortTitle)} (${items.length} RECORDS)</span>
        <div style="display:flex;gap:12px;">
          <button type="button" class="nav-link ${mode === 'raw' ? 'active' : ''}" data-drawer-mode="raw">
            ALL ARCHIVE FILES (${rawList.length})
          </button>
          <span class="nav-slash">/</span>
          <button type="button" class="nav-link ${mode === 'distinct' ? 'active' : ''}" data-drawer-mode="distinct">
            UNIQUE MASTER PLATES (${distinctList.length})
          </button>
        </div>
      </div>
      <div class="expanded-archive-grid">
        ${items
          .map(
            (it, idx) => `
            <div class="expanded-grid-cell" data-cell-idx="${idx}">
              <img src="${escapeHtml(it.thumb)}" alt="${escapeHtml(proj.title)} record ${idx + 1}" loading="lazy" />
              <div class="expanded-grid-caption">${escapeHtml(it.caption)}</div>
            </div>
          `
          )
          .join('')}
      </div>
    `;

    drawer.querySelectorAll('[data-drawer-mode]').forEach((mBtn) => {
      mBtn.addEventListener('click', () => {
        const nextMode = mBtn.getAttribute('data-drawer-mode') || 'raw';
        renderExpandedArchiveDrawer(projectId, nextMode);
      });
    });

    drawer.querySelectorAll('.expanded-grid-cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        const idx = parseInt(cell.getAttribute('data-cell-idx') || '0', 10);
        openProjectLightbox(projectId, mode, idx);
      });
    });
  }

  // ── 10. Pure Archival 3840px Lightbox ──
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxRaw = document.getElementById('lightbox-raw');
  const lightboxStage = document.getElementById('lightbox-stage');

  function openProjectLightbox(projectId, mode, index) {
    const proj = ENRICHED_PROJECTS.find((p) => p.id === projectId);
    if (!proj) return;

    if (mode === 'raw') {
      currentLightboxItems = (proj.raw_images || []).map((u, i) => ({
        url: u,
        caption: `${proj.protocolMeta.shortTitle} (${proj.protocolMeta.yearLine}) — // Archive Record ${String(
          i + 1
        ).padStart(2, '0')} of ${proj.raw_images.length}`
      }));
    } else {
      currentLightboxItems = (proj.distinctFigures || []).map((f, i) => ({
        url: f.bestUrl,
        caption: `${proj.protocolMeta.shortTitle} (${proj.protocolMeta.yearLine}) — ${getFigureCaption(
          proj,
          i,
          proj.distinctFigures.length
        )}`
      }));
    }

    if (currentLightboxItems.length === 0) return;
    showLightboxItem(index);
    if (lightboxOverlay) {
      lightboxOverlay.classList.add('open');
      lightboxOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function showLightboxItem(index) {
    if (!currentLightboxItems.length) return;
    currentLightboxIndex =
      (index + currentLightboxItems.length) % currentLightboxItems.length;
    const item = currentLightboxItems[currentLightboxIndex];
    if (lightboxImg) lightboxImg.src = item.url;
    if (lightboxMeta) {
      lightboxMeta.textContent = `[${currentLightboxIndex + 1}/${currentLightboxItems.length}] ${item.caption}`;
    }
    if (lightboxRaw) lightboxRaw.href = item.url;
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('open');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () =>
    showLightboxItem(currentLightboxIndex - 1)
  );
  document.getElementById('lightbox-next')?.addEventListener('click', () =>
    showLightboxItem(currentLightboxIndex + 1)
  );
  lightboxStage?.addEventListener('click', (e) => {
    if (e.target === lightboxStage) closeLightbox();
  });

  // ── 11. Header Controls: View Mode, Category Filters, Info Drawer, Search ──
  const btnModeIndex = document.getElementById('btn-mode-index');
  const btnModeStream = document.getElementById('btn-mode-stream');

  function setIndexCollapsed(collapsed) {
    if (!indexSection || !btnCollapseIndex) return;
    if (collapsed) {
      indexSection.classList.add('collapsed');
      btnCollapseIndex.textContent = '[ SHOW INDEX ↓ ]';
    } else {
      indexSection.classList.remove('collapsed');
      btnCollapseIndex.textContent = '[ HIDE INDEX ↑ ]';
    }
  }

  btnCollapseIndex?.addEventListener('click', () => {
    const isCollapsed = indexSection?.classList.contains('collapsed');
    setIndexCollapsed(!isCollapsed);
  });

  btnModeIndex?.addEventListener('click', () => {
    btnModeIndex.classList.add('active');
    btnModeStream?.classList.remove('active');
    setIndexCollapsed(false);
    indexSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  btnModeStream?.addEventListener('click', () => {
    btnModeStream.classList.add('active');
    btnModeIndex?.classList.remove('active');
    const streamSec = document.getElementById('stream-section');
    streamSec?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Category filter buttons
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      renderAll();
    });
  });

  // Info / CV Drawer toggle
  function toggleInfoDrawer(forceState) {
    if (!infoDrawer || !btnToggleInfo) return;
    const willOpen =
      typeof forceState === 'boolean'
        ? forceState
        : !infoDrawer.classList.contains('open');
    if (willOpen) {
      infoDrawer.classList.add('open');
      infoDrawer.setAttribute('aria-hidden', 'false');
      btnToggleInfo.classList.add('active');
      btnToggleInfo.setAttribute('aria-expanded', 'true');
      infoDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      infoDrawer.classList.remove('open');
      infoDrawer.setAttribute('aria-hidden', 'true');
      btnToggleInfo.classList.remove('active');
      btnToggleInfo.setAttribute('aria-expanded', 'false');
    }
  }

  btnToggleInfo?.addEventListener('click', () => toggleInfoDrawer());
  btnCloseInfo?.addEventListener('click', () => toggleInfoDrawer(false));

  // Search Input
  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target.value || '').trim();
    renderAll();
  });

  // Copy email buttons
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      if (val && navigator.clipboard) {
        navigator.clipboard.writeText(val);
        const orig = btn.textContent;
        btn.textContent = '[COPIED]';
        setTimeout(() => {
          btn.textContent = orig;
        }, 1600);
      }
    });
  });

  // Keyboard shortcuts for Lightbox & Drawer
  window.addEventListener('keydown', (e) => {
    if (lightboxOverlay?.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightboxItem(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') showLightboxItem(currentLightboxIndex + 1);
      return;
    }
    if (e.key === 'Escape' && infoDrawer?.classList.contains('open')) {
      toggleInfoDrawer(false);
    }
  });

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderAll() {
    const filtered = getFilteredProjects();
    renderIndexTable(filtered);
    renderProtocolStream(filtered);
  }

  // Boot
  renderInfoPublications();
  renderStreamPublications();
  renderAll();
})();
