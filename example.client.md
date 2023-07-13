# example client

## socket client
```js
const socket = require('socket.io-client')('http://localhost:8080');

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

let params = new URLSearchParams();
params.append('email', 'mail');

fetch(`http://127.0.0.1:8080/isUsed/email?` + params, {
  method: "GET",
}).then(response => response.json())
  .then(console.log);
```
