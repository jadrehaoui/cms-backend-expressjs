export default async function getTime(){
  return new Promise((resolve, reject) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    var hh = String(new Date().getHours()).padStart(2,"0");
    var mn = String(new Date().getMinutes()).padStart(2,"0");
    var ss = String(new Date().getSeconds()).padStart(2,"0");
    var time = hh +":"+mn+":"+ss;
    resolve({date: today, time: time})
  })
}
