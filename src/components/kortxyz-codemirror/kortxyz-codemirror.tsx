import { Component, Host, Prop, Element, Event, EventEmitter, h } from '@stencil/core';

import { basicSetup } from "codemirror";

import { linter } from "@codemirror/lint";
import { EditorView, hoverTooltip } from "@codemirror/view";
import { json, jsonParseLinter } from "@codemirror/lang-json";

import Color from 'color';


@Component({
  tag: 'kortxyz-codemirror',
  styleUrl: 'kortxyz-codemirror.css',
  shadow:true,
})

export class KortxyzCodemirror {
  @Element() codemirrorEl: HTMLElement;
  editorView;

  @Prop({ mutable: true }) doc: any;

  @Event() docChanged: EventEmitter;

  myTheme = EditorView.theme({
    ".cm-tooltip": {
      background: "white",
      border: "none",
      "box-shadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    },
    ".cm-tooltip > input": {
      "border-radius": "15px",
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      "appearance": "none",
      "background-color": "transparent",
      "border": "none",
      "cursor": "pointer",
     
    }
  })

  wordHover = hoverTooltip((view, pos, side) => {
    let { from, to, text } = view.state.doc.lineAt(pos)

    let start = pos, end = pos
    while (start > from && text[start - from - 1] != "\"") start--
    while (end < to && text[end - from] != "\"") end++

    if (start == pos && side < 0 || end == pos && side > 0) return null
    else {
      const color = text.slice(start - from, end - from)

      if (CSS.supports('color', color)) {
        let colorString = Color(color)
        return {
          pos: start,
          end,
          create(view) {
            let dom = document.createElement("input");
           // dom.style.cssText= "background-color: transparent;border: none;appearance: none;cursor: pointer;-webkit-appearance: none;-moz-appearance: none;";
            dom.type = "color";
            dom.value = colorString.hex();

            dom.oninput = (e) => {
              view.dispatch({
                changes: { from: start, to: end, insert: (e.target as HTMLInputElement).value }
              })
              end = start + 7;
            }

            return { dom }
          }
        }
      }
    }

  })

  updateEvent = EditorView.updateListener.of(async (v) => {
    if (v.docChanged) {
      this.docChanged.emit(JSON.parse(v.state.doc.toString()));
      }
  })

  connectedCallback() {
    this.editorView = new EditorView({
      doc: "",
      extensions: [this.myTheme,basicSetup, json(), linter(jsonParseLinter()), this.updateEvent, this.wordHover],
      parent: this.codemirrorEl
    });

    window["editorView"] = this.editorView;

    (this.codemirrorEl.children[0] as HTMLElement).style.width = "100%";
    (this.codemirrorEl.children[0] as HTMLElement).style.height = "100%";
  }

  componentWillRender() {
    this.editorView.dispatch({
      changes: { from: 0, to: this.editorView.state.doc.length, insert: JSON.stringify(this.doc, null, 2) }
    })
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
