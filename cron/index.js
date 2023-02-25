const cron = require('node-cron');
const Users =require("../api/models/user")
//const Backup = require('../mongodb_backup');

//Backup.dbAutoBackUp();
//meetingsCron.refreshSystemAuth();
//Runs every minute
cron.schedule('59 * * * * *',async()=>{
   let users=await Users.find()
   console.log("all usrs",users.length)
});

//Runs every hour
//cron.schedule('0 0 */1 * * *', () => Backup.dbAutoBackUp());
