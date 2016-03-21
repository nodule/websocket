on.input.send = function() {
  if(!state.client) {
    if($.protocol) {
      state.client = new websocket.w3cwebsocket($.url, $.protocol);
    } else {
      state.client = new websocket.w3cwebsocket($.url);
    }

    state.client.onmessage = function(event) {
      output({ message: $.create(JSON.parse(event.data)) });
    };

    state.client.onerror = function(event) {
      output({ error: $.create(event) });
    };

    state.client.onclose = function(event) {
      output({ close: $.create(event) });
    };

    state.client.onopen = function(event) {
      output({
        client: $.create(state.client),
        open: $.create(event)
      });
    };
  }

  if(state.client && state.client.readyState === state.client.OPEN) {
    state.client.send(JSON.stringify($.send));
  } else {
    // should revoke input && re-queue
    return false;
  }
};
