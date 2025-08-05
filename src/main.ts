import './style.css'
import Logo from '/logo.png'
import {FileManager} from "./file-manager.ts";

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp', 'image/avif'];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://alexspinu.eu" target="_blank">
      <img src="${Logo}" class="logo" alt="logo" />
    </a>
    <h1 class="logo-text">tinyfile</h1>
    <p>Free file compressor, all on the browser.</p>
    <div class="file-picker">
        <input type="file" accept="${acceptedFileTypes}" id="file" />
        <label for="file">Choose a file</label>
        
    </div>
    <div class="card">
      <button class="button compress" type="button">Submit</button>
      <button class="button download" type="button"><span class="material-symbols-outlined">
download
</span>Download</button>

    </div>
    <div class="output-message"></div>
  </div>
`

const fileManager = new FileManager(document.querySelector<HTMLDivElement>('.file-picker')!);
fileManager.setup();
