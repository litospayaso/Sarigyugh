const Client = require('ssh2-sftp-client');
const fs = require('fs');
const opn = require('opn');
const sftp = new Client();

let rootFiles = 0;
let assetsFiles = 0;

const connection = require(`${__dirname}\\connection.json`);

const sendFile = async () => {
  await fs.readdirSync(`${__dirname}\\dist\\salome`).forEach(async file => {
    rootFiles += 1;
    if (file !== 'assets') {
      await sftp.fastPut(`${__dirname}\\dist\\salome\\${file}`, `/salome/${file}`).catch((err) => {
        console.log(err, 'catch error');
      });
    }
  });
  await fs.readdirSync(`${__dirname}\\dist\\salome\\assets`).forEach(async file => {
    assetsFiles += 1;
    if (file !== 'portfolio.pdf') {
      await sftp.fastPut(`${__dirname}\\dist\\salome\\assets\\${file}`, `/salome/assets/${file}`).catch((err) => {
        console.log(err, 'catch error');
      });
    }
  });
  return true;
};

const deleteData = async (data, path) => {
  await data.forEach(async file => {
    rootFiles += 1;
    if (file.type !== 'd' && file.name !== 'portfolio.pdf') {
      await sftp.delete(`${path}/${file.name}`).catch((err) => {
        console.log(err, 'catch error');
      });
    }
  });
  return true;
};

sftp.connect(connection).then(() => {
  return sftp.list('/salome');
}).then(async (data) => {
  await deleteData(data, '/salome');
  return true;
}).then(() => {
  return sftp.list('/salome/assets');
}).then(async (data) => {
  await deleteData(data, '/salome/assets');
  return true;
}).then(async () => {
  await sendFile();
  return true;
}).then(() => {
  return sftp.list('/salome');
}).then((data) => {
  sftp.end();
  console.log('\x1b[32m%s\x1b[37m%s\x1b[0m', 'SUCCESS: ', `${rootFiles-1} Updated; ${assetsFiles} asset files`);
  opn('http://salomevilas.me');
  return true;
}).catch((err) => {
  console.log(err, 'catch error');
  sftp.end();
});
