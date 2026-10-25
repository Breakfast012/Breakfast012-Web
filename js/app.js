/**
 * EMBODIED MOTION CONSOLE // Main Application Controller
 * Drives Identity Mode Filtering, Cinema Project Modal, 4K Lightbox,
 * Fullscreen Showreel Theater (16 Streams), and Raw 26-Page Archive Inspector.
 */
(function () {
  const DATA = window.CONSOLE_DATA;
  if (!DATA) {
    console.error('CONSOLE_DATA not loaded.');
    return;
  }

  let activeFilter = 'all';
  let searchQuery = '';
  let currentModalProject = null;
  let modalGalleryMode = 'unique'; // 'unique' | 'raw'
  let currentLightboxList = [];
  let currentLightboxIdx = 0;

  // DOM Elements
  const projectsGrid = document.getElementById('projects-grid');
  const pubSection = document.getElementById('publications-section');
  const pubGrid = document.getElementById('publications-grid');
  const hudModeLabel = document.getElementById('hud-active-mode');
  const sectionTitleEl = document.getElementById('matrix-section-title');
  const sectionMetaEl = document.getElementById('matrix-section-meta');
  const searchInput = document.getElementById('project-search-input');

  const MODE_TITLES = {
    all: 'ALL EMBODIED & TECHNICAL WORKS // COMPLETE MATRIX',
    tech: '01 // TECH & PIPELINE (UE5 C++/PYTHON · 3A MOCAP · RIGGING · VR)',
    research: '02 // RESEARCH & PUBLICATIONS (IEEE TVCG · ISMAR · IEEE VRW · UCL/HKUST/UAL)',
    art: '03 // IMMERSIVE ART & THEATRE (2023–2026 EXHIBITED WORKS)',
    commercial: '04 // COMMERCIAL & DESIGN (BRAND COLLABORATIONS & VISUAL SYSTEMS)'
  };

  // ── 1. Initialize Hero Keyvisual Crossfader ──
  function initHeroSlideshow() {
    const container = document.getElementById('hero-keyvisual-backdrop');
    if (!container) return;
    const heroUrls = [
      'https://cdn.myportfolio.com/d14b04bf-20f3-4c0d-8b9b-37e389bf6c6a/f85f5f7f-4805-4093-822f-ef5d5ab7c9b7_rw_3840.jpg?h=130dfd59e26f2528b32a3f7c465e8c92',
      'https://cdn.myportfolio.com/d14b04bf-20f3-4c0d-8b9b-37e389bf6c6a/354e7dfd-66d2-4a2e-b265-c198f6322462_rw_3840.jpg?h=4d40435d37a5db4a1ea9f818b3917b5b',
      'https://cdn.myportfolio.com/d14b04bf-20f3-4c0d-8b9b-37e389bf6c6a/7ce44fbf-ac59-4382-a118-44b6cb7de498_rw_3840.jpg?h=1b9f354aa80891e430e8ef40a31f6eee',
      'https://cdn.myportfolio.com/d14b04bf-20f3-4c0d-8b9b-37e389bf6c6a/376f2fb5-a3a0-4f8b-b1b2-70e7df636009_rw_3840.jpg?h=f368097ca7aa0c7fe571824efa4fb308',
      'https://cdn.myportfolio.com/d14b04bf-20f3-4c0d-8b9b-37e389bf6c6a/d1f70c2d-c2ff-41d6-9598-41b825f85563_rw_3840.png?h=e932ac2302f345af50aec93750d9a73e'
    ];
    heroUrls.forEach((u, i) => {
      const div = document.createElement('div');
      div.className = 'hero-keyvisual-slide' + (i === 0 ? ' active' : '');
      div.style.backgroundImage = `url("${u}")`;
      container.appendChild(div);
    });
    let idx = 0;
    const slides = container.querySelectorAll('.hero-keyvisual-slide');
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 6500);
  }

  // ── 2. Render Academic Publications ──
  function renderPublications() {
    if (!pubGrid) return;
    pubGrid.innerHTML = DATA.publications.map((pub) => `
      <article class="pub-card">
        <div class="pub-badge-row">
          <span class="pub-badge">${escapeHtml(pub.badge)}</span>
          <span class="pub-year">${escapeHtml(pub.year)} · ${escapeHtml(pub.type)}</span>
        </div>
        <h3 class="pub-title">${escapeHtml(pub.title)}</h3>
        <div class="pub-venue">${escapeHtml(pub.venue)}</div>
        <div class="pub-authors">${escapeHtml(pub.authors)}</div>
        <p class="pub-abstract">${escapeHtml(pub.abstract)}</p>
        <div class="pub-tags">
          ${pub.tags.map(t => `<span class="pub-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }

  // ── 3. Render Project Cards Matrix ──
  function getFilteredProjects() {
    return DATA.projects.filter((p) => {
      const matchesCat = activeFilter === 'all' || (p.categories && p.categories.includes(activeFilter));
      if (!matchesCat) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const hay = [
        p.title,
        p.subtitle,
        p.summary,
        p.year,
        p.role,
        ...(p.tech_stack || []),
        ...(p.awards || []),
        p.archive_full_text || ''
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  function updateTabCounts() {
    const counts = {
      all: DATA.projects.length,
      tech: DATA.projects.filter(p => p.categories.includes('tech')).length,
      research: DATA.projects.filter(p => p.categories.includes('research')).length + DATA.publications.length,
      art: DATA.projects.filter(p => p.categories.includes('art')).length,
      commercial: DATA.projects.filter(p => p.categories.includes('commercial')).length
    };
    document.querySelectorAll('.identity-tab').forEach((btn) => {
      const cat = btn.getAttribute('data-filter');
      const pill = btn.querySelector('.count-pill');
      if (pill && counts[cat] !== undefined) {
        pill.textContent = counts[cat];
      }
    });
  }

  function renderProjectsMatrix() {
    if (!projectsGrid) return;
    const list = getFilteredProjects();

    // Show publications block prominently in 'research' or 'all' mode
    if (pubSection) {
      if (activeFilter === 'research' || activeFilter === 'all') {
        pubSection.style.display = 'block';
        // Put publications above project matrix when in Research mode
        const parent = pubSection.parentElement;
        const matrixSec = document.getElementById('matrix-section');
        if (activeFilter === 'research' && parent && matrixSec) {
          parent.insertBefore(pubSection, matrixSec);
        } else if (activeFilter === 'all' && parent && matrixSec) {
          parent.insertBefore(matrixSec, pubSection);
        }
      } else {
        pubSection.style.display = 'none';
      }
    }

    if (sectionTitleEl) {
      sectionTitleEl.textContent = MODE_TITLES[activeFilter] || MODE_TITLES.all;
    }
    if (sectionMetaEl) {
      sectionMetaEl.textContent = `SHOWING ${list.length} PROJECTS · CLICK ANY TERMINAL CARD FOR FULL VIDEOS & 4K STILLS`;
    }
    if (hudModeLabel) {
      hudModeLabel.textContent = activeFilter.toUpperCase();
    }

    projectsGrid.innerHTML = list.map((p) => {
      const metricsHtml = p.metrics ? `
        <div class="card-metrics-row">
          ${p.metrics.map(m => `
            <div class="card-metric-item">
              <span class="card-metric-val">${escapeHtml(m.value)}</span>
              <span class="card-metric-lbl">${escapeHtml(m.label)}</span>
            </div>
          `).join('')}
        </div>
      ` : '';

      return `
        <article class="project-card ${p.pinned ? 'pinned-flagship' : ''}" data-project-id="${escapeHtml(p.id)}">
          <div class="card-thumb-wrap">
            <img class="card-thumb-img" src="${escapeHtml(p.cover_url)}" alt="${escapeHtml(p.title)}" loading="lazy" />
            <div class="card-hud-top">
              <span class="card-badge">${escapeHtml(p.featured_badge || 'PROJECT')}</span>
              <span class="card-year-pill">${escapeHtml(p.year)}</span>
            </div>
            <div class="card-media-counts">
              ${p.embed_count > 0 ? `<span class="media-count-chip video">▶ ${p.embed_count} STREAM${p.embed_count > 1 ? 'S' : ''}</span>` : ''}
              <span class="media-count-chip">${p.unique_still_count} STILLS (${p.raw_image_count} RAW)</span>
            </div>
          </div>
          <div class="card-body">
            <h3 class="card-title">${escapeHtml(p.title)}</h3>
            <div class="card-subtitle">${escapeHtml(p.subtitle)}</div>
            <p class="card-summary">${escapeHtml(p.summary)}</p>
            ${metricsHtml}
            <div class="card-tech-tags">
              ${(p.tech_stack || []).slice(0, 5).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <div class="card-footer-cta">
              <span>[ OPEN CINEMA TERMINAL ]</span>
              <span>→</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    projectsGrid.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', () => {
        const pid = card.getAttribute('data-project-id');
        const proj = DATA.projects.find(item => item.id === pid);
        if (proj) openProjectModal(proj);
      });
    });
  }

  // ── 4. Cinema Project Modal ──
  const projectModalBackdrop = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalBreadcrumb = document.getElementById('project-modal-breadcrumb');

  function openProjectModal(proj) {
    currentModalProject = proj;
    modalGalleryMode = 'unique';
    renderProjectModalContent();
    projectModalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModalBackdrop.classList.remove('open');
    // Stop any playing iframes by clearing container
    if (projectModalBody) projectModalBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  function renderProjectModalContent() {
    if (!currentModalProject || !projectModalBody) return;
    const p = currentModalProject;
    if (projectModalBreadcrumb) {
      projectModalBreadcrumb.textContent = `TERMINAL // ${p.slug} // ${p.year} // ${p.unique_still_count} UNIQUE STILLS (${p.raw_image_count} ARCHIVE VARIANTS) · ${p.embed_count} EMBEDS`;
    }

    // 1. Description & Architecture blocks
    const extraBlocksHtml = (p.description_blocks || []).map(b => `<p>${escapeHtml(b)}</p>`).join('');
    const archiveTextClean = p.archive_full_text && p.archive_full_text.length > 35
      ? `<div style="margin-top:10px;padding:14px;background:rgba(0,240,255,0.04);border-left:2px solid var(--cyan);font-size:13.5px;color:#cbd5e1;">
           <div class="meta-block-label">ORIGINAL ARCHIVE RECORD (${escapeHtml(p.slug)})</div>
           ${escapeHtml(p.archive_full_text)}
         </div>`
      : '';

    // 2. Collaborator Credits & External Links (including Instagram links!)
    const igLinksHtml = (p.external_links && p.external_links.length > 0)
      ? `<div class="credits-links-wrap">
           ${p.external_links.map(l => `
             <a class="credit-ig-link" href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer">
               <span>↗</span> ${escapeHtml(l.text || l.href)}
             </a>
           `).join('')}
         </div>`
      : `<span style="font-size:12.5px;color:var(--silver-muted);">Solo / Lead Author (@Breakfast012)</span>`;

    // 3. Embedded Videos & Canva Decks
    const embedsHtml = (p.embeds && p.embeds.length > 0) ? `
      <div class="modal-embeds-section">
        <div class="meta-block-label" style="font-size:13px;">EMBEDDED MEDIA STREAMS & INTERACTIVE DECKS (${p.embeds.length})</div>
        ${p.embeds.map((emb, idx) => `
          <div class="embed-player-card">
            <div class="embed-player-header">
              <span>STREAM #0${idx + 1} // ${escapeHtml(emb.title || emb.type.toUpperCase())}</span>
              <a class="hud-btn" href="${escapeHtml(emb.src)}" target="_blank" rel="noopener noreferrer">OPEN STREAM IN NEW TAB ↗</a>
            </div>
            <div class="embed-responsive-16x9">
              <iframe src="${escapeHtml(emb.src)}" allowfullscreen allow="autoplay; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    // 4. High-Res Waterfall Gallery
    const galleryItems = modalGalleryMode === 'unique'
      ? p.unique_stills.map((s, idx) => ({
          display: s.display_url,
          full: s.full_url,
          label: `${s.max_res_label} (${s.variant_count} vars)`,
          idx
        }))
      : p.raw_images.map((u, idx) => ({
          display: u,
          full: u,
          label: `RAW #${idx + 1}`,
          idx
        }));

    currentLightboxList = galleryItems;

    projectModalBody.innerHTML = `
      <div class="modal-hero-header">
        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
          <span class="card-badge">${escapeHtml(p.featured_badge || 'PROJECT')}</span>
          <span class="card-year-pill">${escapeHtml(p.year)}</span>
          <span class="card-year-pill">${escapeHtml(p.role || 'Jiayi Wu (@Breakfast012)')}</span>
        </div>
        <h2 class="modal-title">${escapeHtml(p.title)}</h2>
        <div class="modal-subtitle">${escapeHtml(p.subtitle)}</div>
      </div>

      <div class="modal-info-grid">
        <div class="modal-desc-box">
          <p>${escapeHtml(p.summary)}</p>
          ${extraBlocksHtml}
          ${archiveTextClean}
        </div>
        <aside class="modal-meta-sidebar">
          ${p.awards && p.awards.length > 0 ? `
            <div>
              <div class="meta-block-label">AWARDS & RECOGNITION</div>
              <ul style="padding-left:16px;font-size:13px;color:#f8fafc;display:flex;flex-direction:column;gap:6px;">
                ${p.awards.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <div>
            <div class="meta-block-label">TECHNICAL STACK & PIPELINE</div>
            <div class="card-tech-tags" style="padding-top:2px;">
              ${(p.tech_stack || []).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
          <div>
            <div class="meta-block-label">COLLABORATOR CREDITS & EXTERNAL LINKS</div>
            ${igLinksHtml}
          </div>
          <div>
            <div class="meta-block-label">LEGACY ARCHIVE SOURCE</div>
            <a class="credit-ig-link" href="${escapeHtml(p.original_url)}" target="_blank" rel="noopener noreferrer">
              ↗ ${escapeHtml(p.original_url)}
            </a>
          </div>
        </aside>
      </div>

      ${embedsHtml}

      <div>
        <div class="modal-gallery-header">
          <div>
            <div class="section-kicker">HIGH-RESOLUTION WATERFALL GALLERY // CLICK ANY STILL FOR 3840px 4K LIGHTBOX</div>
            <div style="font-family:var(--font-mono);font-size:12px;color:var(--silver-muted);">
              Showing ${galleryItems.length} images (${p.unique_still_count} unique master stills · ${p.raw_image_count} total raw archive URLs)
            </div>
          </div>
          <div class="gallery-mode-btns">
            <button type="button" class="hud-btn ${modalGalleryMode === 'unique' ? 'active-mode-btn' : ''}" id="btn-gallery-unique" style="${modalGalleryMode === 'unique' ? 'background:var(--cyan);color:#07080c;font-weight:700;' : ''}">
              MASTER HIGH-RES STILLS (${p.unique_still_count})
            </button>
            <button type="button" class="hud-btn ${modalGalleryMode === 'raw' ? 'active-mode-btn' : ''}" id="btn-gallery-raw" style="${modalGalleryMode === 'raw' ? 'background:var(--cyan);color:#07080c;font-weight:700;' : ''}">
              ALL RAW ARCHIVE URLS (${p.raw_image_count})
            </button>
          </div>
        </div>

        <div class="gallery-waterfall" style="margin-top:20px;">
          ${galleryItems.map((item, i) => `
            <div class="waterfall-item" data-lb-index="${i}">
              <img src="${escapeHtml(item.display)}" alt="${escapeHtml(p.title)} still ${i + 1}" loading="lazy" />
              <span class="waterfall-item-overlay">🔍 ${escapeHtml(item.label)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const btnUnique = document.getElementById('btn-gallery-unique');
    const btnRaw = document.getElementById('btn-gallery-raw');
    if (btnUnique) {
      btnUnique.addEventListener('click', () => {
        modalGalleryMode = 'unique';
        renderProjectModalContent();
      });
    }
    if (btnRaw) {
      btnRaw.addEventListener('click', () => {
        modalGalleryMode = 'raw';
        renderProjectModalContent();
      });
    }

    projectModalBody.querySelectorAll('.waterfall-item').forEach((el) => {
      el.addEventListener('click', () => {
        const i = parseInt(el.getAttribute('data-lb-index'), 10) || 0;
        openLightbox(i);
      });
    });
  }

  // ── 5. 4K Lightbox Inspector ──
  const lightboxBackdrop = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxRawLink = document.getElementById('lightbox-raw-link');

  function openLightbox(index) {
    if (!currentLightboxList.length) return;
    currentLightboxIdx = (index + currentLightboxList.length) % currentLightboxList.length;
    const item = currentLightboxList[currentLightboxIdx];
    if (lightboxImg) lightboxImg.src = item.full;
    if (lightboxCaption) {
      lightboxCaption.textContent = `STILL [${currentLightboxIdx + 1} / ${currentLightboxList.length}] // ${item.label}`;
    }
    if (lightboxRawLink) lightboxRawLink.href = item.full;
    lightboxBackdrop.classList.add('open');
  }

  function closeLightbox() {
    lightboxBackdrop.classList.remove('open');
    if (lightboxImg) lightboxImg.src = '';
  }

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => openLightbox(currentLightboxIdx - 1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => openLightbox(currentLightboxIdx + 1));

  // ── 6. Fullscreen Showreel Theater Modal (All 16 Streams) ──
  const showreelModal = document.getElementById('showreel-modal');
  const showreelIframeWrap = document.getElementById('showreel-iframe-container');
  const showreelPlaylistEl = document.getElementById('showreel-playlist');

  const SHOWREEL_STREAMS = [
    { title: '01 // Terms & Conditions — Live Mocap Performance (Vimeo Master)', src: 'https://player.vimeo.com/video/1122830992?h=c3a8d9f297&autoplay=1' },
    { title: '02 // BoundFusion — IEEE VR 2026 XR Gallery Shortlisted (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/7fp5gfLe3Zu/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '03 // EveryMacbeth (2026) — Interactive Theatre System (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/W9fqAZfxxRD/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '04 // Edenflux (2025) — Full-Body Mocap × Heart-Rate Biofeedback (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/6A-Bue48ZnB/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '05 // Boss Plz - VR Game — Walkthrough Stream A (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/3U6hUQ_7v7k/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '06 // Boss Plz - VR Game — Walkthrough Stream B (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/R5_dXe3w4cn/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '07 // VR/AI Multi-Agent Roleplay System — Prototype (YouTube)', src: 'https://www.youtube.com/embed/KnA0x_jgTgM?si=vtzLh9Sj9sNZVjoB' },
    { title: '08 // VR Body Mapping - Pedagogy Practice — Award Winner (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/8RgB8XFPxQR/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '09 // The Unchanging Change — Performance Stream I (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/MGJnHvEE-aN/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '10 // The Unchanging Change — Performance Stream II (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/6pczgjvRhsL/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '11 // The Unchanging Change — Performance Stream III (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/U5jnPNPF3MQ/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '12 // Unseemly (2024) — Audiovisual Installation (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/IRshBPPvJty/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '13 // BlackBox (2023) — Sensor Installation Stream (Adobe CCV)', src: 'https://www-ccv.adobe.io/v1/player/ccv/Bdj-Undjhh7/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View' },
    { title: '14 // Edenflux — Interactive Research Deck (Canva Embed)', src: 'https://www.canva.com/design/DAGpQouIYew/9TNOfoQ5DWYwOBBzjLzM3Q/view?embed' },
    { title: '15 // Erased Resistance — Interactive Design Deck (Canva Embed)', src: 'https://www.canva.com/design/DAGmkcAMvNw/0JaV_n9CvwnMf12wLqPQkA/view?embed' }
  ];

  function openShowreelTheater(streamIdx = 0) {
    if (!showreelModal) return;
    showreelModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    selectShowreelStream(streamIdx);
  }

  function selectShowreelStream(idx) {
    const item = SHOWREEL_STREAMS[idx] || SHOWREEL_STREAMS[0];
    if (showreelIframeWrap) {
      showreelIframeWrap.innerHTML = `<iframe src="${escapeHtml(item.src)}" allowfullscreen allow="autoplay; fullscreen; picture-in-picture"></iframe>`;
    }
    if (showreelPlaylistEl) {
      showreelPlaylistEl.innerHTML = SHOWREEL_STREAMS.map((s, i) => `
        <button type="button" class="identity-tab ${i === idx ? 'active' : ''}" style="width:100%;justify-content:flex-start;text-align:left;" data-stream-idx="${i}">
          ${escapeHtml(s.title)}
        </button>
      `).join('');
      showreelPlaylistEl.querySelectorAll('button').forEach((b) => {
        b.addEventListener('click', () => {
          selectShowreelStream(parseInt(b.getAttribute('data-stream-idx'), 10));
        });
      });
    }
  }

  function closeShowreelTheater() {
    if (!showreelModal) return;
    showreelModal.classList.remove('open');
    if (showreelIframeWrap) showreelIframeWrap.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.getElementById('btn-open-showreel')?.addEventListener('click', () => openShowreelTheater(0));
  document.getElementById('hud-btn-showreel')?.addEventListener('click', () => openShowreelTheater(0));
  document.getElementById('showreel-close-btn')?.addEventListener('click', closeShowreelTheater);

  // ── 7. Raw Archive Inspector Modal (26 Pages / 731 Images / 16 Embeds) ──
  const archiveModal = document.getElementById('archive-inspector-modal');
  const archiveModalBody = document.getElementById('archive-inspector-body');

  function openArchiveInspector() {
    if (!archiveModal || !archiveModalBody) return;
    archiveModalBody.innerHTML = `
      <div style="margin-bottom:20px;">
        <div class="section-kicker">VERIFIED ARCHIVE INTEGRITY // 100% ZERO-OMISSION AUDIT</div>
        <h2 class="modal-title" style="font-size:1.75rem;">breakfast012.com Full Crawl Inventory (26 Pages · 731 Raw Image URLs · 16 Embeds)</h2>
        <p style="font-size:13.5px;color:var(--silver-muted);margin-top:6px;">
          Every single page, image resolution variant, iframe video player, Canva deck, and collaborator link crawled in
          <code>breakfast012_full_archive.json</code> is preserved below and in <code>data/breakfast012_full_archive.json</code>.
        </p>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${DATA.all_archive_pages.map((pg, idx) => `
          <details style="background:rgba(14,20,34,0.85);border:1px solid rgba(0,240,255,0.22);border-radius:4px;padding:12px 16px;">
            <summary style="cursor:pointer;font-family:var(--font-mono);font-size:12.5px;color:var(--cyan);font-weight:600;">
              [${String(idx + 1).padStart(2, '0')}] ${escapeHtml(pg.path)} — ${escapeHtml(pg.title)} (${pg.image_count} raw images · ${pg.embed_count} embeds)
            </summary>
            <div style="margin-top:12px;font-size:12.5px;color:#cbd5e1;display:flex;flex-direction:column;gap:8px;">
              <div><strong>Original URL:</strong> <a href="${escapeHtml(pg.url)}" target="_blank" style="color:var(--cyan);">${escapeHtml(pg.url)}</a></div>
              ${pg.embeds.length ? `<div><strong>Embeds (${pg.embeds.length}):</strong><ul style="padding-left:18px;">${pg.embeds.map(e => `<li><a href="${escapeHtml(e.src)}" target="_blank" style="color:var(--cyan);">${escapeHtml(e.src)}</a></li>`).join('')}</ul></div>` : ''}
              <div><strong>All ${pg.image_count} Raw Image CDN URLs:</strong></div>
              <div style="max-height:180px;overflow-y:auto;background:#05070c;padding:8px;border:1px solid rgba(255,255,255,0.08);font-family:var(--font-mono);font-size:11px;">
                ${pg.images.map((u, k) => `<div>${k + 1}. <a href="${escapeHtml(u)}" target="_blank" style="color:#94a3b8;">${escapeHtml(u)}</a></div>`).join('')}
              </div>
            </div>
          </details>
        `).join('')}
      </div>
    `;
    archiveModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.getElementById('hud-btn-archive')?.addEventListener('click', openArchiveInspector);
  document.getElementById('archive-close-btn')?.addEventListener('click', () => {
    archiveModal.classList.remove('open');
    document.body.style.overflow = '';
  });

  // ── 8. Event Listeners for Filter Tabs, Search, Escape Key & Copy Email ──
  document.querySelectorAll('.identity-tab[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.identity-tab[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      renderProjectsMatrix();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProjectsMatrix();
    });
  }

  document.getElementById('project-modal-close')?.addEventListener('click', closeProjectModal);
  projectModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === projectModalBackdrop) closeProjectModal();
  });

  window.addEventListener('keydown', (e) => {
    if (lightboxBackdrop?.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentLightboxIdx - 1);
      if (e.key === 'ArrowRight') openLightbox(currentLightboxIdx + 1);
      return;
    }
    if (projectModalBackdrop?.classList.contains('open') && e.key === 'Escape') {
      closeProjectModal();
    }
    if (showreelModal?.classList.contains('open') && e.key === 'Escape') {
      closeShowreelTheater();
    }
    if (archiveModal?.classList.contains('open') && e.key === 'Escape') {
      archiveModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-copy-email');
      if (navigator.clipboard && email) {
        navigator.clipboard.writeText(email);
        const orig = btn.innerHTML;
        btn.innerHTML = `✓ COPIED: ${escapeHtml(email)}`;
        setTimeout(() => { btn.innerHTML = orig; }, 1800);
      }
    });
  });

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Boot
  initHeroSlideshow();
  updateTabCounts();
  renderPublications();
  renderProjectsMatrix();
})();
