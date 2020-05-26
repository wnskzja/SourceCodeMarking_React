import React, { Component } from "react";
import "./Home.scss";
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
      coordinateSelectText: {
        anchor: {},
        head: {},
      },
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

  handleClickSubmitComment = ({ anchor, head }) => {
    const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
    const doc = cm.getDoc();
    doc.markText(
      { line: anchor.line, ch: anchor.ch },
      { line: head.line, ch: head.ch },
      { className: "styled-background" }
    );
  };

  render() {
    const { html, coordinateSelectText } = this.state;
    const { anchor, head } = coordinateSelectText;

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
            <input type="file" onChange={(e) => this.selectFile(e)}></input>

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
                    const { ranges } = data;
                    const { anchor, head } = ranges[0];
                    this.setState({
                      coordinateSelectText: {
                        anchor: anchor,
                        head: head,
                      },
                    });
                  }}
                />
              </Grid>
              {anchor.line === head.line && anchor.ch === head.ch ? (
                ""
              ) : (
                <Grid xs={3} item>
                  <p>
                    Comment: (anchor: line {anchor.line} - ch {anchor.ch}, head:
                    line {head.line} - ch {head.ch})
                  </p>
                  <textarea
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                  ></textarea>
                  <button
                    onClick={() =>
                      this.handleClickSubmitComment({ anchor, head })
                    }
                  >
                    {" "}
                    Commit{" "}
                  </button>
                </Grid>
              )}
            </Grid>
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
