# example client

## socket client
```js
const socket = require('socket.io-client')('https://localhost:8080', { secure: true, rejectUnauthorized: false });

socket.on('connect', () => {
  socket.on('messeage', data => {
    console.log(`recived: ${data}`);
  });

  socket.emit('messeage', 'Hello from the client!');
});
```

## Rest client
```js
const fetch = require("node-fetch");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false
});

let params = new URLSearchParams();
params.append('email', 'mail');

fetch(`https://127.0.0.1:8080/isUsed/email?` + params, {
  method: "GET",
  agent: agent
}).then(response => response.json())
  .then(console.log);
```
