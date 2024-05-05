exports.jsonResponse = function (statusCode, body) {
  //lo que recibe como respuesta de cada solicitud http
  return {
    statusCode,
    body,
  };
};
