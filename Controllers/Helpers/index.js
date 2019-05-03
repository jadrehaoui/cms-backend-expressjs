import addFunction from './add';
import editFunction from './edit';
import overwriteFunction from './overwrite';
import listFunction from './list';
export const add = (req, res, Record, currentUser) => addFunction(req, res, Record, currentUser);
// export const edit = (req, res) => editFunction(req, res, Record, currentUser);
// export const softRemove = (req, res) => softRemoveFunction(req, res, Record, currentUser);
// export const overwrite = (req, res) => overwriteFunction(req, res, Record, currentUser);
// export const list = (req, res) => listFunction(req, res, Record, currentUser, paginated, pageNumber, length);
