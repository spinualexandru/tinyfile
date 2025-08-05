import CompressorJS from 'compressorjs';

export class Compressor {
    file: File;
    fileFormat = "";

    constructor(_file: File) {
        this.file = _file;
        const fileExt = this.getExtension();
        if (fileExt) {
            this.fileFormat = fileExt
        }

    }

    changeFile(_file: File) {
        this.file = _file;
        const fileFormat = this.getExtension();
        if (fileFormat) {
            this.fileFormat = fileFormat;
        }
    }

    getExtension() {
        return this.file.name.split('.').pop();
    }

    async compress(): Promise<File | Blob> {
        return await new Promise((resolve, reject) => {
            new CompressorJS(this.file, {
                quality: 0.6,
                convertSize: 1000,
                success: resolve,
                error: reject,
            });
        });
    }
}