import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

import { EditorState } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine, lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';
import { foldGutter } from "@codemirror/language";

import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark'
import { linter, Diagnostic } from "@codemirror/lint";

import { getStore } from '../../utils/store';

@Component({
  tag: 'kortxyz-codemirror',
  styleUrl: 'kortxyz-codemirror.css',
  shadow: true,
})
export class KortxyzCodemirror {
  private editorContainer!: HTMLDivElement;
  private editorView!: EditorView;
  private updated = false;

  @Prop() store: string;

  /** Initial code value */
  @Prop({ mutable: true }) value: string = '';

  /** Language (only "javascript" in this example, but you can add more) */
  @Prop() language: string = 'javascript';

  /** Theme: "light" or "dark" */
  @Prop() theme: string = 'dark';

  /** Emits when content changes */
  @Event() valueChange: EventEmitter<string>;

  jsonLint = linter((view) => {
    const diagnostics: Diagnostic[] = [];
    let geojson;

    try {
      geojson = JSON.parse(view.state.doc.toString());
    } catch (e: any) {
      const match = /position (\d+)/.exec(e.message);
      const pos = match ? Number(match[1]) : 0;
      diagnostics.push({
        from: pos,
        to: pos,
        severity: "error",
        message: e.message,
      });
    }
    if (diagnostics.length == 0 && this.updated) this.updateStore(geojson)
    return diagnostics;

  }, { delay: 300 });


  updateStore(geojson) {
    console.log(geojson)
    getStore(this.store).set("lastOrigin", "code")
    getStore(this.store).set("data", geojson)
    this.updated = false;
  }


  async componentWillLoad() {
    if (this.store) {
      let datastore;
      while ((datastore = getStore(this.store)) == undefined || !datastore.get("data").features.length) await new Promise(r => setTimeout(r, 200));
      this.value = JSON.stringify(datastore.get("data"), null, 3);

      datastore.onChange("data", (e) => {
        if (datastore.get("lastOrigin") != "code") {
          this.value = JSON.stringify(e, null, 3);
          this.editorView.dispatch({
            changes: {
              from: 0,
              to: this.editorView.state.doc.length,
              insert: this.value,
            }
          });
        }
      })

    }
  }

  async componentDidLoad() {
    this.editorView = new EditorView({
      state: EditorState.create({
        doc: this.value,
        extensions: [
          keymap.of(defaultKeymap),
          lineNumbers(),        // Explicit line numbers
          foldGutter(),         // Fold arrows in gutter
          highlightActiveLine(),
          json(),
          this.jsonLint,
          vsCodeDark,
          EditorView.domEventHandlers({
            keyup: () => {
              this.updated = true;
            },
          })
        ],
      }),
      parent: this.editorContainer,
    });
  }

  render() {
    return (
      <div
        ref={el => (this.editorContainer = el)}
      />
    );
  }
}
