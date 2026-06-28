import './styles.css';
import { weddingConfig as config } from './config.js';

document.title = config.siteTitle;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute('content', `Invitación digital de boda para ${config.names.display}.`);

document.documentElement.style.setProperty(
  '--opening-floral-left',
  `url("${config.images.floralCorner}")`,
);
document.documentElement.style.setProperty(
  '--opening-floral-right',
  `url("${config.images.floralCorner}")`,
);

const app = document.querySelector('#app');
const audio = document.querySelector('#wedding-audio');
const openingScreen = document.querySelector('#opening-screen');
const openingKicker = document.querySelector('#opening-kicker');
const openingTitle = document.querySelector('#opening-title');
const openingDate = document.querySelector('#opening-date');
const openingMessage = document.querySelector('#opening-message');
const openButton = document.querySelector('#open-invitation');
const openingEnvelopeButton = document.querySelector('#opening-envelope-button');
const openingEnvelopeImage = document.querySelector('.opening-envelope-img');
const musicButton = document.querySelector('#music-toggle');
const cornerFlowerUrl = new URL(config.images.floralCorner, window.location.href).href;

if (audio) {
  audio.src = config.music.src;
}

if (openingKicker) {
  openingKicker.textContent = config.intro.openingKicker;
}

if (openingTitle) {
  openingTitle.innerHTML = `
    <span class="opening-title__name">${config.names.bride}</span>
    <span class="opening-title__ampersand">&amp;</span>
    <span class="opening-title__name">${config.names.groom}</span>
  `;
}

if (openingDate) {
  openingDate.textContent = `${config.religiousEvent.fullLabel} · ${config.religiousEvent.time}`;
}

if (openingMessage) {
  openingMessage.textContent = config.intro.openingMessage || config.intro.invitationText;
}

if (openingEnvelopeImage) {
  openingEnvelopeImage.src = config.images.envelope;
}

if (openButton) {
  openButton.innerHTML = '<span>Abrir invitación</span><i aria-hidden="true">&rsaquo;</i>';
}

const hasWhatsappNumber = Boolean(config.contact.whatsappNumber);

const createWhatsappUrl = (message) =>
  hasWhatsappNumber
    ? `https://wa.me/${config.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
    : '#';

const createFloralCorners = () => `
  <div class="floral-frame" aria-hidden="true" style="--corner-flower-image:url('${cornerFlowerUrl}')">
    <span class="corner-flower flor-top-left"></span>
    <span class="corner-flower flor-top-right"></span>
    <span class="corner-flower flor-bottom-left"></span>
    <span class="corner-flower flor-bottom-right"></span>
  </div>
`;

const createDivider = () => `
  <div class="ornamental-divider reveal">
    <span class="ornamental-divider__line"></span>
    <img class="ornamental-divider__center" src="${config.images.floralCenter}" alt="" aria-hidden="true" />
    <span class="ornamental-divider__line"></span>
  </div>
`;

const createSectionTitle = (eyebrow, title, subtitle = '') => `
  <div class="section-heading reveal">
    <span class="card-eyebrow">${eyebrow}</span>
    <h2 class="card-title">${title}</h2>
    ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
  </div>
`;

const createSectionCard = ({ className = '', eyebrow, title, subtitle = '', body }) => `
  <section class="section-card ${className}">
    ${createFloralCorners()}
    <div class="section-card__inner">
      ${createSectionTitle(eyebrow, title, subtitle)}
      ${createDivider()}
      ${body}
    </div>
  </section>
`;

const mapIcons = {
  apple: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.2 3.2c-.8.1-1.8.7-2.3 1.3-.5.6-.9 1.5-.7 2.3.9.1 1.8-.4 2.4-1 .6-.7.9-1.5.6-2.6ZM18.6 17.6c-.4.9-.9 1.7-1.4 2.4-.7 1-1.8 2.2-3.1 2.2-1.1 0-1.4-.7-2.9-.7-1.4 0-1.8.7-3 .7-1.2 0-2.2-1.1-3-2.1-1.7-2.3-3-6.4-1.2-9.5.9-1.5 2.4-2.4 4.1-2.4 1.3 0 2.5.8 3 .8.6 0 1.9-1 3.5-.9.6 0 2.3.2 3.4 1.8-2.9 1.6-2.4 5.7.6 6.9Z"/>
    </svg>
  `,
  google: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M12 2.4a6.7 6.7 0 0 0-6.7 6.7c0 4.7 6.1 11.6 6.4 11.9a.4.4 0 0 0 .6 0c.3-.3 6.4-7.2 6.4-11.9A6.7 6.7 0 0 0 12 2.4Z"/>
      <path fill="#EA4335" d="M12 2.4a6.7 6.7 0 0 1 6.7 6.7c0 4.7-6.1 11.6-6.4 11.9a.4.4 0 0 1-.3.2Z"/>
      <path fill="#34A853" d="M7.3 14.4 12 21.2a.4.4 0 0 0 .3-.2l4.4-6.4c-1.1 1.1-2.8 1.8-4.7 1.8-1.9 0-3.6-.7-4.7-2Z"/>
      <circle cx="12" cy="9.1" r="2.7" fill="#FBBC04"/>
      <circle cx="12" cy="9.1" r="1.35" fill="#fff"/>
    </svg>
  `,
};

const createEventActions = (event) => {
  if (Array.isArray(event.mapLinks) && event.mapLinks.length) {
    const orderedLinks = [...event.mapLinks].sort((a, b) => {
      const order = { google: 0, apple: 1 };
      return (order[a.type] ?? 99) - (order[b.type] ?? 99);
    });

    return `
      <div class="event-card__actions event-card__actions--multi">
        <span class="event-card__actions-title">¿Cómo llegar?</span>
        ${orderedLinks
          .map(
            (link) => `
              <a class="map-chip map-chip--${link.type}" href="${link.url}" target="_blank" rel="noreferrer" aria-label="${link.label}">
                <span class="map-chip__icon">${mapIcons[link.type] || ''}</span>
                <span class="map-chip__label">${link.label}</span>
              </a>
            `,
          )
          .join('')}
      </div>
    `;
  }

  return `
    <div class="event-card__actions">
      <a class="secondary-button" href="${event.mapsUrl}" target="_blank" rel="noreferrer">
        Ver ubicación
      </a>
    </div>
  `;
};

const createEventCard = (event, modifier = '') => `
  <article class="event-card ${modifier} reveal">
    <div class="event-card__media">
      <img src="${event.image}" alt="${event.title}" data-fallback="${config.images.couple}" />
    </div>
    <div class="event-card__body">
      <span class="event-card__eyebrow">${event.title}</span>
      <h3 class="event-card__title">${event.place}</h3>
      <p class="event-card__meta">${event.date}</p>
      <p class="event-card__detail">${event.time}</p>
      ${event.address ? `<p class="event-card__location">${event.address}</p>` : ''}
      ${createEventActions(event)}
    </div>
  </article>
`;

const createPrimaryDateAccent = () => `
  <div class="primary-date-accent reveal">
    <span class="primary-date-accent__label">Fecha central</span>
    <strong class="primary-date-accent__value">${config.religiousEvent.fullLabel}</strong>
    <small class="primary-date-accent__time">${config.religiousEvent.time}</small>
  </div>
`;

const familyNames = (items) => `
  <div class="family-names">
    ${items.map((item) => `<span class="family-name">${item}</span>`).join('')}
  </div>
`;

const timelineIcons = [
  `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 20.5V10.5L12 6l5.5 4.5v10" />
      <path d="M9.5 20.5v-4.5h5v4.5" />
      <path d="M12 3.5v4" />
      <path d="M10.25 5.5h3.5" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v3.5a4 4 0 0 0 8 0V4.5" />
      <path d="M11 12v4.5" />
      <path d="M8.5 20.5h5" />
      <path d="M17.5 6.5v4a2.5 2.5 0 0 1-2.5 2.5h-1.5" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.5v7" />
      <path d="M5 3.5v4.25" />
      <path d="M9 3.5v4.25" />
      <path d="M7 10.5v10" />
      <path d="M15.5 3.5v17" />
      <path d="M15.5 3.5c1.9 0 3 1.7 3 3.75S17.4 11 15.5 11" />
    </svg>
  `,
  `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18.5V8.25l8-1.75v10.25" />
      <path d="M9 10.25l8-1.75" />
      <circle cx="7.5" cy="18.5" r="2" />
      <circle cx="15.5" cy="16.75" r="2" />
    </svg>
  `,
];

const createTimelineIcon = (index) => timelineIcons[index] || timelineIcons[0];

const createMediaItems = (items, { showCaption = true } = {}) =>
  items
    .map(
      (image, index) => `
        <figure class="gallery-item ${image.className || ''} reveal" style="--delay:${index * 0.06}s">
          <div class="gallery-item__image-shell">
            <img src="${image.src}" alt="${image.title}" data-fallback="${config.images.venue}" />
          </div>
          ${showCaption ? `<figcaption class="gallery-item__caption">${image.title}</figcaption>` : ''}
        </figure>
      `,
    )
    .join('');

const galleryItems = createMediaItems(config.gallery, { showCaption: false });
const invitedGroupItems = createMediaItems(config.invitedGroups || []);

const timelineItems = config.mainSchedule
  .map(
    (item, index) => `
      <article class="timeline-item timeline-item--${index % 2 === 0 ? 'left' : 'right'} reveal" style="--delay:${index * 0.08}s">
        <div class="timeline-item__axis" aria-hidden="true">
          <div class="timeline-item__marker">
            ${createTimelineIcon(index)}
          </div>
        </div>
        <div class="timeline-item__content">
          <span class="timeline-item__time">${item.time}</span>
          <h3 class="timeline-item__title">${item.title}</h3>
          <p class="timeline-item__text">${item.text}</p>
        </div>
      </article>
    `,
  )
  .join('');

const rsvpBody = hasWhatsappNumber
  ? `
      <div class="rsvp-card reveal">
        <p>${config.rsvp.note}</p>
        <div class="rsvp-actions">
          <a class="primary-button" href="${createWhatsappUrl(config.contact.confirmText)}" target="_blank" rel="noreferrer">
            Confirmar asistencia
          </a>
          <a class="secondary-button" href="${createWhatsappUrl(config.contact.songText)}" target="_blank" rel="noreferrer">
            Sugerir canción
          </a>
        </div>
      </div>
    `
  : `
      <div class="rsvp-card reveal">
        <p>${config.rsvp.note}</p>
        <div class="status-note">
          <strong>Contacto pendiente</strong>
          <span>${config.rsvp.helper}</span>
        </div>
      </div>
    `;

app.innerHTML = `
  <div class="page-backdrop"></div>

  <section class="cover-hero" id="inicio" style="--cover-image:url('${config.images.cover}')">
    <div class="cover-background-media" aria-hidden="true">
      <img src="${config.images.cover}" alt="" />
    </div>
    <div class="cover-overlay"></div>

    <div class="cover-content">
      <p class="cover-eyebrow">${config.intro.coverEyebrow}</p>
      <h1 class="cover-names">
        <span>${config.names.bride}</span>
        <small>&amp;</small>
        <span>${config.names.groom}</span>
      </h1>
      <div class="cover-divider" aria-hidden="true">
        <span></span>
        <i></i>
        <span></span>
      </div>
      <p class="cover-date">${config.intro.coverDateLabel}</p>
      <p class="cover-line">${config.intro.coverLine}</p>
      <img class="cover-floral" src="${config.images.floralCenter}" alt="" aria-hidden="true" />
    </div>

    <a href="#contenido" class="cover-scroll" aria-label="Bajar a la invitación">&darr;</a>
  </section>

  <main class="invitation-layout" id="contenido">
    ${createSectionCard({
      className: 'family-section-card',
      eyebrow: 'Familia',
      title: config.blessing.title,
      subtitle: 'Compartimos con gratitud los nombres de quienes nos acompañan con amor y bendición.',
      body: `
        <div class="family-grid">
          <article class="family-group reveal">
            <span class="family-group-title">${config.blessing.brideParentsLabel}</span>
            ${familyNames(config.blessing.brideParents)}
          </article>
          <article class="family-group reveal" style="--delay:0.08s">
            <span class="family-group-title">${config.blessing.groomParentsLabel}</span>
            ${familyNames(config.blessing.groomParents)}
          </article>
          <article class="family-group family-group--full reveal" style="--delay:0.14s">
            <span class="family-group-title">${config.blessing.godparents.title}</span>
            ${familyNames(config.blessing.godparents.names)}
          </article>
        </div>
        <p class="family-footer-text reveal" style="--delay:0.18s">${config.blessing.closingText}</p>
      `,
    })}

    <section class="section-card countdown-section">
      ${createFloralCorners()}
      <div class="section-card__inner countdown-section__inner">
        <div class="section-heading countdown-section__heading reveal">
          <span class="card-eyebrow">Cuenta regresiva</span>
          <h2 class="card-title countdown-section__title">Faltan pocos días para nuestra boda</h2>
          <p class="card-subtitle countdown-section__subtitle">
            El sábado 08 de agosto de 2026 será el día principal de nuestra celebración.
          </p>
        </div>

        ${createDivider()}

        <div class="countdown-grid reveal" id="countdown">
          <div class="countdown-panel">
            <div class="countdown-segment">
              <span class="countdown-segment__value" id="days">00</span>
              <small class="countdown-segment__label">Días</small>
            </div>
            <div class="countdown-segment">
              <span class="countdown-segment__value" id="hours">00</span>
              <small class="countdown-segment__label">Horas</small>
            </div>
            <div class="countdown-segment">
              <span class="countdown-segment__value" id="minutes">00</span>
              <small class="countdown-segment__label">Minutos</small>
            </div>
            <div class="countdown-segment">
              <span class="countdown-segment__value" id="seconds">00</span>
              <small class="countdown-segment__label">Segundos</small>
            </div>
          </div>
        </div>

        <p class="countdown-note reveal">${config.ceremony.note}</p>
      </div>
    </section>

    ${createSectionCard({
      className: 'events-section',
      eyebrow: 'Celebración principal',
      title: 'Nuestra boda',
      subtitle:
        'El sábado 08 de agosto de 2026 es la fecha central de nuestra invitación y el momento que compartiremos con mayor alegría junto a ustedes.',
      body: `
        ${createPrimaryDateAccent()}
        <div class="event-grid">
          ${createEventCard(config.ceremony, 'event-card--primary')}
          ${createEventCard(config.reception, 'event-card--secondary')}
        </div>
      `,
    })}

    ${createSectionCard({
      className: 'timeline-section',
      eyebrow: 'Cronograma',
      title: 'Programa del gran día',
      subtitle: 'Los momentos principales de nuestra celebración del 08 de agosto.',
      body: `
        <div class="timeline-list">
          ${timelineItems}
        </div>
      `,
    })}

    ${createSectionCard({
      className: 'quote-card',
      eyebrow: 'Versículo bíblico',
      title: 'Una promesa para siempre',
      subtitle: 'Una palabra que acompaña este nuevo comienzo.',
      body: `
        <blockquote class="quote-block reveal">
          <p>${config.quote.text}</p>
          <cite>${config.quote.source}</cite>
        </blockquote>
      `,
    })}

    ${createSectionCard({
      className: 'invited-groups-section',
      eyebrow: 'Grupos invitados',
      title: 'Participación especial',
      subtitle: 'Compartimos con cariño a los grupos que serán parte de esta celebración especial.',
      body: `
        <div class="invited-groups-grid">
          ${invitedGroupItems}
        </div>
      `,
    })}

    ${createSectionCard({
      className: 'gallery-section',
      eyebrow: 'Galería',
      title: 'Nuestra Preboda',
      subtitle: 'Compartimos algunos recuerdos especiales de esta etapa tan hermosa.',
      body: `
        <div class="gallery-grid">
          ${galleryItems}
        </div>
      `,
    })}

    ${createSectionCard({
      className: 'rsvp-section',
      eyebrow: 'Confirmación',
      title: config.rsvp.title,
      subtitle: 'Escríbenos por WhatsApp para confirmar tu asistencia y acompañarnos en este día especial.',
      body: rsvpBody,
    })}

    <section class="section-card closing-card">
      ${createFloralCorners()}
      <div class="section-card__inner closing-card__inner">
        <img class="closing-divider reveal" src="${config.images.floralCenter}" alt="" aria-hidden="true" />
        <p class="closing-monogram reveal">${config.names.monogram}</p>
        <h2 class="card-title reveal">${config.gratitude.title}</h2>
        <p class="card-subtitle reveal">${config.gratitude.text}</p>
        <p class="closing-card__footer reveal">Con amor, ${config.names.display}</p>
      </div>
    </section>
  </main>
`;

const fallbackMap = new Map([
  [config.images.couple, config.images.cover],
  [config.images.church, config.images.couple],
  [config.images.venue, config.images.couple],
]);

const activateFallbacks = () => {
  document.querySelectorAll('img[data-fallback]').forEach((image) => {
    image.addEventListener(
      'error',
      () => {
        const fallback = image.dataset.fallback || fallbackMap.get(image.getAttribute('src'));
        if (fallback && image.getAttribute('src') !== fallback) {
          image.src = fallback;
        }
      },
      { once: true },
    );
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

const observeReveals = () => {
  document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
};

const formatCountdownValue = (value) => String(Math.max(0, value)).padStart(2, '0');

const countdownElements = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds'),
};

const updateCountdown = () => {
  const eventDate = new Date(config.religiousEvent.isoDate).getTime();
  const now = Date.now();
  const distance = eventDate - now;

  if (distance <= 0) {
    countdownElements.days.textContent = '00';
    countdownElements.hours.textContent = '00';
    countdownElements.minutes.textContent = '00';
    countdownElements.seconds.textContent = '00';
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / 1000);

  countdownElements.days.textContent = formatCountdownValue(days);
  countdownElements.hours.textContent = formatCountdownValue(hours);
  countdownElements.minutes.textContent = formatCountdownValue(minutes);
  countdownElements.seconds.textContent = formatCountdownValue(seconds);
};

const syncMusicButton = () => {
  if (!musicButton || !audio) return;
  musicButton.classList.toggle('is-playing', !audio.paused);
  musicButton.setAttribute('aria-label', audio.paused ? 'Reproducir música' : 'Pausar música');
};

const tryPlayAudio = async () => {
  if (!audio) return;

  try {
    await audio.play();
    syncMusicButton();
  } catch {
    syncMusicButton();
  }
};

const openInvitation = async () => {
  if (!openingScreen) return;

  openingScreen.classList.add('is-opened');
  app.classList.remove('is-locked');
  document.body.classList.add('invitation-opened');

  if (audio?.paused) {
    await tryPlayAudio();
  }

  window.setTimeout(() => {
    openingScreen.setAttribute('hidden', 'hidden');
  }, 900);
};

openButton?.addEventListener('click', openInvitation);
openingEnvelopeButton?.addEventListener('click', openInvitation);

musicButton?.addEventListener('click', async () => {
  if (!audio) return;

  if (audio.paused) {
    await tryPlayAudio();
    return;
  }

  audio.pause();
  syncMusicButton();
});

audio?.addEventListener('pause', syncMusicButton);
audio?.addEventListener('play', syncMusicButton);
audio?.addEventListener('ended', syncMusicButton);

syncMusicButton();
activateFallbacks();
observeReveals();
updateCountdown();
window.setInterval(updateCountdown, 1000);
