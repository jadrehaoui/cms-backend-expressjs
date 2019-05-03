import mongoose, { Schema } from 'mongoose';
export default mongoose.model('user', new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  givenName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  published: {type: Boolean, required: true, default: false},
  deleted: {type: Boolean, required: true, default: false},
  has: {
    create: {type: Boolean, required: true, default: false},
    read: {type: Boolean, required: true, default: false},
    update: {type: Boolean, required: true, default: false},
    delete: {type: Boolean, required: true, default: false},
    admin: {type: Boolean, required: true, default: false},
    dev: {type: Boolean, required: true, default: false}
  },
  createdTs: {
    date: {type: String, required: true},
    time: {type: String, required: true}
  },
  updatedTs: {
    date: {type: String, required: true},
    time: {type: String, required: true}
  },
  createdBy: {
    id: {type: String, required: true},
    username: {type: String, required: true}
  },
  updatedBy: {
    id: {type: String, required: true},
    username: {type: String, required: true}
  }
}));
