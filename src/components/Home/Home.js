import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
// import Pusher from "pusher-js";
import pushid from "pushid";
// import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Grid } from "@material-ui/core";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      html: "",
      css: "",
      js: "",
    };
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.setState({
      id: pushid(),
    });
  }

  updateCodeMirror = (data) => {
    const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
    const doc = cm.getDoc();
    const value = doc.getSelection();
    const startCursor = doc.getCursor();
    const lineStartCursor = startCursor.line;
    const chStartCursor = startCursor.ch;

    doc.setCursor({ line: lineStartCursor, ch: chStartCursor + value.length });
  };

  selectFile = (e) => {
    console.log(e.target.files);

    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      this.setState({
        html: reader.result,
      });
    };
  };
  render() {
    const { html } = this.state;
    const codeMirrorOptions = {
      mode: "javascript",
      autoCloseTags: true,
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };

    return (
      <div className="App">
        <section className="playground">
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <button onClick={this.updateCodeMirror}> Bold </button>
            <Grid container>
              <Grid item xs={9}>
                <CodeMirror
                  className="CodeMirrora"
                  style={{ height: "800px" }}
                  value={html}
                  id="code"
                  options={{
                    mode: "htmlmixed",
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, html) => {
                    this.setState({ html });
                  }}
                  selection={{
                    ranges: [
                      {
                        anchor: { ch: 0, line: 0 },
                        head: { ch: 1, line: 1 },
                      },
                    ],
                    focus: true, // defaults false if not specified
                  }}
                  onSelection={(editor, data) => {
                    console.log(data);
                  }}
                />
              </Grid>
              <Grid xs={3} item>
                <p>Comment</p>
                <input type="file" onChange={(e) => this.selectFile(e)}></input>
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
