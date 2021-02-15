module.exports = class Node {
    constructor(name, path, isFile = false) {
        this.name = name;
        this.path = path;
        this.size = 0;
        this.isRoot = false;
        this.type = 'application/octet-stream';

        this._isFile = isFile;
    }

    isDirectory() {
        return !this._isFile;
    }

    isFile() {
        return this._isFile;
    }

    toJSON() {
        return {
            name: this.name,
            path: this.path,
            size: this.size,
            type: this.type,
            isRoot: this.isRoot,
            isFile: this.isFile(),
            isDirectory: this.isDirectory(),
        };
    }
}