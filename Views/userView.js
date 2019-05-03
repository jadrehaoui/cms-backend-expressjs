import User from '../Models/User';
import * as actions from '../Controllers/UserController';
export default function(app){
  app = require('express-async-await')(app);
  app.post('/user/add', (req, res) => actions.add(req, res, User, "User", "add"));
  app.put('/edit/user/:id', (req, res) => actions.edit(req, res, User, "User", "edit"));
  app.post('/users', (req, res) => actions.list(req, res, User, "User", "read"));
  app.post('/users/:pageNumber', (req, res) => actions.list(req, res, User, "User", "read"));
  app.delete('/soft_remove/user/:id', (req, res) => actions.edit(req, res, User, "User", "soft remove"));
  // app.delete('/overwrite/user/:id', (req, res) => actions.overwrite(req, res, User, null, "overwrite"));
}
