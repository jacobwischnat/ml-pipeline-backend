const {Storage, Bucket} = require('@google-cloud/storage');

const Node = require('../Node');

const isRoot = path => path === '/';
const appendFileToPath = (path, file) => path + (path.endsWith('/') ? '' : '/') + file;

module.exports = ({projectId, credentials} = {}) => {
    console.log({projectId, credentials});
    const storage = new Storage({projectId, credentials});

    console.log({storage});

    return {
        list: async (path) => {
            const [, bucketName, ...parts] = path.split('/');
            const root = isRoot(path);
            if (root) {
                let [buckets] = await storage.getBuckets();

                buckets = buckets.map(({name}) => {
                    const node = new Node(name, `/${name}`);
                    node.isRoot = true;

                    return node.toJSON();
                });

                return buckets;
            }

            const bucket = storage.bucket(bucketName);

            const [files] = await bucket.getFiles();

            return files.map(({name, metadata}) => {
                const node = new Node(name, appendFileToPath(path, name), !name.endsWith('/'));
                node.size = metadata.size;
                node.type = metadata.contentType;

                return node;
            });
        }
    };
};