import fs from 'fs';

export default function log(obj){
  var xDate = new Date();
  return new Promise((resolve, reject) => {
    fs.appendFile("./log_file.txt",JSON.stringify(obj)+"\nDate: "+String(xDate.getDate()).padStart(2, '0')+"/"+String(xDate.getMonth() + 1).padStart(2,'0')+"/"+xDate.getFullYear()+" - Time: "+String(new Date().getHours()).padStart(2, '0')+":"+String(new Date().getMinutes()).padStart(2, '0')+":"+String(new Date().getSeconds()).padStart(2, '0')+ "\n", (err, item) => {
      if(err){
        resolve({logged: false, error: err});
      } else {
        resolve({logged: true, error: null});
      }
    })
  })
}
