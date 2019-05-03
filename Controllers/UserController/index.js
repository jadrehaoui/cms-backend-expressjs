import addFunction from '../Helpers/add';
export const add = (req, res, Record, entryType, pathDescription) => {
  addFunction(req, res, Record, entryType, pathDescription);
}
import editFunction from '../Helpers/edit';
export const edit = (req, res, Record, entryType, pathDescription) => {
  editFunction(req, res, Record, entryType, pathDescription);
}
import listFunction from '../Helpers/list';
export const list = (req, res, Record, entryType, pathDescription) => {
  listFunction(req, res, Record, entryType, pathDescription);
}
import overwriteFunction from '../Helpers/overwrite';
export const overwrite = (req, res, Record, entryType, pathDescription) => {
  console.log(pathDescription);
  overwriteFunction(req, res, Record, currentUser);
}

// import softRemoveFunction from '../Helpers/softRemove';
// export const softRemove = (req, res, Record, currentUser, pathDescription) => {
//   console.log(pathDescription);
//   softRemoveFunction(req, res, Record, currentUser);
// }
