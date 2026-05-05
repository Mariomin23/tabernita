/**
 * MODEL — La Tabernita
 * Carga los partidos de la jornada desde Google Sheets via JSONP.
 * JSONP funciona desde file:// y desde servidor sin problemas de CORS.
 */

const TabernitaModel = (() => {

  const SHEET_ID = '1vlmT1bc3sTbp-7FMQTF0UXf4J4Z2PheQVSfHu9ZKHCg';

  // --- PARTIDOS (se rellenan desde Google Sheets) ---
  let matches = [];

  // --- EVENTOS DEL CALENDARIO (datos estáticos) ---
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

  /**
   * Carga los partidos desde Google Sheets usando JSONP.
   * Al usar un <script> dinámico no hay restricciones CORS,
   * funciona tanto desde file:// como desde un servidor web.
   *
   * Estructura de la hoja:
   *   Fila 1: FECHA | HORA | LOCAL | VISITANTE  (cabeceras — se ignoran)
   *   Fila 2+: cada fila es un partido
   */
  const fetchMatchesFromSheet = () => {
    return new Promise((resolve, reject) => {

      const callbackName = '__tabernita_gviz__';

      // Limpieza del script y del callback global
      const cleanup = () => {
        delete window[callbackName];
        const s = document.getElementById('gviz-jsonp');
        if (s) s.remove();
      };

      // Timeout: si Google no responde en 8s, fallamos limpiamente
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('Timeout al conectar con Google Sheets'));
      }, 8000);

      // Callback global que gviz invocará con los datos
      window[callbackName] = function(data) {
        clearTimeout(timer);
        cleanup();

        try {
          const rows = data.table.rows;

          // rows[0] = fila 1 de la hoja = cabeceras (FECHA, HORA, LOCAL, VISITANTE) → se omite
          // rows[1+] = partidos reales
          matches = rows
            .slice(1)
            .map((row, i) => {
              // Extrae el valor de texto de una celda, devuelve '' si está vacía
              const val = (n) => (row.c && row.c[n] && row.c[n].v != null)
                ? String(row.c[n].v).trim()
                : '';

              const fecha     = val(0); // Columna A
              const hora      = val(1); // Columna B
              const local     = val(2); // Columna C
              const visitante = val(3); // Columna D

              // Ignorar filas completamente vacías
              if (!local && !visitante) return null;

              return { id: i, fecha, hora, local, visitante };
            })
            .filter(Boolean);

          resolve(matches);
        } catch (e) {
          reject(new Error('Error procesando datos de Google Sheets: ' + e.message));
        }
      };

      // Inyectar el script JSONP — gviz llamará a window[callbackName](data)
      const script = document.createElement('script');
      script.id   = 'gviz-jsonp';
      script.src  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json;responseHandler:${callbackName}`;
      script.onerror = () => {
        clearTimeout(timer);
        cleanup();
        reject(new Error('No se pudo cargar Google Sheets (sin conexión o hoja privada)'));
      };

      document.head.appendChild(script);
    });
  };

  // --- GETTERS ---
  const getAllMatches = () => matches;
  const getAllEvents  = () => events;

  return {
    fetchMatchesFromSheet,
    getAllMatches,
    getAllEvents
  };

})();
