var client = new websocket.w3cwebsocket;
output = function() {

  client.on('connectFailed', function(error) {
    cb({ error: error });
  });

  client.on('connect', function(connection) {

    connection.on('error', function(error) {
      cb({ error: error });
    });

    connection.on('close', function() {
      cb({ close: null });
    });

    connection.on('close', function() {
      cb({ close: null });
    });

    connection.on('message', function(message) {
      cb({ message: message });
    });

    cb({
      connection: connection,
      client: client
    });

  });

  client.connect(input.url, input.protocol);

};
