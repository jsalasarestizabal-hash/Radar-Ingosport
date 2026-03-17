exports.handler = async function () {
  const API_KEY = process.env.API_KEY;

  const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?estado=activas&ticket=${API_KEY}`;

  const keywords = [
    "pasto",
    "sintético",
    "sintetico",
    "césped",
    "cesped",
    "cancha",
    "canchas",
    "multicancha",
    "multicanchas",
    "pista",
    "atlética",
    "atletica",
    "deportivo",
    "deportiva",
    "deportivos",
    "deportivas",
    "recinto",
    "estadio",
    "cierre perimetral",
    "iluminación",
    "iluminacion",
    "espacio recreativo",
    "superficie deportiva",
    "infraestructura deportiva"
  ];

  try {
    const response = await fetch(url);
    const data = await response.json();

    const listado = Array.isArray(data.Listado) ? data.Listado : [];

    const filtradas = listado.filter(item => {
      const nombre = (item.Nombre || "").toLowerCase();
      return keywords.some(keyword => nombre.includes(keyword));
    });

    return {
      statusCode: 200,
      body: JSON.stringify(filtradas)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error obteniendo datos", detalle: String(error) })
    };
  }
};
