exports.handler = async function () {
  const API_KEY = process.env.API_KEY;

  const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Listado || [])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error obteniendo datos" })
    };
  }
};
