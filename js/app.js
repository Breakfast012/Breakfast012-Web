/**
 * SWISS ARCHIVAL PROTOCOL // Main Controller
 * Drives Category Filtering (ALL / WORK / RESEARCH / COLLABORATION),
 * View Mode Switching (ALL VIEWS / INDEX / STREAM),
 * Edgar Rodriguez-style Index Table + Hover Preview,
 * Masiliang-style Split-Column Protocol Stream, Info Drawer, and Lightbox.
 */
(function () {
  const DATA = window.CONSOLE_DATA;
  if (!DATA || !Array.isArray(DATA.projects)) {
    console.error('CONSOLE_DATA not loaded.');
    return;
  }

  let activeFilter = 'all';
  let activeViewMode = 'both'; // 'both' | 'index' | 'stream'
  let searchQuery = '';
  let indexCollapsed = false;
  const rawModeByProject = {};

  // Lightbox state
  let lightboxItems = [];
  let lightboxIndex = 0;

  // DOM Elements
  const indexSection = document.getElementById('index-section');
  const streamSection = document.getElementById('stream-section');
  const indexStatusLine = document.getElementById('index-status-line');
  const indexTableWrap = document.getElementById('swiss-table-wrap');
  const indexTbody = document.getElementById('swiss-index-tbody');
  const streamContainer = document.getElementById('protocol-stream-container');
  const searchInput = document.getElementById('archive-search');
  const btnCollapseIndex = document.getElementById('btn-collapse-index');

  const infoDrawer = document.getElementById('info-drawer');
  const btnToggleInfo = document.getElementById('btn-toggle-info');
  const btnCloseInfo = document.getElementById('btn-close-info');

  const hoverPreview = document.getElementById('index-hover-preview');
  const hoverImg = document.getElementById('index-hover-img');
  const hoverCaption = document.getElementById('index-hover-caption');

  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxRaw = document.getElementById('lightbox-raw');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxClose = document.getElementById('lightbox-close');

  const SECTION_LABELS = {
    work: 'WORK',
    research: 'RESEARCH PROJECT',
    collaboration: 'BUSINESS COLLABORATION'
  };

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getFilteredProjects() {
    return DATA.projects.filter((p) => {
      const matchCat =
        activeFilter === 'all' ||
        p.section === activeFilter ||
        (Array.isArray(p.categories) && p.categories.includes(activeFilter));
      if (!matchCat) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const hay = [
        p.title,
        p.year,
        p.section_label,
        p.original_text,
        ...(p.credits_lines || []),
        ...(p.external_links || []).map((l) => l.text)
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }

  // ── 1. Render Swiss Index Table ──
  function renderIndexTable(list) {
    if (!indexTbody) return;

    if (indexStatusLine) {
      const filterTitle = activeFilter === 'all' ? 'ALL SECTIONS' : (SECTION_LABELS[activeFilter] || activeFilter.toUpperCase());
      indexStatusLine.textContent = `INDEX OF WORKS // SHOWING ${list.length} OF ${DATA.projects.length} ARCHIVED PROJECTS [${filterTitle}]`;
    }

    indexTbody.innerHTML = list
      .map((p, idx) => {
        const noStr = String(idx + 1).padStart(2, '0');
        const mediaParts = [];
        if (p.embed_count > 0) {
          mediaParts.push(`${p.embed_count} VIDEO/EMBED${p.embed_count > 1 ? 'S' : ''}`);
        }
        if (p.unique_still_count > 0) {
          mediaParts.push(`${p.unique_still_count} STILL${p.unique_still_count > 1 ? 'S' : ''}`);
        }
        const mediaSummary = mediaParts.join(' · ') || 'ARCHIVE RECORD';
        const noteLine = p.short_note || '—';
        const previewCover =
          (p.unique_stills &&
            p.unique_stills[0] &&
            (p.unique_stills[0].display_url || p.unique_stills[0].full_url)) ||
          p.cover_url;

        return `
          <tr data-project-id="${escapeHtml(p.id)}" data-cover="${escapeHtml(previewCover)}" data-caption="${escapeHtml(noStr + ' // ' + p.title + ' (' + p.year + ')')}">
            <td class="col-no mono-cell">${noStr}</td>
            <td class="col-year mono-cell">${escapeHtml(p.year)}</td>
            <td class="col-title">${escapeHtml(p.title)}</td>
            <td class="col-cat mono-cell">${escapeHtml(p.section_label)}</td>
            <td class="col-medium mono-cell">${escapeHtml(mediaSummary)}</td>
            <td class="col-venue">${escapeHtml(noteLine)}</td>
          </tr>
        `;
      })
      .join('');

    indexTbody.querySelectorAll('tr').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const cover = row.getAttribute('data-cover');
        const cap = row.getAttribute('data-caption');
        if (cover && hoverPreview && hoverImg && hoverCaption) {
          hoverImg.removeAttribute('width');
          hoverImg.removeAttribute('height');
          if (hoverImg.getAttribute('src') !== cover) {
            hoverImg.src = cover;
          }
          hoverCaption.textContent = cap || '';
          hoverPreview.classList.add('visible');
        }
      });

      row.addEventListener('mouseleave', () => {
        if (hoverPreview) hoverPreview.classList.remove('visible');
      });

      row.addEventListener('click', () => {
        if (hoverPreview) hoverPreview.classList.remove('visible');
        const pid = row.getAttribute('data-project-id');
        if (activeViewMode === 'index') {
          setViewMode('both');
        }
        const target = document.getElementById('project-' + pid);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── 2. Render Split-Column Protocol Stream ──
  function renderStream(list) {
    if (!streamContainer) return;

    streamContainer.innerHTML = list
      .map((p, idx) => {
        const noStr = String(idx + 1).padStart(2, '0');
        const isRawMode = Boolean(rawModeByProject[p.id]);

        const descriptionHtml = p.original_text
          ? `<div class="meta-description">${escapeHtml(p.original_text)}</div>`
          : '';

        const creditsHtml =
          p.credits_lines && p.credits_lines.length > 0
            ? `<div class="meta-credits-list">${p.credits_lines.map((line) => `<div>${escapeHtml(line)}</div>`).join('')}</div>`
            : '';

        const extLinks = (p.external_links || []).filter(
          (l) => l.href && !l.href.includes('portfolio.adobe.com')
        );
        const linksHtml = `
          <div class="meta-links-row">
            <a class="meta-link-pill" href="${escapeHtml(p.original_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.slug)} ↗</a>
            ${extLinks
              .map(
                (l) =>
                  `<a class="meta-link-pill" href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.text || l.href)} ↗</a>`
              )
              .join('')}
          </div>
        `;

        // Embeds (Vimeo, Adobe CCV, YouTube, Canva) -> Silent Archival Cover + In-place Play
        const primaryStillUrl =
          (p.unique_stills &&
            p.unique_stills[0] &&
            (p.unique_stills[0].full_url || p.unique_stills[0].display_url)) ||
          p.cover_url;

        const embedsHtml =
          p.embeds && p.embeds.length > 0
            ? `<div class="stream-embeds-stack">
                ${p.embeds
                  .map((emb, eIdx) => {
                    const embNo = String(eIdx + 1).padStart(2, '0');
                    const coverStillUrl =
                      (p.unique_stills &&
                        p.unique_stills[eIdx] &&
                        (p.unique_stills[eIdx].full_url || p.unique_stills[eIdx].display_url)) ||
                      primaryStillUrl;
                    return `
                  <div
                    class="embed-frame-block"
                    data-embed-src="${escapeHtml(emb.src)}"
                    data-embed-title="${escapeHtml(p.title + ' Stream ' + (eIdx + 1))}"
                  >
                    <div class="embed-stage">
                      <button
                        type="button"
                        class="embed-silent-cover"
                        aria-label="Play ${escapeHtml(p.title)} video record ${embNo}"
                      >
                        <img
                          class="embed-cover-img"
                          src="${escapeHtml(coverStillUrl)}"
                          alt="${escapeHtml(p.title + ' — Video Record ' + embNo)}"
                          loading="lazy"
                        />
                        <span class="embed-play-badge">[ ▶ PLAY VIDEO RECORD // ${embNo} ]</span>
                      </button>
                    </div>
                    <div class="embed-frame-caption">
                      <span>// VIDEO.${embNo} — ${escapeHtml(emb.label || emb.type.toUpperCase())}</span>
                      <a href="${escapeHtml(emb.src)}" target="_blank" rel="noopener noreferrer">[ OPEN STREAM ↗ ]</a>
                    </div>
                  </div>
                `;
                  })
                  .join('')}
              </div>`
            : '';

        // Still Figures
        const figuresToRender = isRawMode
          ? (p.raw_images || []).map((u, i) => ({
              full_url: u,
              display_url: u,
              label: `RAW.${String(i + 1).padStart(2, '0')}`
            }))
          : (p.unique_stills || []).map((s, i) => ({
              full_url: s.full_url,
              display_url: s.display_url,
              label: `FIG.${String(i + 1).padStart(2, '0')} (${s.res_label || 'HD'})`
            }));

        const hasMultipleVariants =
          (p.raw_images || []).length > (p.unique_stills || []).length;

        const figuresToolbarHtml =
          figuresToRender.length > 0
            ? `<div class="stream-figures-toolbar">
                <span>DOCUMENTATION FIGURES // ${p.unique_still_count} UNIQUE STILL${p.unique_still_count > 1 ? 'S' : ''} (${p.raw_image_count} TOTAL ARCHIVE URLS)</span>
                ${
                  hasMultipleVariants
                    ? `<button type="button" class="text-action-btn btn-toggle-raw" data-project-id="${escapeHtml(p.id)}">
                        ${isRawMode ? `[ SHOW ${p.unique_still_count} UNIQUE STILLS ]` : `[ SHOW ALL ${p.raw_image_count} RAW URL VARIANTS ]`}
                      </button>`
                    : ''
                }
              </div>`
            : '';

        const gridSingleClass = figuresToRender.length === 1 ? 'single-figure' : '';

        const figuresGridHtml =
          figuresToRender.length > 0
            ? `<div class="stream-figures-grid ${gridSingleClass}">
                ${figuresToRender
                  .map(
                    (fig, fIdx) => `
                  <figure class="figure-card" data-project-id="${escapeHtml(p.id)}" data-fig-idx="${fIdx}">
                    <div class="figure-img-wrap">
                      <img src="${escapeHtml(fig.display_url)}" alt="${escapeHtml(p.title + ' ' + fig.label)}" loading="lazy" />
                    </div>
                    <figcaption class="figure-caption">
                      <span>${escapeHtml(fig.label)}</span>
                      <span>[ ENLARGE + ]</span>
                    </figcaption>
                  </figure>
                `
                  )
                  .join('')}
              </div>`
            : '';

        return `
          <article class="protocol-item" id="project-${escapeHtml(p.id)}">
            <div class="protocol-left">
              <div class="protocol-sticky-meta">
                <div class="meta-ref-no">NO. ${noStr} // ${escapeHtml(p.section_label)}</div>
                <h2 class="meta-title">${escapeHtml(p.title)}</h2>
                <div class="meta-year">${escapeHtml(p.year)}</div>
                ${descriptionHtml}
                ${creditsHtml}
                ${linksHtml}
              </div>
            </div>
            <div class="protocol-right">
              ${embedsHtml}
              ${figuresToolbarHtml}
              ${figuresGridHtml}
            </div>
          </article>
        `;
      })
      .join('');

    // Bind Silent Archival Video Covers -> Seamless In-place Iframe Replacement
    streamContainer.querySelectorAll('.embed-silent-cover').forEach((btn) => {
      btn.addEventListener('click', () => {
        const block = btn.closest('.embed-frame-block');
        const stage = btn.closest('.embed-stage');
        if (!block || !stage) return;
        const rawSrc = block.getAttribute('data-embed-src') || '';
        const title = block.getAttribute('data-embed-title') || 'Embedded Stream';
        if (!rawSrc) return;

        let playSrc = rawSrc;
        if (!rawSrc.includes('canva.com') && !rawSrc.includes('autoplay=')) {
          playSrc = rawSrc + (rawSrc.includes('?') ? '&' : '?') + 'autoplay=1';
        }

        block.classList.add('is-playing');
        stage.innerHTML = `
          <div class="embed-aspect-16x9">
            <iframe
              src="${escapeHtml(playSrc)}"
              title="${escapeHtml(title)}"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        `;
      });
    });

    // Bind Raw Variant toggles
    streamContainer.querySelectorAll('.btn-toggle-raw').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-project-id');
        rawModeByProject[pid] = !rawModeByProject[pid];
        renderAll();
      });
    });

    // Bind Figure Lightbox clicks
    streamContainer.querySelectorAll('.figure-card').forEach((card) => {
      card.addEventListener('click', () => {
        const pid = card.getAttribute('data-project-id');
        const fIdx = parseInt(card.getAttribute('data-fig-idx') || '0', 10);
        const proj = DATA.projects.find((item) => item.id === pid);
        if (!proj) return;
        const isRaw = Boolean(rawModeByProject[pid]);
        const listForLightbox = isRaw
          ? (proj.raw_images || []).map((u, i) => ({
              url: u,
              meta: `${proj.title} (${proj.year}) // RAW.${String(i + 1).padStart(2, '0')} OF ${proj.raw_images.length}`
            }))
          : (proj.unique_stills || []).map((s, i) => ({
              url: s.full_url,
              meta: `${proj.title} (${proj.year}) // FIG.${String(i + 1).padStart(2, '0')} OF ${proj.unique_stills.length}`
            }));
        openLightbox(listForLightbox, fIdx);
      });
    });
  }

  function renderAll() {
    const filtered = getFilteredProjects();
    renderIndexTable(filtered);
    renderStream(filtered);
  }

  // ── 3. View Mode & Filter Controls ──
  function setViewMode(mode) {
    activeViewMode = mode;
    document.querySelectorAll('[data-view-mode]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-view-mode') === mode);
    });
    if (indexSection) {
      indexSection.style.display = mode === 'stream' ? 'none' : 'block';
    }
    if (streamSection) {
      streamSection.style.display = mode === 'index' ? 'none' : 'block';
    }
  }

  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.getAttribute('data-filter') || 'all';
      document.querySelectorAll('[data-filter]').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      renderAll();
    });
  });

  document.querySelectorAll('[data-view-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setViewMode(btn.getAttribute('data-view-mode') || 'both');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target.value || '').trim();
      renderAll();
    });
  }

  if (btnCollapseIndex && indexTableWrap) {
    btnCollapseIndex.addEventListener('click', () => {
      indexCollapsed = !indexCollapsed;
      indexTableWrap.classList.toggle('collapsed', indexCollapsed);
      btnCollapseIndex.textContent = indexCollapsed ? '[ SHOW INDEX ↓ ]' : '[ HIDE INDEX ↑ ]';
    });
  }

  // ── 4. Info Drawer & Copy Email ──
  function toggleInfoDrawer(forceOpen) {
    if (!infoDrawer || !btnToggleInfo) return;
    const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !infoDrawer.classList.contains('open');
    infoDrawer.classList.toggle('open', isOpen);
    infoDrawer.setAttribute('aria-hidden', String(!isOpen));
    btnToggleInfo.classList.toggle('active', isOpen);
    btnToggleInfo.setAttribute('aria-expanded', String(isOpen));
  }

  if (btnToggleInfo) {
    btnToggleInfo.addEventListener('click', () => toggleInfoDrawer());
  }
  if (btnCloseInfo) {
    btnCloseInfo.addEventListener('click', () => toggleInfoDrawer(false));
  }

  document.querySelectorAll('.copy-inline-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      if (val && navigator.clipboard) {
        navigator.clipboard.writeText(val).then(() => {
          const orig = btn.textContent;
          btn.textContent = '[COPIED]';
          setTimeout(() => {
            btn.textContent = orig;
          }, 1500);
        });
      }
    });
  });

  // ── 5. Lightbox Controller ──
  function openLightbox(items, idx) {
    if (!items || !items.length || !lightboxOverlay) return;
    lightboxItems = items;
    lightboxIndex = Math.max(0, Math.min(idx, items.length - 1));
    updateLightboxSlide();
    lightboxOverlay.classList.add('open');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('open');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  function updateLightboxSlide() {
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    if (lightboxImg) lightboxImg.src = item.url;
    if (lightboxMeta) lightboxMeta.textContent = item.meta;
    if (lightboxRaw) lightboxRaw.href = item.url;
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      if (!lightboxItems.length) return;
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      updateLightboxSlide();
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      if (!lightboxItems.length) return;
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      updateLightboxSlide();
    });
  }
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay || e.target.id === 'lightbox-stage') {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!lightboxOverlay || !lightboxOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  // Initial render
  renderAll();
})();
