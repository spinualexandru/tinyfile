import {Compressor} from "./compressor.ts";

export class FileManager {
    element: HTMLDivElement;
    fileElement: HTMLInputElement;
    fileLabelElement: HTMLLabelElement;
    submitButton: HTMLButtonElement;
    downloadButton: HTMLButtonElement;
    outputMessageElement: HTMLDivElement;
    file: File | null = null;
    compressedFile: File | Blob | null = null;
    compressor: Compressor;

    constructor(_element: HTMLDivElement) {
        this.element = _element;
        this.submitButton = document.querySelector('.compress') as HTMLButtonElement;
        this.fileElement = _element.querySelector('#file') as HTMLInputElement;
        this.fileLabelElement = _element.querySelector('label') as HTMLLabelElement;
        this.downloadButton = document.querySelector('.download') as HTMLButtonElement;
        this.outputMessageElement = document.querySelector('.output-message') as HTMLDivElement;
        this.compressor = new Compressor(new File([], ''));

    }

    setupEvents() {
        this.fileElement.addEventListener('change', this.onFileSelected.bind(this));
        this.submitButton.addEventListener('click', this.onSubmit.bind(this));
        this.downloadButton.addEventListener('click', this.onDownload.bind(this));
    }

    clear() {
        this.fileElement.value = '';
        this.fileLabelElement.innerHTML = 'Choose a file';
        this.downloadButton.disabled = true;
        this.downloadButton.style.display = 'none';
        this.submitButton.innerHTML = 'Compress';
        this.file = null;
        this.compressedFile = null;
    }

    setup() {
        this.setupEvents();
        this.clear();
    }


    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.fileLabelElement.innerHTML = file.name;
            this.file = file;
            this.compressor.changeFile(file)
        }
    }

    onSubmit() {
        const file = this.file;
        if (file) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = 'Compressing...';
            this.compressor.compress().then((compressedFile) => {
                this.compressedFile = compressedFile;
                this.downloadButton.disabled = false;
                this.downloadButton.style.display = 'flex';
                this.submitButton.innerHTML = 'Submit';
                this.submitButton.disabled = false;
                this.outputMessageElement.innerHTML = `File compressed successfully by ${Math.round((100 - (compressedFile.size / file.size) * 100))}%
                    </br>Old size: ${Math.round(file.size / 1000)}kb
                    </br>New size: ${Math.round(compressedFile.size / 1000)}kb
                `;

            })
        }
    }

    onDownload() {
        const file = this.compressedFile;
        if (file) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.download = `${this.compressor.file.name}.compressed.${this.compressor.fileFormat}`;
            link.click();
        }
    }
}