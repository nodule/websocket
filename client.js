module.exports = {
  name: "client",
  ns: "websocket",
  description: "Websocket Client",
  async: true,
  phrases: {
    active: "Creating websocket client"
  },
  ports: {
    input: {
      url: {
        type: "string",
        title: "Url"
      },
      protocol: {
        title: "Protocol",
        type: "string",
        "default": null
      },
      send: {
        title: "Send",
        type: "any",
        async: true,
        fn: function __SEND__(data, x, source, state, input, output, websocket) {
          var r = function() {
            if (!state.client) {

              if (input.protocol) {
                state.client = new websocket.w3cwebsocket(input.url, input.protocol);
              } else {
                state.client = new websocket.w3cwebsocket(input.url);
              }

              state.client.onmessage = function(event) {
                output({
                  message: JSON.parse(event.data)
                });
              };

              state.client.onerror = function(event) {
                output({
                  error: event
                });
              };

              state.client.onclose = function(event) {
                output({
                  close: event
                });
              };

              state.client.onopen = function(event) {
                output({
                  client: state.client,
                  open: event
                });
              };

            }

            if (state.client && state.client.readyState === state.client.OPEN) {
              state.client.send(JSON.stringify(data));
            } else {
              // should revoke input && re-queue
              return false;
            }
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      }
    },
    output: {
      client: {
        type: "WebSocket",
        title: "WebSocket"
      },
      open: {
        type: "any",
        title: "Open"
      },
      close: {
        type: "any",
        title: "Close"
      },
      message: {
        type: "any",
        title: "Message"
      },
      error: {
        type: "Object",
        title: "Error"
      }
    }
  },
  dependencies: {
    npm: {
      websocket: require('websocket')
    }
  },
  state: {}
}