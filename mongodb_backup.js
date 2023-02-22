const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;
const path = require('path');
// Concatenate root directory path with our backup folder.
const backupDirPath = path.join(__dirname, 'database-backup');
const Meta =require('./api/models/receiptMeta');

const dbOptions = {
  user: '',
  pass: '',
  host: 'localhost',
  port: 27017,
  database: 'cementAgencyV1',
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: backupDirPath
};

// return stringDate as a date object.
exports.stringToDate = dateString => {
  return new Date(dateString);
};

// Check if variable is empty or not.
exports.empty = mixedVar => {
  let undef, key, i, len;
  const emptyValues = [undef, null, false, 0, '', '0'];
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      return false;
    }
    return true;
  }
  return false;
};

// Auto backup function
exports.dbAutoBackUp = async() => {
  return new Promise((resolve,reject)=>{
  try{
  // check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    let date = new Date();
    let beforeDate, oldBackupDir, oldBackupPath;

    // Current date
    currentDate = this.stringToDate(date);
    let newBackupDir =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();

    // New backup path for current backup process
    let newBackupPath = dbOptions.autoBackupPath + '-mongodump-' + newBackupDir;
    // check for remove old backup after keeping # of days given in configuration
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      // Substract number of days to keep backup and remove old backup
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);
      oldBackupDir =
        beforeDate.getFullYear() +
        '-' +
        (beforeDate.getMonth() + 1) +
        '-' +
        beforeDate.getDate();
      // old backup(after keeping # of days)
      oldBackupPath = dbOptions.autoBackupPath + '-mongodump-' + oldBackupDir;
    }

    // Command for mongodb dump process
    //create dump file
    let cmd = 'mongodump --db=' + `${dbOptions.database}` + ' --host=' + `${dbOptions.host}` + ' --port='
    //   `${dbOptions.port}`

    //restore dump file
    // let cmd = 'mongorestore' + ' --host=' + `
    // ${dbOptions.host}` +
    // ' --port=' +
    // `${dbOptions.port} ./dump`

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      if (this.empty(error)) {
        // check for remove old backup after keeping # of days given in configuration.
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec('rm -rf ' + oldBackupPath, err => { });
          }
        }
        resolve(true)
        Meta.find().then(metadata=>{
          if(metadata.length)
          Meta.findByIdAndUpdate(metadata[0]._id,{lastDumpCreated:new Date()}).then(updateRes=>{
            console.log("dump crated on ---",new Date())
          })
        })
       
        
      }
    });
  }
}catch(err){
  console.log("backup dump error",err)
  reject(err)
}
})
};

exports.dbAutoRestore = () => {
  // check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    let date = new Date();
    let beforeDate, oldBackupDir, oldBackupPath;

    // Current date
    currentDate = this.stringToDate(date);
    let newBackupDir =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();

    // New backup path for current backup process
    let newBackupPath = dbOptions.autoBackupPath + '-mongodump-' + newBackupDir;
    // check for remove old backup after keeping # of days given in configuration
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      // Substract number of days to keep backup and remove old backup
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);
      oldBackupDir =
        beforeDate.getFullYear() +
        '-' +
        (beforeDate.getMonth() + 1) +
        '-' +
        beforeDate.getDate();
      // old backup(after keeping # of days)
      oldBackupPath = dbOptions.autoBackupPath + '-mongodump-' + oldBackupDir;
    }

  
    //restore dump file
    let cmd = 'mongorestore' + ' --host=' + `${dbOptions.host}` +' --port=' +`${dbOptions.port} ./dump`

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
      }
      if (this.empty(error)) {
        // check for remove old backup after keeping # of days given in configuration.
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec('rm -rf ' + oldBackupPath, err => { });
          }
        }
      }
    });
  }
};

exports.dumpUploadToLive = () => {
  return new Promise((res, rej) => {
    let cmd = 'mongorestore' + ' --uri=' + `mongodb+srv://uqair:programing1995@cluster0.933tk.mongodb.net ./dump`+" --drop"
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        rej(error)
      }
      else {
        res(true)
      }
    });
  })

}