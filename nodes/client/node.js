on.input.url = function() {

  state.client = null;

  if(input.protocol) {
    state.client = new websocket.w3cwebsocket(input.url, input.protocol);
  } else {
    state.client = new websocket.w3cwebsocket(input.url);
  }

  state.client.onmessage = function(event) {
    output({ message: event.data });
  };

  state.client.onerror = function(event) {
    output({ error: event });
  };

  state.client.onclose = function(event) {
    output({ close: event });
  };

  state.client.onopen = function(event) {
    output({
      client: state.client,
      open: event
    });
  };

};

on.input.send = function(data) {
  client.send(data);
};
