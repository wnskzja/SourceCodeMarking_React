import React, { Component } from "react";
import "./Home.scss";
import { Controlled as CodeMirror } from "react-codemirror2";
// import Pusher from "pusher-js";
import pushid from "pushid";
import { withAxios } from "../../axios/index";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Grid } from "@material-ui/core";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ActionTitle, ActionWrapper } from "./Action.style.js";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const theme = createMuiTheme({
  overrides: {
    MuiCollapse: {
      entered: {
        height: "auto",
        overflow: "hidden",
      },
    },
  },
});

const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  selectedComment: {
    backgroundColor: "blue",
  },
});

const ExpansionPanel = withStyles({
  root: {
    width: "100%",
    backgroundColor: "white",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: "white",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: 1,
    minHeight: 30,
    height: 40,
    "&$expanded": {
      minHeight: 40,
    },
  },
  content: {
    height: "100%",
    "&$expanded": {
      margin: "11px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      html: "",
      css: "",
      js: "",
      comments: [],
      coordinateSelectText: {
        anchor: {},
        head: {},
      },
      isCommit: false,
      expandComments: [],
      isEditCommentIcon: false,
      isEditCommentBtn: false,
      isDeleteCommentBtn: false,
      editComment: {
        id: "",
        content: "",
        isEdit: false,
      },
      selectedCommentHTML: {},
      selectedCommentObj: {
        start_line: {},
        end_line: {},
      },
    };
  }
  componentDidMount() {
    this.getDataFromServer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isCommit !== this.state.isCommit) {
      this.getDataFromServer();
      this.setState({
        isCommit: false,
      });
    } else if (prevState.editComment !== this.state.editComment) {
      if (this.state.isEditCommentIcon) {
        const { editComment } = this.state;
        const { id, content } = editComment;
        document.getElementById(`editCommentTextAread-${id}`).value = content;
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.isEditCommentBtn !== nextState.isEditCommentBtn ||
      this.state.isDeleteCommentBtn !== nextState.isDeleteCommentBtn
    ) {
      const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
      cm.setValue("");
      this.getDataFromServer();
      this.setState({
        isEditCommentBtn: false,
      });
    }
  }

  getDataFromServer = () => {
    const { axios } = this.props;
    const fileID = "b5dd7c6e-40b6-4ca2-a8c1-f3a0a734e6e8";
    const header = {
      "Content-Type": "application/json",
    };

    axios
      .get(`/files/${fileID}`, {
        headers: header,
      })
      .then((response) => {
        const { data, comments } = response.data;
        this.setState({
          html: data,
          id: fileID,
          comments: comments,
        });

        if (comments) {
          comments.forEach((comment) => {
            const { start_line, end_line } = comment;
            this.highlighText({ start_line, end_line });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

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
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      this.setState({
        html: reader.result,
      });
    };
  };

  highlighText = ({ start_line, end_line }) => {
    const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
    const doc = cm.getDoc();

    doc.markText(
      { line: start_line.row, ch: start_line.column },
      { line: end_line.row, ch: end_line.column },
      { className: "styled-background" }
    );
  };

  handleClickSubmitComment = ({ anchor, head }) => {
    const { id } = this.state;
    const { axios } = this.props;
    const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
    const doc = cm.getDoc();

    let rowStart = anchor.line,
      colStart = anchor.ch,
      rowEnd = head.line,
      colEnd = head.ch;

    const valObjComment = document.getElementById("commentTextAread").value;

    const commentContent = valObjComment;
    const data = {
      file_id: id,
      content: commentContent,
      start_line: {
        row: rowStart,
        column: colStart,
      },
      end_line: {
        row: rowEnd,
        column: colEnd,
      },
    };
    const header = {
      "Content-Type": "application/json",
    };

    axios
      .post("/comments", data, {
        headers: header,
      })
      .then((response) => {
        document.getElementById("commentTextAread").value = "";
        doc.markText(
          { line: rowStart, ch: colStart },
          { line: rowEnd, ch: colEnd },
          { className: "styled-background" }
        );
        this.setState({
          isCommit: true,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  jumpToLine = ({ start_line, end_line }) => {
    const startPosition =
      start_line.row <= end_line.row ? start_line.row : end_line.row;
    const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
    var t = cm.charCoords({ line: startPosition, ch: 0 }, "local").top;
    cm.scrollTo(null, t);
  };

  handleEditStatusComment = ({ id, content }) => {
    this.setState({
      isEditCommentIcon: true,
      editComment: {
        id: id,
        content: content,
        isEdit: true,
      },
    });
  };

  handleEditComment = ({ idComment }) => {
    const { axios } = this.props;

    const header = {
      "Content-Type": "application/json",
    };

    const { id, coordinateSelectText } = this.state;
    const { anchor, head } = coordinateSelectText;

    let rowStart = anchor.line,
      colStart = anchor.ch,
      rowEnd = head.line,
      colEnd = head.ch;

    const editedComment = document.getElementById(
      `editCommentTextAread-${idComment}`
    ).value;

    const data = {
      file_id: id,
      content: editedComment,
      start_line: {
        row: rowStart,
        column: colStart,
      },
      end_line: {
        row: rowEnd,
        column: colEnd,
      },
    };

    axios
      .put(`/comments/${idComment}`, data, {
        headers: header,
      })
      .then((response) => {
        const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
        const doc = cm.getDoc();
        doc.markText(
          { line: rowStart, ch: colStart },
          { line: rowEnd, ch: colEnd },
          { className: "styled-background" }
        );

        document.getElementById(`editCommentTextAread-${idComment}`).value = "";
        this.setState({
          isEditCommentIcon: false,
          isEditCommentBtn: true,
          editComment: {
            id: idComment,
            content: "",
            isEdit: false,
          },
        });

        alert("Edit successfully");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  handleCancelEditComment = (idComment) => {
    document.getElementById(`editCommentTextAread-${idComment}`).value = "";
    this.setState({
      isEditCommentIcon: false,
      editComment: {
        id: idComment,
        content: "",
        isEdit: false,
      },
    });
  };

  handleDeleteComment = (idComment) => {
    const { axios } = this.props;
    const header = {
      "Content-Type": "application/json",
    };

    axios
      .delete(`/comments/${idComment}`, {
        headers: header,
      })
      .then((response) => {
        this.setState({
          isCommit: true,
          isDeleteCommentBtn: true,
        });
        alert("Delete comment successfully");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  handleChangeComment = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        expanded: !prevState.expanded,
      };
    });
  };

  handleDisabledExpandExpandPanelComment = (e, comment) => {
    const { expandComments } = this.state;

    if (expandComments.length !== 0) {
      console.log(expandComments);
      expandComments.forEach((expandComment) => {
        const { commentExpand } = expandComment;
        if (commentExpand.id !== comment.id) {
          const objExpandComment = {
            commentExpand: comment,
          };

          const newExpandCommentList = expandComments;
          newExpandCommentList.push(objExpandComment);
          console.log(newExpandCommentList);
          this.setState({
            expandComments: newExpandCommentList,
          });
        } else {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    } else {
      const objExpandComment = [
        {
          commentExpand: comment,
        },
      ];
      this.setState({
        expandComments: objExpandComment,
      });
    }
  };

  handleSetStartLineAndEndLine = ({ start_line, end_line }) => {
    let result = {
      start_line: { row: start_line.line, column: start_line.ch },
      end_line: { row: end_line.line, column: end_line.ch },
    };

    return result;
  };

  handleScrollToViewListComment = ({ start_line, end_line }) => {
    const { selectedCommentHTML } = this.state;
    const listComments = document.querySelectorAll(".expand-summary-comment");
    let isChangeSelectedComment = false;
    listComments.forEach((comment, i) => {
      const valueComment = comment.getAttribute("value");
      const arrCoordinateComment = valueComment.split("-");
      const rowStart = parseInt(arrCoordinateComment[0].split(":")[1]);
      const colStart = parseInt(arrCoordinateComment[1].split(":")[1]);
      const rowEnd = parseInt(arrCoordinateComment[2].split(":")[1]);
      const colEnd = parseInt(arrCoordinateComment[3].split(":")[1]);
      const cursorRowStart = start_line.line + 1;
      const cursorColStart = start_line.ch + 1;
      const cursorRowEnd = end_line.line + 1;
      const cursorColEnd = end_line.ch + 1;
      if (
        (rowStart <= cursorRowStart &&
          cursorRowStart <= rowEnd &&
          rowStart <= cursorRowEnd &&
          cursorRowEnd <= rowEnd) ||
        (cursorRowStart === rowStart &&
          rowStart === rowEnd &&
          colStart <= cursorColStart &&
          cursorColStart <= colEnd &&
          colStart <= cursorColEnd &&
          cursorColEnd <= colEnd)
      ) {
        console.log("AA");
        if (
          selectedCommentHTML !== undefined &&
          selectedCommentHTML.classList !== undefined
        ) {
          selectedCommentHTML.classList.remove("selected-comment");
          isChangeSelectedComment = true;
        }
        comment.classList.add("selected-comment");
        const fixCoordinateComment = this.handleSetStartLineAndEndLine({
          start_line: start_line,
          end_line: end_line,
        });
        this.setState({
          selectedCommentHTML: comment,
          selectedCommentObj: {
            start_line: fixCoordinateComment.start_line,
            end_line: fixCoordinateComment.end_line,
          },
        });
        comment.scrollIntoView({ behavior: "smooth" });
      }
    });

    if (
      selectedCommentHTML !== undefined &&
      selectedCommentHTML.classList !== undefined &&
      !isChangeSelectedComment
    ) {
      selectedCommentHTML.classList.remove("selected-comment");
    }
  };

  isSelectedCommentInCodeMirror = ({ selectedComment, currentComment }) => {
    const currentStartLine = currentComment.start_line,
      currentEndLine = currentComment.end_line,
      selectedStartLine = selectedComment.start_line,
      selectedEndLine = selectedComment.end_line;
    let isSelectedComment = false;
    if (
      currentStartLine.row <= selectedStartLine.row &&
      selectedStartLine.row <= currentEndLine.row &&
      currentStartLine.row <= selectedEndLine.row &&
      selectedEndLine.row <= currentEndLine.row &&
      currentStartLine.column <= selectedStartLine.column &&
      selectedStartLine.column <= currentEndLine.column &&
      currentStartLine.column <= selectedEndLine.column &&
      selectedEndLine.column <= currentEndLine.column
    ) {
      isSelectedComment = true;
    }
    return isSelectedComment;
  };

  renderListComment = () => {
    const { id, comments, editComment, selectedCommentObj } = this.state;
    const { classes } = this.props;
    const listComment = [];
    if (comments) {
      comments.forEach((comment, index) => {
        const { start_line, end_line } = comment;
        const commentStartAt =
          start_line.row <= end_line.row ? start_line : end_line;
        const commentEndAt =
          start_line.row > end_line.row ? start_line : end_line;
        const durationLine =
          commentStartAt.row === commentEndAt.row
            ? commentStartAt.row + 1
            : `${commentStartAt.row + 1} - ${commentEndAt.row + 1}`;

        const isSelectComment = this.isSelectedCommentInCodeMirror({
          selectedComment: selectedCommentObj,
          currentComment: comment,
        })
          ? "selected-comment"
          : "";

        listComment.push(
          <li
            key={`wrap-comment-li-${index + 1}-${id}`}
            className={"classes.listSection"}
            onClick={() => this.jumpToLine({ start_line, end_line })}
          >
            <ul
              key={`wrap-comment-ul-${index + 1}-${id}`}
              className={classes.ul}
            >
              <ListItem key={`wrap-comment-listitem-${index + 1}-${id}`}>
                <ThemeProvider theme={theme}>
                  <ExpansionPanel square className="Action">
                    <ExpansionPanelSummary
                      className={`expand-summary-comment ${isSelectComment}`}
                      value={`RS: ${commentStartAt.row + 1} - CS: ${
                        commentStartAt.column + 1
                      } - RE: ${commentEndAt.row + 1} - CE: ${
                        commentEndAt.column + 1
                      }`}
                    >
                      <ActionTitle
                        className="Asset_Comment_Title"
                        key={`${id}-${comment.id}-comment-title-${index + 1}`}
                        p={1}
                        flexGrow={1}
                        onClick={(e) => this.handleChangeComment(e)}
                      >
                        {`Commnet ${index + 1}: (Line ${durationLine})`}
                      </ActionTitle>
                      <ActionTitle
                        className="Asset_area_edit_comment_Title"
                        key={`${id}-${comment.id}-area-edit-comment-${
                          index + 1
                        }`}
                        onClick={(e) =>
                          this.handleDisabledExpandExpandPanelComment(
                            e,
                            comment
                          )
                        }
                      >
                        <ListItemIcon className="wrap-update-delete">
                          <EditIcon
                            className="btn-edit-comment"
                            onClick={() =>
                              this.handleEditStatusComment({
                                id: comment.id,
                                content: comment.content,
                              })
                            }
                          />
                          <DeleteIcon
                            className="btn-delete-comment"
                            onClick={() => this.handleDeleteComment(comment.id)}
                          />
                        </ListItemIcon>
                      </ActionTitle>
                    </ExpansionPanelSummary>
                    {editComment.id !== comment.id ||
                    editComment.isEdit === false ? (
                      <ActionWrapper>{`${comment.content}`}</ActionWrapper>
                    ) : (
                      <ActionWrapper>
                        <Grid container className="wrap-edit-comment-area">
                          <Grid item xs={12}>
                            <textarea
                              id={`editCommentTextAread-${comment.id}`}
                              name={`editCommentTextAread-${comment.id}`}
                              rows="3"
                              cols="34"
                            ></textarea>
                          </Grid>
                          <Grid item xs={12}>
                            <button
                              className="btn-cancel-comment"
                              onClick={() =>
                                this.handleCancelEditComment(comment.id)
                              }
                            >
                              {" "}
                              Cancel{" "}
                            </button>
                            <button
                              className="btn-edit-comment"
                              onClick={() =>
                                this.handleEditComment({
                                  idComment: comment.id,
                                })
                              }
                            >
                              {" "}
                              Edit{" "}
                            </button>
                          </Grid>
                        </Grid>
                      </ActionWrapper>
                    )}
                  </ExpansionPanel>
                </ThemeProvider>
              </ListItem>
            </ul>
          </li>
        );
      });
    }

    const wrapperListComment = [];
    wrapperListComment.push(
      <List
        key={`wrap-list-book-${id}`}
        className={classes.root}
        subheader={<li />}
      >
        {listComment}
      </List>
    );
    return wrapperListComment;
  };

  render() {
    const { html, coordinateSelectText, editComment } = this.state;
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
                  value={html}
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
                    const { ranges } = data;
                    let resStartLine = ranges[0].anchor,
                      resEndLine = ranges[0].head;
                    if (
                      resStartLine.line > resEndLine.line ||
                      (resStartLine.line === resEndLine.line &&
                        resStartLine.ch > resEndLine.ch)
                    ) {
                      resStartLine = ranges[0].head;
                      resEndLine = ranges[0].anchor;
                    }
                    this.setState({
                      coordinateSelectText: {
                        anchor: resStartLine,
                        head: resEndLine,
                      },
                    });

                    this.handleScrollToViewListComment({
                      start_line: resStartLine,
                      end_line: resEndLine,
                    });
                  }}
                />
              </Grid>
              <Grid className="wrap-list-comment" xs={3} item>
                <Grid>
                  <Grid container className="list-comment">
                    {this.renderListComment()}
                  </Grid>
                </Grid>
                <Grid className="wrap-box-comment" item>
                  <p>Comment:</p>
                  <textarea
                    id="commentTextAread"
                    name="commentTextAread"
                    rows="4"
                    cols="50"
                  ></textarea>
                  {(anchor.line === head.line && anchor.ch === head.ch) ||
                  editComment.isEdit ? (
                    <button
                      className="btn-commit-comment"
                      disabled={true}
                      onClick={() =>
                        this.handleClickSubmitComment({ anchor, head })
                      }
                    >
                      {" "}
                      Commit{" "}
                    </button>
                  ) : (
                    <button
                      className="btn-commit-comment"
                      onClick={() =>
                        this.handleClickSubmitComment({ anchor, head })
                      }
                    >
                      {" "}
                      Commit{" "}
                    </button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(withAxios(Home));
