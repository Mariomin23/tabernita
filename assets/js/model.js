/**
 * MODEL — La Tabernita
 * Contiene los datos de la aplicación (partidos, eventos).
 * En una implementación real, estos datos vendrían de una API/backend.
 */

const TabernitaModel = (() => {

  // --- PARTIDOS DE LA JORNADA ---
  const matches = [
    {
      id: 1,
      homeTeam: "Atlético de Madrid",
      awayTeam: "Real Madrid",
      league: "LaLiga EA Sports",
      date: "Hoy",
      time: "21:00",
      channel: "DAZN",
      isLive: false,
      isFeatured: true
    },
    {
      id: 2,
      homeTeam: "Barcelona",
      awayTeam: "Sevilla",
      league: "LaLiga EA Sports",
      date: "Hoy",
      time: "18:30",
      channel: "DAZN",
      isLive: true,
      isFeatured: false
    },
    {
      id: 3,
      homeTeam: "Real Madrid",
      awayTeam: "Bayern Munich",
      league: "Champions League",
      date: "Hoy",
      time: "21:00",
      channel: "Movistar+",
      isLive: false,
      isFeatured: false
    },
    {
      id: 4,
      homeTeam: "Atlético de Madrid",
      awayTeam: "Inter de Milan",
      league: "Champions League",
      date: "Hoy",
      time: "21:00",
      channel: "Movistar+",
      isLive: false,
      isFeatured: false
    }
  ];

  // --- EVENTOS DEL CALENDARIO ---
  const events = [
    {
      id: 1,
      day: "19",
      month: "Abr",
      category: "dardos",
      categoryLabel: "🎯 Liga de Dardos",
      title: "Jornada 12 – Liga Chamberí Dardos",
      description: "Enfrentamiento clave en nuestra liga local de dardos. Ven a animar a nuestro equipo.",
      time: "20:00 h",
    },
    {
      id: 2,
      day: "20",
      month: "Abr",
      category: "futbol",
      categoryLabel: "⚽ Partido Especial",
      title: "Atlético de Madrid – Copa del Rey",
      description: "Seguimos el partido del Atleti en pantalla grande. Ambiente colchonero garantizado.",
      time: "21:00 h",
    },
    {
      id: 3,
      day: "22",
      month: "Abr",
      category: "dardos",
      categoryLabel: "🎯 Liga de Dardos",
      title: "Semifinal – Torneo Primavera Chamberí",
      description: "Semifinal del torneo de dardos de primavera. Plazas limitadas, inscríbete ya.",
      time: "19:30 h",
    },
    {
      id: 4,
      day: "26",
      month: "Abr",
      category: "especial",
      categoryLabel: "🍺 Evento Especial",
      title: "Noche de San Cervantes – Tapas y Música",
      description: "Velada especial con música en directo, degustación de tapas madrileñas y mucho más.",
      time: "19:00 h",
    },
    {
      id: 5,
      day: "28",
      month: "Abr",
      category: "futbol",
      categoryLabel: "⚽ LaLiga",
      title: "Jornada 35 LaLiga – Atleti en pantalla",
      description: "Retransmisión en directo de la jornada 35. Sitios disponibles, reserva ya tu mesa.",
      time: "21:00 h",
    },
    {
      id: 6,
      day: "03",
      month: "May",
      category: "dardos",
      categoryLabel: "🎯 Liga de Dardos",
      title: "Final – Torneo Primavera Chamberí",
      description: "Gran final del torneo de dardos. El campeón se llevará el trofeo 'La Tabernita 2025'.",
      time: "20:00 h",
    }
  ];

  // --- GETTERS ---
  const getAllMatches = () => matches;
  const getAllEvents = () => events;

  return {
    getAllMatches,
    getAllEvents
  };

})();
