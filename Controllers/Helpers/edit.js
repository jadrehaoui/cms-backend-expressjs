import checkUser from './functions/checkUser';
import getTime from './functions/getTime';
import { config } from '../../config';
import log from './functions/log';
export default async (req, res, Record, entryType, pathDescription) => {
  var entry = req.body;
  var params = req.params;
  var validUser = await checkUser(entry, Record, entryType, pathDescription).catch(error => {return error});
  if(validUser.status !== 200){
    var badRec = {
      error: validUser.error + " to " +pathDescription,
      saved_in: "log_file.txt",
      reviewed: false,
      status: validUser.status,
      entry: entry
    }
    var log_result = await log(badRec).catch(error => {return error});
    if(log_result.logged){
      badRec.logged == true;
    }
    res.json(badRec);
  } else {
    var recordToEdit = entry;
    if(pathDescription === "soft remove"){
      recordToEdit = {deleted: true, published: false}
    }
    recordToEdit.updatedBy = entry.signedInUser;
    recordToEdit.updatedTs = await getTime().catch(error => {return {time: "HHMMSS", date: "DDMMYYY"}})
    var record = Record.findOneAndUpdate({_id: params.id}, recordToEdit, {new: true}, (error, item) => {
      if(error){
        var serverError = {
          error: error,
          status: 500,
          saved_in: "log_file.txt",
          reviewed: false,
          entry: entry
        }
        var log_result = log(serverError).catch(error => {return error});
        if(log_result.logged === true){
          serverError.logged = true
        }
        res.json(serverError);
      } else {
        res.json({
          status: validUser.status,
          message: entryType + " updated successfully.",
          entry: item
        })
      }
    })
  }
}
