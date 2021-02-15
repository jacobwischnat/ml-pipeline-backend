const {S3} = require("@aws-sdk/client-s3");
const mime = require('mime');

const Node = require('../Node');

module.exports = configuration => {
    const s3 = new S3({...configuration, timeout: 15000});

    return {
        create: async ({path, isFile, type, data}) => {
            const [Bucket, ..._path] = path.split('/').filter(v => v);

            console.log({Bucket});

            if (Bucket && !_path.length) {
                const result = await s3.createBucket({Bucket});
                console.log({result});
            }
        },
        list: async ({path}) => {
            if (path === '/') {
                const {Buckets} = await s3.listBuckets({});

                console.log(Buckets);

                return Buckets.map(({Name}) => {
                    const node = new Node(Name, `/${Name}`, false);

                    return node;
                });
            }

            // TODO: Factor in pagination here.
            const [Bucket, ..._path] = path.split('/').filter(v => v);
            if (Bucket && !_path.length) {
                let {Contents} = await s3.listObjects({Bucket});
                Contents = Contents || [];

                return [
                    new Node('..', '/', false),
                    ...Contents.map(({Key, Size}) => {
                        const isFile = !Key.endsWith('/');
                        const name = Key.split('/').join('');
                        const node = new Node(
                            name,
                            path.endsWith('/') ? path + Key : `${path}/${name}`,
                            isFile);

                        if (isFile) {
                            node.size = Size;
                            node.type = mime.getType(Key);
                        }

                        return node;
                    }).sort(node => node.isFile ? -1 : 1)
                ];
            } else {
                let Prefix = _path.join('/');
                Prefix = Prefix.startsWith('/') ? Prefix : `/${Prefix}`;
                let {Contents} = await s3.listObjects({Bucket, Prefix});
                Contents = Contents || [];

                const parentSubDir = _path.slice(0, _path.length - 2).join('/');
                const parentPath = `/${Bucket}${parentSubDir ? '/' : ''}${parentSubDir}`;

                return [
                    new Node('..', parentPath, false),
                    ...Contents.map(({Key, Size}) => {
                        const isFile = !Key.endsWith('/');
                        const name = Key.split('/').join('');
                        const node = new Node(
                            name,
                            path.endsWith('/') ? path + name : `${path}/${name}`,
                            isFile);

                        if (isFile) {
                            node.size = Size;
                            node.type = mime.getType(Key);
                        }

                        return node;
                    }).sort(node => node.isFile ? -1 : 1)
                ];
            }
        }
    }
};