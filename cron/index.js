const cron = require('node-cron');
const Users =require("../api/models/user")
const axios =require("axios")
//const Backup = require('../mongodb_backup');

//Backup.dbAutoBackUp();
//meetingsCron.refreshSystemAuth();
//Runs every minute
cron.schedule('59 * * * * *',async()=>{
   let users=await Users.find()
    let server=await axios.get("https://miss-managment-system-server.onrender.com/test")
   console.log("all usrs",users.length,server.data)
});

//Runs every hour
//cron.schedule('0 0 */1 * * *', () => Backup.dbAutoBackUp());
