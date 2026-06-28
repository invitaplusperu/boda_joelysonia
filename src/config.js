const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const rootAsset = (path) => new URL(`../${path}`, import.meta.url).href;

const createMapsSearchUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const weddingConfig = {
  siteTitle: 'Sonia & Joel | Nuestra boda',
  names: {
    bride: 'Joel',
    groom: 'Sonia',
    display: 'Joel & Sonia',
    displayAlt: 'Joel y Sonia',
    initials: 'S & J',
    monogram: 'Joel · Sonia',
  },
  intro: {
    openingKicker: 'Nos Casamos',
    openingMessage: 'Con la bendición de Dios y de nuestros padres',
    headline: 'Nos Casamos',
    invitationText:
      'Con la bendición de Dios y de nuestros padres, les invitamos cordialmente a celebrar junto a nosotros nuestra unión matrimonial y a compartir la alegría de este día tan significativo.',
    coverEyebrow: 'Nuestra boda:',
    coverDateLabel: 'Sábado 08 de agosto de 2026 · 04:00 p.m.',
    coverLine: 'Una celebración de fe, amor y gratitud',
  },
  religiousEvent: {
    isoDate: '2026-08-08T16:00:00-05:00',
    dateLabel: '08 de agosto de 2026',
    fullLabel: 'Sábado 08 de agosto de 2026',
    day: '08',
    month: 'Agosto',
    year: '2026',
    time: '04:00 p.m.',
    timezone: 'America/Lima',
  },
  civilEvent: {
    dateLabel: '16 de julio de 2026',
    fullLabel: '16 de julio de 2026',
    title: 'Ceremonia civil y brindis',
    place: 'Santuario del Rock',
    mapsUrl: 'https://maps.app.goo.gl/hbJn1ePPYNYkDB9d9',
    summary:
      'Tendremos una ceremonia civil más íntima y sencilla, acompañada de un brindis especial con nuestros seres queridos.',
  },
  quote: {
    text: 'Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne.',
    source: 'Génesis 2:24',
  },
  blessing: {
    title: 'Con la bendición de Dios y de nuestros padres',
    closingText:
      'Será una alegría compartir con ustedes este momento tan significativo en nuestras vidas.',
    brideParentsLabel: 'Padres de Joel',
    groomParentsLabel: 'Padres de Sonia',
    brideParents: ['Carlos Muñoz Loayza', 'Victoria García Leyva'],
    groomParents: ['Efrain Navarro Medina', 'Olga Durand Vila'],
    godparents: {
      title: 'Padrinos',
      names: ['Manuel Huallpa Lopez', 'Elsa Quispe Yucra'],
    },
  },
ceremony: {
  title: 'Ceremonia religiosa',
  place: 'Iglesia Casa de Oración Pentecostés',
  date: 'Sábado 08 de agosto',
  time: '04:00 p.m.',
  timeLabel: 'Hora',
  address: 'Ref. Espaldar del Grifo Yaranmi',
  locationLabel: 'Referencia',
  note: 'La boda religiosa será el momento central de toda nuestra celebración.',
  mapLinks: [
    {
      label: 'Apple Maps',
      type: 'apple',
      url: 'https://maps.apple/p/D~MxMGE9_PRMch',
    },
    {
      label: 'Google Maps',
      type: 'google',
      url: 'https://maps.app.goo.gl/gvF6VR6JTsywKqN89',
    },
  ],
  image: asset('assets/img/foto_iglesia_dentro.png'),
},
  reception: {
    title: 'Recepción',
    place: 'Grass Sintético El Gran Chaparral',
    date: 'Después de la ceremonia',
    time: 'Al finalizar',
    timeLabel: 'Momento',
    address: 'Grass Chaparral',
    locationLabel: '',
    note: 'Nos reuniremos en Grass Chaparral para compartir el brindis, las fotos y la alegría de este gran día.',
    mapLinks: [
      {
        label: 'Apple Maps',
        type: 'apple',
        url: 'https://maps.apple/p/hsRU40pjA9bG9V',
      },
      {
        label: 'Google Maps',
        type: 'google',
        url: 'https://maps.app.goo.gl/JbA3gfFFvGD7tsM17',
      },
    ],
    image: asset('assets/img/foto_salondebrindis.png'),
  },
  timeline: [
    {
      date: '16 de julio de 2026',
      title: 'Ceremonia civil y brindis',
      text: 'Un encuentro íntimo y sencillo para compartir este primer paso.',
    },
    {
      date: '08 de agosto de 2026 · 04:00 p.m.',
      title: 'Boda religiosa',
      text: 'Nuestro momento principal ante Dios, rodeados de amor y familia.',
    },
    {
      date: 'Después de la ceremonia',
      title: 'Recepción en Grass Chaparral',
      text: 'Seguiremos celebrando juntos con un brindis lleno de alegría.',
    },
  ],
  mainSchedule: [
    {
      time: '04:00 p.m.',
      title: 'Ceremonia religiosa',
      text: 'Nuestro encuentro principal ante Dios en Iglesia Casa de Oración Pentecostés.',
    },
    {
      time: 'Al finalizar',
      title: 'Recepción y brindis',
      text: 'Nos trasladaremos a Grass Chaparral para compartir el brindis y las fotografías.',
    },
    {
      time: 'Celebración',
      title: 'Cena especial',
      text: 'Un momento para compartir la mesa, la alegría y el cariño de nuestras familias.',
    },
    {
      time: 'Más tarde',
      title: 'Apertura de pista',
      text: 'Cerraremos el gran día celebrando juntos con música y gratitud.',
    },
  ],
  gratitude: {
    title: 'Con cariño y gratitud',
    text:
      'Con profundo agradecimiento a Dios y a cada uno de ustedes por acompañarnos en este día tan especial. Su presencia, cariño y oraciones han sido una gran bendición para nuestras vidas. Con cariño y gratitud.',
  },
  rsvp: {
    title: 'Confirmación de asistencia',
    note:
      'Si deseas acompañarnos, puedes confirmar tu asistencia por WhatsApp y también sugerir una canción especial para nuestra boda.',
    helper: '',
  },
  contact: {
    whatsappNumber: '51962560657',
    confirmText:
      'Hola, confirmo mi asistencia a la boda de Sonia y Joel. Mi nombre es:',
    songText:
      'Hola, quiero sugerir esta canción para la boda de Sonia y Joel:',
  },
  images: {
    cover: asset('assets/galeria/foto_portada_principal.jpeg'),
    couple: asset('assets/img/foto_pareja_placeholder.png'),
    church: asset('assets/img/foto_iglesia_dentro.png'),
    venue: asset('assets/img/foto_salondebrindis.png'),
    envelope: asset('assets/img/carta_js.png'),
    floralCorner: asset('assets/img/flores_azul_esquinas.png'),
    floralCenter: asset('assets/img/flores_azul_centro.png'),
  },
  gallery: [
    { src: asset('assets/galeria/foto1.jpeg'), title: 'Galería 1' },
    { src: asset('assets/galeria/foto2.jpeg'), title: 'Galería 2' },
    { src: asset('assets/galeria/foto3.jpeg'), title: 'Galería 3' },
    { src: asset('assets/galeria/foto4.jpeg'), title: 'Galería 4' },
    { src: asset('assets/galeria/foto5.jpeg'), title: 'Galería 5' },
    { src: asset('assets/galeria/foto6.jpeg'), title: 'Galería 6' },
    { src: asset('assets/galeria/foto7.jpeg'), title: 'Galería 7' },
    { src: asset('assets/galeria/foto8.jpeg'), title: 'Galería 8' },
    { src: asset('assets/galeria/foto9.jpeg'), title: 'Galería 9' },
    { src: asset('assets/galeria/foto10.jpeg'), title: 'Galería 10' },
  ],
  invitedGroups: [
    {
      src: asset('assets/img/Ministerio_de_alabanzas_Caminando_con_la%20voz_de_cristo.jpeg'),
      title: 'Ministerio de alabanzas Caminando con la voz de Cristo',
      className: 'gallery-item--featured',
    },
    {
      src: asset('assets/img/Ministerio_de_alabanzas_la_gloria_de_Jehov%C3%A1.jpeg'),
      title: 'Ministerio de alabanzas La gloria de Jehová',
    },
  ],
  music: {
    src: rootAsset('Tu_Amor_Es_Un_Sueño_Tercer_Cielo.mp3'),
    label: 'Presiona para escuchar nuestra canción',
  },
};
