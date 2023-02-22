const cron = require('node-cron');

const Backup = require('../mongodb_backup');

//Backup.dbAutoBackUp();
//meetingsCron.refreshSystemAuth();
//Runs every minute
cron.schedule('59 * * * * *',()=> Backup.dbAutoBackUp());

//Runs every hour
//cron.schedule('0 0 */1 * * *', () => Backup.dbAutoBackUp());
