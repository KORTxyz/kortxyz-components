import { Component, Host, Prop, Element, State, Method, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-list',
  styleUrl: 'kortxyz-list.css',
  shadow: true,
})
export class KortxyzList {
  private fileInput?: HTMLInputElement;
  private gridEl?: HTMLDivElement;

  @Element() listEl: HTMLElement;

  /** Url to the API that returns the list */
  @Prop() data;
  /** Object in the response that contains the list */
  @Prop() group;

  /** Variable to use for header*/
  @Prop() header;
  /** Variable to use for title*/
  @Prop() name;
  /** Variable to use for description*/
  @Prop() description;


  /** Show a tile for uplaoding files to the data path*/
  @Prop() uploadtile: boolean = false;
  /** Which file will be accepted */
  @Prop() accept;

  @State() items: any = [];

  @Method()
  async addUploadingTile(name, file: File) {
    const tpl = document.createElement("template");
    tpl.innerHTML = `
      <div class="bg-neutral-200 text-neutral-400 p-5 h-60 hover:bg-neutral-100 flex flex-col">      
        <div class="text-xs mb-2 capitalize"></div>
        <div class="text-neutral-800 hover:underline shrink-0 text-xl mb-4 font-bold truncate pr-5">${name}</div>
        <div class="pr-5 text-sm overflow-clip" title="">Uploading...</div>
        <div class="w-full bg-gray-300 rounded-full h-2.5">
          <div id="progressbar" class="bg-blue-600 h-2.5 rounded-full" style="width:0%"></div>
        </div>
      </div>
    `;

    const el = tpl.content.firstElementChild;
    this.gridEl.lastElementChild.insertAdjacentElement('beforebegin', el);

    let progressbar: HTMLDivElement = el.querySelector("#progressbar")

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.data, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("X-filename", name);
    
    xhr.upload.onprogress = e => e.lengthComputable && (progressbar.style.width = (e.loaded / e.total * 100) + "%");


    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const result = JSON.parse(xhr.responseText)
        this.items = [...this.items, result];
      } else {
        console.error("Error", xhr.status, xhr.responseText);
      }
      el.remove();
    };

    xhr.onerror = () => console.error("Network error: request was aborted or connection lost");

    xhr.send(file);
  }

  async uploadFiles() {
    for (const file of Array.from(this.fileInput.files)) {
      this.addUploadingTile(file.name, file)
    }
  }

  async componentDidLoad() {
    const res = await fetch(this.data);
    const json = await res.json();
    this.items = json[this.group];
  }

  render() {
    return (
      <Host>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 gap-4 p-4 bg-neutral-800" ref={el => this.gridEl = el}>
          {this.items.map((item) => (
            <a class="bg-neutral-700 text-neutral-400 pl-5 pt-5 h-60 hover:cursor-pointer hover:bg-neutral-600 flex flex-col" href={item?.links.find(e => e.rel == 'alternate').href} >
              <div class="text-xs mb-2 capitalize">{item[this.header]}</div>
              <div class="text-neutral-100 hover:underline shrink-0 text-xl mb-4 font-bold truncate pr-5" title={item[this.name]}>{item[this.name]}</div>
              <div class="pr-5 text-sm overflow-clip" title="">{item[this.description] || 'No description'}</div>
              <div class="flex-1"></div>
              <div class="flex justify-end">
                {item.links.map((link) => {
                  if (!["self", "alternate"].includes(link.rel) && link.type == "text/html") {
                    return <a title={link.rel} class="fill-neutral-300 hover:fill-neutral-50" href={link.href}><kortxyz-icon class="h-4 w-4 m-2" icon={link.rel}></kortxyz-icon></a>
                  }
                })
                }
              </div>
            </a>
          ))}

          <slot></slot>

          {this.uploadtile && (
            <label htmlFor="dropzone-file"
              class="bg-neutral-200 text-neutral-400 pl-5 pt-5 h-60 hover:cursor-pointer hover:bg-neutral-100 flex flex-col"
            >
              <div class="h-full flex flex-col items-center justify-center pt-5 pb-6">
                <kortxyz-icon class="fill-neutral-400" size="32" icon="layers" />
                <p class="mb-2 text-sm font-semibold">
                  Click to upload {this.group}
                </p>
              </div>
              <input
                id="dropzone-file"
                multiple
                type="file"
                class="hidden"
                ref={el => (this.fileInput = el)}
                onChange={() => this.uploadFiles()}
                accept={this.accept}
              />
            </label>
          )}        </div>
      </Host>
    );
  }
}
