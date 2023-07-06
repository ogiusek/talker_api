
# Talker api

talker is made to communicate\
here is description how to use this socket api

#### Made with:
[![GitHub stars](https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png)](https://github.com/username/repo/stargazers)

## Run Locally

Clone the project

```bash
  git clone https://github.com/ogiusek/talker_api
```

Go to the project directory

```bash
  cd talker_api
```

[How create certificate](https://www.howtogeek.com/devops/what-is-a-pem-file-and-how-do-you-use-it/)
Generate cert and sign with csr or buy one
```bash
  openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```


Install dependencies
```bash
  npm install
```

Start the server

```bash
  npm run start
```

## How use socket api in a nutshell

How to connect to socket api
```js
import { io } from 'socket.io-client';

const socket = io('https://127.0.0.1:8080');
const socket = io('https://127.0.0.1:8080', { rejectUnauthorized: false }); // If cert is not signed
```

Simple commands
```js
socket.emit("eventName", {"data":"..."});
socket.on("eventName", data=>{
    ...
});
socket.onAny((eventName, data)=>{
    ...
});
```

## API Reference

## Rest Api

### Auth

`/isUsed/email`
Returns is email used
| Parameter | Type | Description | Required |
| :- | :- | :- | :- |
| ***`email`*** | `string` | check's if email is used | yes |

`/isUsed/username`
Returns is username used
| Parameter | Type | Description | Required |
| :- | :- | :- | :- |
| ***`username`*** | `string` | Unique not used email | yes |

`/register`
Used to create account
| Parameter | Type | Description | Required |
| :- | :- | :- | :- |
| ***`email`*** | `string` | Unique not used email | yes |
| ***`username`*** | `string` | Unique not used | yes |
| ***`hash`*** | `string` | Hashed password for account | yes |

‎\
`/register/confirm`
Used to confirm email ***required*** to create account
| Parameter | Type | Description | Required |
| :- | :- | :- | :- |
| ***`id`*** | `int` | id sent to email after login | yes |
| ***`uuid`*** | `string` | uuid sent to email after login | yes |

### Get data methods

`/blocked/users` requires being logged in
Returns all blocked users
| Parameter | Type | Description | Required |
| :- | :- | :- | :- |
| ***`user_id`*** | `int` | id sent to email after login | yes |
| ***`clientAddress`*** | `string` | uuid sent to email after login | yes |

‎\
`/contacts` requires being logged in
Returns all contacts
| Parameter | Type | Description | Required |
| :- | :- | :- | :- |
| ***`user_id`*** | `int` | User id, *Send on login* | yes |
| ***`clientAddress`*** | `string` | session_key id *Send on login* | yes |

‎\
`/messeages` requires being logged in
Returns all messeages 
| Parameter | Type | Description | Required |
| :- | :- | :- | :- |
| ***`user_id`*** | `int` | User id, *Sent on login* | yes |
| ***`clientAddress`*** | `string` | session_key id *Send on login* | yes |
| ***`with_id`*** | `int` | User id with which you are chattin | yes |
| `from_messeage` | `int` | Returns older messeages then id | no |

## Socket api
### Server listens to

`login`\
Resends your id of your account and your address 
| Parameter | type | Description |
| :- | :- | :- |
| ***`login`*** | `string` | Username or email  |
| ***`hash`*** | `string` | Hashed password to account |

You can also connect on init with auth 
```js
const socket = io('https://127.0.0.1:8080', 
  { 
    rejectUnauthorized: false, 
    auth:{login: '?', hash: '?'} 
  });
```
‎\
`logout`\
logs out users\
takes no parameters

‎\
`block_user`\
Block's selected user
| Parameter | type | Description |
| :- | :- | :- |
| ***`user_id`*** | `int` | Your id |
| ***`blocked_id`*** | `int` | Id of user you want to block |


`unlock_user`\
Unlock's selected user
| Parameter | type | Description |
| :- | :- | :- |
| ***`user_id`*** | `int` | Your id |
| ***`blocked_id`*** | `int` | Id of user you want to unlock |

‎\
`messeage`\
Sends messeage to user
| Parameter | type | Description |
| :- | :- | :- |
| ***`user_id`*** | `int` | Your id |
| ***`to_id`*** | `int` | Id of your caller |
| ***`content`*** | `string` | Content of a messeage |
| ***`content_type`*** | `string` | Type of your content (types are listed below) |

| Content_type | Description |
| :- | :- |
| `text` | Just text of messeage |
| `video` | Data uri of video |
| `photo` | Data uri of photo |
| `audio` | data uri of audio |
| `file` | data uri of a file |

‎\
`read`
Mark's messeage as readen
| Parameter | type | Description |
| :- | :- | :- |
| ***`user_id`*** | `int` | Your id |
| ***`messeage_id`*** | `int` | Id of messeage |

‎\
`type`
Used while you're typing to show caller 
| Parameter | type | Description |
| :- | :- | :- |
| ***`user_id`*** | `int` | Your id |
| ***`to_id`*** | `int` | Id of your caller |


`type_wait`
Sends you info when caller typing
| Parameter | type | Description |
| :- | :- | :- |
| ***`user_id`*** | `int` | Your id |
| ***`to_id`*** | `int` | Id of your caller |


### Server emit's

- ***`error`***
  sends error code of last action

- ***`login`***
  sends `id` and `clientAddress` on login

- ***`messeage`***
  sends new messeage

- ***`notified`***
  sends id of messeage if somebody get's notified

- ***`read`***
  sends id of messeage if somebody get's notified

- ***`typing`***
  sends id of user if he starts or stops typing

- ***`auth`***
  sends false when you're using id of user on which you are not logged in


## Authors

[@ogiusek](https://github.com/ogiusek?tab=repositories)



## License

[ISC](https://choosealicense.com/licenses/isc/)
