import User from '../../../Models/User';
export default async function checkUser(entry, Record, entryType, pathDescription){
  return new Promise((resolve, reject) => {
    // TODO: CHECK COOKIE ALSO
    // console.log(entry);
    if(!entry.signedInUser || !entry.signedInUser["id"] || !entry.signedInUser["username"]){
      reject({status: 401, exists: false, error: "Sign in required or bad request"})
    } else {
      var user = User.findOne({username: entry.signedInUser.username, _id: entry.signedInUser.id}, (error, item) => {
        if(!error && item !== null){
          if(entryType === "User"){
            if(item.has.admin || item.has.dev){
              resolve({status: 200, exists: true, error: null});
            } else {
              resolve({status: 403, exists: true, error: "user does not have priviledges"});
            }
          } else {
            if(
              (item.has.create && pathDescription === "add") ||
              (item.has.update && pathDescription === "edit") ||
              (item.has.delete && pathDescription === "soft remove") ||
              (item.has.read && pathDescription === "read") || item.has.admin || item.has.dev
            ){
              resolve({status: 200, exists: true, error: null});
            } else {
              resolve({status: 403, exists: true, error: "User does not have priviledges"});
            }
          }
        } else {
          reject({status: 404, exists: false, error: "User not found"});
        }
      })
    }
  })
}
