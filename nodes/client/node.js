on.input.send = function() {

  if(!state.client) {

    if(input.protocol) {
      state.client = new websocket.w3cwebsocket(input.url, input.protocol);
    } else {
      state.client = new websocket.w3cwebsocket(input.url);
    }

    state.client.onmessage = function(event) {
      output({ message: JSON.parse(event.data) });
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

  }

  if(state.client && state.client.readyState === state.client.OPEN) {
    state.client.send(JSON.stringify(input.send));
  } else {
    // should revoke input && re-queue
    return false;
  }
};
