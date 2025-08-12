import { Component, Listen, Event, EventEmitter, Host, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-dragoverlay',
  styleUrl: 'kortxyz-dragoverlay.css',
  shadow: true,
})
export class KortxyzDragoverlay {

  /** target variable to be sendt with the fileDropped event*/
  @Prop() target;

  @State() visible = false;

  @Event() fileDropped: EventEmitter;

  @Listen('dragover', { passive: false })
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  @Listen('dragenter', { passive: false })
  onDragStart() {
    this.visible = true;
  }

  @Listen('dragleave', { target: 'window' })
  onDragEnd() {
    this.visible = false;
  }


  @Listen('drop', { passive: false })
  onDrop(e: DragEvent) {
    e.preventDefault();

    if (e.dataTransfer.items) {
      Array.from(e.dataTransfer.items).forEach(async (item) => {
        if (item.kind === "file") this.fileDropped.emit({ file: item.getAsFile(), target: this.target });
      });
    }
    else {
      Array.from(e.dataTransfer.files).forEach((file) => this.fileDropped.emit({ file, target: this.target }));
    }
    this.visible = false;

  }

  render() {
    return (
      <Host class={this.visible ? 'active' : ''}></Host>
    );
  }
}
