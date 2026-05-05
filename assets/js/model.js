/**
 * MODEL — La Tabernita
 * Contiene los datos de la aplicación (partidos, eventos).
 * En una implementación real, estos datos vendrían de una API/backend.
 */

const TabernitaModel = (() => {

  // Usamos el endpoint gviz que tiene mejor soporte CORS y funciona tanto en file:// como en servidor
  const SHEET_ID = '1vlmT1bc3sTbp-7FMQTF0UXf4J4Z2PheQVSfHu9ZKHCg';
  const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

  // --- PARTIDOS DE LA JORNADA (Sheet fallback) ---
  let matches = [];

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

  // --- FETCH DATA FROM GOOGLE SHEETS (via gviz JSON) ---
  const fetchMatchesFromSheet = async () => {
    try {
      const response = await fetch(GVIZ_URL);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const rawText = await response.text();

      // El endpoint gviz devuelve JSONP con un wrapper que hay que eliminar:
      // "/*O_o*/\ngoogle.visualization.Query.setResponse({...});"
      const jsonText = rawText
        .replace(/^[^{]*/, '')   // elimina todo antes del primer {
        .replace(/;?\s*$/, '');  // elimina el ; final

      const json = JSON.parse(jsonText);
      const rows = json.table.rows;

      // La primera fila (rows[0]) contiene los títulos: FECHA, HORA, LOCAL, VISITANTE
      // Se omite con slice(1) — solo se procesan las filas de datos
      matches = rows
        .slice(1)
        .map((row, index) => {
          const get = (i) => (row.c[i] && row.c[i].v !== null ? String(row.c[i].v).trim() : '');
          const fecha     = get(0);
          const hora      = get(1);
          const local     = get(2);
          const visitante = get(3);

          // Ignorar filas donde no hay equipo local ni visitante
          if (!local && !visitante) return null;

          return { id: index, fecha, hora, local, visitante };
        })
        .filter(Boolean);

      return matches;
    } catch (error) {
      console.error('Error al cargar partidos desde Google Sheets:', error);
      return [];
    }
  };

  // --- GETTERS ---
  const getAllMatches = () => matches;
  const getAllEvents = () => events;

  return {
    fetchMatchesFromSheet,
    getAllMatches,
    getAllEvents
  };

})();

