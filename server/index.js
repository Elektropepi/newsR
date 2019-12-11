const WebSocket = require('ws');
const Newsie = require('newsie').default;
const {Command} = require('newsie');

// todo: typescript

const server = new WebSocket.Server({
  port: 8080,
});

server.on('connection', function connection(ws) {
  let newsie;

  ws.on('message', async function incoming(message) {
    console.log('received: %s', message);

    if (message.startsWith('NNTPCONNECT ')) {
      const messageSplit = message.split(" ");
      newsie = new Newsie({
        host: messageSplit[1],
        port: messageSplit[2]
      });
      await newsie.connect();
    } else if (message.startsWith('CAPABILITIES')) {
      newsie.capabilities().then((data) => {
        ws.send(JSON.stringify(data));
      });
    } else if (message.startsWith('LIST NEWSGROUPS')) {
      const messageSplit = message.split(" ");
      newsie.listNewsgroups(messageSplit[2]).then((data) => {
        ws.send(JSON.stringify(data));
      });
    }


  });

  ws.send(JSON.stringify({
    code: 200
  }));
});
