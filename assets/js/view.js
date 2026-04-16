/**
 * VIEW — La Tabernita
 * Responsable de renderizar el HTML a partir de los datos del modelo.
 * No contiene lógica de negocio.
 */

const TabernitaView = (() => {

  // --- MATCH CARD TEMPLATE ---
  const renderMatchCard = (match) => {
    const liveTag = match.isLive
      ? `<div class="mb-1"><span class="match-live">● En Vivo</span></div>`
      : '';

    const featuredClass = match.isFeatured ? 'border-danger border-opacity-50' : '';

    return `
      <div class="col-12 col-md-6 reveal">
        <div class="match-card ${featuredClass}" role="article" aria-label="Partido: ${match.homeTeam} vs ${match.awayTeam}">
          <div class="match-teams">
            ${liveTag}
            <strong>${match.homeTeam}</strong>
            <div class="match-vs">vs</div>
            <strong>${match.awayTeam}</strong>
          </div>
          <div class="match-info">
            <div class="match-league">${match.league}</div>
            <div class="match-time">${match.time}</div>
            <div class="match-channel">
              <i class="bi bi-tv me-1"></i>${match.channel}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // --- EVENT CARD TEMPLATE ---
  const renderEventCard = (event) => {
    return `
      <div class="col-12 col-md-6 col-lg-4 reveal">
        <article class="event-card" aria-label="Evento: ${event.title}">
          <div class="event-date" aria-hidden="true">
            <div class="month">${event.month}</div>
            <div class="day">${event.day}</div>
          </div>
          <div class="event-body">
            <div class="event-category ${event.category}">${event.categoryLabel}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-desc">${event.description}</div>
            <div class="event-time"><i class="bi bi-clock me-1"></i>${event.time}</div>
          </div>
        </article>
      </div>
    `;
  };

  // --- RENDER MATCHES ---
  const renderMatches = (matches, container) => {
    if (!container) return;
    container.innerHTML = matches.map(renderMatchCard).join('');
  };

  // --- RENDER EVENTS ---
  const renderEvents = (events, container) => {
    if (!container) return;
    container.innerHTML = events.map(renderEventCard).join('');
  };

  // --- SHOW FORM SUCCESS ---
  const showFormSuccess = (form, successEl) => {
    form.reset();
    form.classList.remove('was-validated');
    successEl.classList.remove('d-none');
    setTimeout(() => successEl.classList.add('d-none'), 5000);
  };

  // --- UPDATE YEAR IN FOOTER ---
  const updateYear = (el) => {
    if (el) el.textContent = new Date().getFullYear();
  };

  return {
    renderMatches,
    renderEvents,
    showFormSuccess,
    updateYear
  };

})();
