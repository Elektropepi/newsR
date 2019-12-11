const WebSocket = require('ws');
const Newsie = require('newsie').default;
const {Command} = require('newsie');

// todo: typescript

function findCommand(str) {
  return Object.values(Command).filter((command) => {
    return str.startsWith(command);
  }).sort((a, b) => b.length - a.length)[0];
}

const server = new WebSocket.Server({
  port: 8080,
});

server.on('connection', function connection(ws) {
  let newsie;

  ws.on('message', async function incoming(message) {
    console.log('received: %s', message);

    if (message.startsWith('NNTPCONNECT')) {
      const messageSplit = message.split(" ");
      newsie = new Newsie({
        host: messageSplit[1],
        port: messageSplit[2]
      });
      newsie.connect().then(() => {
        ws.send(JSON.stringify({
          code: 200
        }));
      });
    }

    const foundCommand = findCommand(message);
    if (foundCommand) {
      if (!newsie) {
        // todo: return error via websocket
        throw Error('No connection to NNTP server, call NNTPCONNECT with host and port first.');
      }
      console.log('foundCommand', foundCommand);
      // todo: deal with multiple arguments...
      let arguments = [];
      if (foundCommand.length !== message.trim().length) {
        arguments = message.slice(foundCommand.length).trim().split(' ');
        console.log(arguments);
      }
      newsie.command(foundCommand, ...arguments).then((data) => {
        ws.send(JSON.stringify(data));
      });
    }
  });
});
