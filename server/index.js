const WebSocket = require('ws');
const Newsie = require('newsie').default;
const {Command} = require('newsie');

// todo: typescript

function findCommand(str) {
  return Object.values(Command).filter((command) => {
    return str.startsWith(command);
  }).sort((a, b) => b.length - a.length)[0];
}

const port = process.env.PORT || 8080;
console.log('Starting with port: ' + port);

const keepAliveInterval = 1000; // 1 second
const killConnectionInterval = 1000 * 30; // 30 seconds

const server = new WebSocket.Server({
  port: port
});

function resetKillInterval(killInterval, ws) {
  clearInterval(killInterval);
  return setInterval(() => {
    ws.close();
  }, killConnectionInterval);
}

server.on('connection', function connection(ws) {
  let newsie;

  const pingInterval = setInterval(() => {
    ws.ping();
  }, keepAliveInterval);

  let killInterval = resetKillInterval(null, ws);

  ws.on('close', () => {
    clearInterval(pingInterval);
    clearInterval(killInterval);
    if (newsie) {
      newsie.disconnect();
    }
  });

  ws.on('pong', () => {
    killInterval = resetKillInterval(killInterval, ws);
  });

  let previousCommand = '';
  ws.on('message', async function incoming(message) {
    killInterval = resetKillInterval(killInterval, ws);

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
      let arguments = [];
      if (foundCommand.length !== message.trim().length) {
        arguments = message.slice(foundCommand.length).trim().split(' ');
      }
      newsie.command(foundCommand, ...arguments).then((data) => {
        ws.send(JSON.stringify(data));
      });
      previousCommand = foundCommand;
    } else if (previousCommand === Command.POST) {
      newsie.sendData(Command.POST_SEND, message).then((data) => {
        ws.send(JSON.stringify(data));
      });
    }
  });
});
