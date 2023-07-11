import auth from './auth/index.js';
import blocked_user from './block_user/index.js';
import contacts from './contacts/index.js';
import messeage from './messeages/index.js';

function defineApp(app) {
  auth(app);
  blocked_user(app);
  messeage(app);
  contacts(app);
};

export default defineApp;