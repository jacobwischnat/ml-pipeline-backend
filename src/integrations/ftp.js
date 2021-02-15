const FTPClient = require('ftp');

const connect = (ftp, configuration) => new Promise((resolve, reject) => {
    ftp.once('ready', () => resolve());
    ftp.once('error', ex => reject(ex));

    ftp.connect(configuration);
});

const list = (ftp, path) => new Promise((resolve, reject) => ftp.list(path, (error, ...result) => {
    if (error) return reject(error);

    console.log(result);

    resolve(...result);
}));

module.exports = configuration => {
    const ftp = new FTPClient();

    console.log({configuration});

    return {
        list: async (path) => {
            console.log({path});
            await connect(ftp, configuration);
            const items = await list(ftp, path);

            return items;
        }
    };
}