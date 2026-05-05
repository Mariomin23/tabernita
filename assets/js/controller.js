/**
 * CONTROLLER — La Tabernita
 * Coordina la interacción entre el modelo y la vista.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const matchesContainer = document.getElementById('matchesContainer');
  const calendarContainer = document.getElementById('calendarContainer');
  const currentYearEl = document.getElementById('currentYear');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const mainNav = document.getElementById('mainNav');

  // 1. Inicializar Vista (Año)
  if (typeof TabernitaView !== 'undefined') {
    TabernitaView.updateYear(currentYearEl);
  }

  // 2. Cargar Partidos desde Google Sheets
  if (typeof TabernitaModel !== 'undefined' && typeof TabernitaView !== 'undefined') {
    try {
      // Mostrar spinner mientras cargan los datos
      if (matchesContainer) {
        matchesContainer.innerHTML = `
          <div class="col-12 text-center py-4">
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Cargando partidos...</span>
            </div>
            <p class="mt-2 text-muted small">Cargando partidos...</p>
          </div>`;
      }

      const matches = await TabernitaModel.fetchMatchesFromSheet();

      if (matches.length === 0) {
        if (matchesContainer) {
          matchesContainer.innerHTML = `
            <div class="col-12 text-center py-4">
              <p class="text-muted"><i class="bi bi-calendar-x me-2"></i>No hay partidos programados en este momento.</p>
            </div>`;
        }
      } else {
        TabernitaView.renderMatches(matches, matchesContainer);
        observeReveals();
      }
    } catch (error) {
      console.error("❌ Error al cargar los partidos:", error.message);
      if (matchesContainer) {
        matchesContainer.innerHTML = `
          <div class="col-12 text-center py-4">
            <p class="text-danger small"><i class="bi bi-exclamation-triangle me-2"></i>${error.message}</p>
          </div>`;
      }
    }
  }

  // 3. Cargar Eventos
  if (typeof TabernitaModel !== 'undefined' && typeof TabernitaView !== 'undefined') {
    const events = TabernitaModel.getAllEvents();
    TabernitaView.renderEvents(events, calendarContainer);
    observeReveals();
  }

  // 4. Scroll Effects: Navbar Background
  window.addEventListener('scroll', () => {
    if (mainNav) {
      if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }
  });

  // 5. Scroll Effects: Reveal Animations (Intersection Observer)
  function observeReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  }
  
  observeReveals();

  // 6. Contact Form Handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      // Simulación de envío exitoso
      if (typeof TabernitaView !== 'undefined') {
        TabernitaView.showFormSuccess(contactForm, formSuccess);
      }
    });
  }
});
