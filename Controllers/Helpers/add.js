import checkUser from './functions/checkUser';
import getTime from './functions/getTime';
import { config } from '../../config';
import log from './functions/log';
export default async (req, res, Record, entryType, pathDescription) => {
  var entry = req.body;
  var validUser = await checkUser(entry, Record, entryType, pathDescription).catch(error => {return error});
  if(validUser.status === 401 || validUser.status === 403 || validUser.status === 404 || validUser.status !== 200){
    var badRec = {
      error: validUser.error + " to "+pathDescription,
      saved_in: "log_file.txt",
      reviewed: false,
      status: validUser.status,
      entry: entry
    }
    var log_result = await log(badRec).catch(error => {return error});
    if(log_result.logged){
      badRec.logged = true;
    }
    res.json(badRec);
  } else {
    var recordToAdd = entry;
    var time = await getTime().catch(error => {return {date: "DD/MM/YYYY", time: "HH:MM:SS"}})
    recordToAdd.updatedBy = entry.signedInUser;
    recordToAdd.createdBy = entry.signedInUser;
    recordToAdd.createdTs = time;
    recordToAdd.updatedTs = time;
    var record = new Record(recordToAdd).save((error, item) => {
      if(!error){
        res.json({
          status: validUser.status,
          message: entryType + " added successfully.",
          entry: item
        })
      } else {
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
        res.json(serverError)
      }
    })
  }
}
