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
        if (file !== 'assets'){
            await sftp.fastPut(`${__dirname}\\dist\\salome\\${file}`,`/salome/${file}`).catch((err) => {
                console.log(err, 'catch error');
            });
        }
    });
    await fs.readdirSync(`${__dirname}\\dist\\salome\\assets`).forEach(async file => {
        assetsFiles += 1;
        // if (file !== 'portfolio.pdf'){
            await sftp.fastPut(`${__dirname}\\dist\\salome\\assets\\${file}`,`/salome/assets/${file}`).catch((err) => {
                console.log(err, 'catch error');
            });
        // }
    });
    return true;
};

sftp.connect(connection).then(() => {
    return sftp.list('/');
}).then(() => {
    return sftp.rmdir('/salome',true);
}).then(() => {
    return sftp.mkdir('/salome');
}).then(() => {
    return sftp.mkdir('/salome/assets');
}).then(async() => {
    await sendFile();
    return true;
}).then(() => {
    return sftp.list('/salome');
}).then((data) => {
    sftp.end();
    if (data.length === rootFiles){
        console.log('\x1b[32m%s\x1b[37m%s\x1b[0m','SUCCESS: ', `${rootFiles-1} Updated; ${assetsFiles} asset files`);
        opn('http://salomevilas.me');
    }else{
        console.log(data);
        console.log('\x1b[31m%s\x1b[37m%s\x1b[0m','ERROR: ','No all data were uploaded');
    }
    return true;
}).catch((err) => {
    console.log(err, 'catch error');
    sftp.end();
});
