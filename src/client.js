var request = require('request'),
  Promise = require('es6-promise').Promise,
  clientGenerator = require('swagger-client-generator');

module.exports = function(schema){
  return clientGenerator(schema, requestHandler);
};

function requestHandler(error, requestObject){
  return new Promise(function(resolve, reject){
    if(error) return reject(error);

    var options = {
      url: requestObject.url,
      method: requestObject.method,
      headers: requestObject.headers,
      body: requestObject.body
    };

    request(options, function(error, incomingMessage, response){
      if(error) return reject({
        error: error,
        status: incomingMessage.statusCode,
        data: response
      });

      return resolve(response);
    });
  });
}