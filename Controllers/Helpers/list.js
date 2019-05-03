import checkUser from './functions/checkUser';
import log from './functions/log';
import _ from 'lodash';
import { config } from '../../config';
export default async (req, res, Record, entryType, pathDescription) => {
  var pageNumber = req.params["pageNumber"] ? parseInt(req.params.pageNumber) : null;
  var entry = req.body;
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
    if(pageNumber !== null){
      var records = Record.find({}, (error, results) => {
        if(!error){
          res.json({
            obj_items: _.mapKeys(Object.assign({}, results), '_id'),
            arr_items: results,
            status: validUser.status,
            message: "Successfully listed paginated",
            numberOfItems: results.length,
            pageNumber: pageNumber,
            pageLimit: config.pageLimit,
            entryType: entryType
          })
        } else {
          var log_result = log({message: "cannot list "+entryType+" due to server or database error", error: error, status: 500}).catch(error => {return error});
          res.json({
            status: 500,
            message: "Internal Server Error, databse related error.",
            error: error
          })
        }
      }).skip((pageNumber-1)*config.pageLimit).limit(config.pageLimit)
    } else {
      var records = Record.find({}, (error, results) => {
        if(!error){
          res.json({
            obj_items: _.mapKeys(Object.assign({}, results), '_id'),
            arr_items: results,
            status: validUser.status,
            message: "Successfully listed not paginated",
            numberOfItems: results.length,
            pageNumber: "NaN",
            pageLimit: "NaN",
            entryType: entryType
          })
        } else {
          var log_result = log({message: "cannot list "+entryType+" due to server or database error", error: error, status: 500}).catch(error => {return error});
          res.json({
            status: 500,
            message: "Internal Server Error, databse related error.",
            error: error
          })
        }
      })
    }

  }

}
