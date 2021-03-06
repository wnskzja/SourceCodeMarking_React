import React, { Component } from "react";
import "./Home.scss";
import ListComment from "./ListComment/ListComment";
import { Controlled as CodeMirror } from "react-codemirror2";
import { withAxios } from "../../axios/index";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Grid } from "@material-ui/core";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loading from "../Loading/Loading";

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
      textareaComment: "",
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
      openDiaglog: false,
      mark: "",
      isLoading: true,
      errorMark: "",
      message: "",
      typeAlert: "",
      statusMark: false,
      name: "",
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
        this.setState({
          textareaComment: content,
        });
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
    const { axios, idFile } = this.props;
    const id = idFile;
    const fileID = id;
    const header = {
      "Content-Type": "application/json",
    };

    axios
      .get(`/files/${fileID}`, {
        headers: header,
      })
      .then((response) => {
        const { data, comments, name } = response.data;
        this.setState({
          html: data,
          id: fileID,
          comments: comments,
          isLoading: false,
          name: name,
        });

        if (comments) {
          comments.forEach((comment) => {
            const { start_line, end_line } = comment;
            this.highlighText({ start_line, end_line });
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
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

  handleTextAreaComment = (e) => {
    this.setState({
      textareaComment: e.target.value,
    });
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
          textareaComment: "",
          message: "Ghi chú thành công",
          typeAlert: ALERT_TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
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

        this.setState({
          message: "Sửa ghi chú thành công",
          typeAlert: ALERT_TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  handleExpandComments = (expandCommentsInList) => {
    this.setState({
      expandComments: expandCommentsInList,
    });
  };

  handleCancelEditComment = (idComment) => {
    if (document.getElementById(`editCommentTextAread-${idComment}`)) {
      document.getElementById(`editCommentTextAread-${idComment}`).value = "";

      this.setState({
        isEditCommentIcon: false,
        editComment: {
          id: idComment,
          content: "",
          isEdit: false,
        },
      });
    }
  };

  handleDeleteComment = (idComment) => {
    const { axios } = this.props;
    const header = {
      "Content-Type": "application/json",
    };
    this.setState({
      message: "",
    });
    axios
      .delete(`/comments/${idComment}`, {
        headers: header,
      })
      .then((response) => {
        this.setState({
          isCommit: true,
          isDeleteCommentBtn: true,
          message: "Xóa ghi chú thành công",
          typeAlert: ALERT_TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
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

  handleClose = () => {
    this.setState({ openDiaglog: false });
  };
  onChange = (e) => {
    this.setState({ mark: e.target.value });
  };
  submitMark = () => {
    const { id, mark } = this.state;
    if (mark) {
      if (parseFloat(mark) > 10 || parseFloat(mark) < 0) {
        this.setState({ errorMark: "Giá trị từ 0 đến 10" });
      } else {
        this.setState({ statusMark: true });
        const { axios } = this.props;
        this.setState({ message: "" });
        axios
          .patch(`/files/${id}`, {
            mark: parseFloat(mark),
          })
          .then((response) => {
            this.setState({
              message: "Nhập điểm thành công",
              typeAlert: ALERT_TYPE.SUCCESS,
              statusMark: false,
              openDiaglog: false,
            });
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.setState({ errorMark: "", mark: "" });
          });
      }
    } else {
      this.setState({ errorMark: "Vui lòng không bỏ trống" });
    }
  };

  render() {
    const {
      html,
      coordinateSelectText,
      editComment,
      openDiaglog,
      mark,
      id,
      comments,
      selectedCommentObj,
      isLoading,
      errorMark,
      message,
      typeAlert,
      statusMark,
      expandComments,
      textareaComment,
      name,
    } = this.state;
    const { anchor, head } = coordinateSelectText;
    const role = JSON.parse(localStorage.getItem("user")).role;

    const codeMirrorOptions = {
      mode: "javascript",
      autoCloseTags: true,
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
      readOnly: true,
    };

    return (
      <div className="App">
        <section className="playground">
          <Alert message={message} type={typeAlert} />
          <div className="code-editor html-code">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <h3>Tên file : {name}</h3>
                <Grid container>
                  <Grid item xs={7}>
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
                  <Grid className="wrap-list-comment" xs={5} item>
                    <h2 style={{ textAlign: "center" }}>Ghi chú</h2>
                    <Grid>
                      <Grid container className="list-comment">
                        <ListComment
                          id={id}
                          comments={comments}
                          editComment={editComment}
                          selectedCommentObj={selectedCommentObj}
                          handleEditStatusComment={this.handleEditStatusComment}
                          handleEditComment={this.handleEditComment}
                          handleCancelEditComment={this.handleCancelEditComment}
                          role={role}
                          handleDeleteComment={this.handleDeleteComment}
                          expandComments={expandComments}
                          handleExpandComments={this.handleExpandComments}
                        />
                      </Grid>
                    </Grid>
                    {role === "TEACHER" ? (
                      <Grid className="wrap-box-comment" item>
                        <textarea
                          id="commentTextAread"
                          name="commentTextAread"
                          rows="4"
                          cols="50"
                          onChange={this.handleTextAreaComment}
                        ></textarea>

                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.setState({ openDiaglog: true });
                            }}
                          >
                            Chấm điểm
                          </Button>

                          <Button
                            className="btn-commit-comment"
                            ariant="contained"
                            color="primary"
                            variant="contained"
                            disabled={
                              (anchor.line === head.line &&
                                anchor.ch === head.ch) ||
                              editComment.isEdit ||
                              textareaComment === ""
                            }
                            onClick={() =>
                              this.handleClickSubmitComment({ anchor, head })
                            }
                          >
                            {" "}
                            Ghi chú{" "}
                          </Button>
                        </>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              </>
            )}

            <Dialog
              open={openDiaglog}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Điểm bài tập</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Điểm"
                  type="number"
                  error={Boolean(errorMark)}
                  helperText={errorMark}
                  fullWidth
                  value={mark}
                  onChange={this.onChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="default">
                  Hủy
                </Button>
                <Button
                  onClick={this.submitMark}
                  color="primary"
                  variant="contained"
                  disabled={statusMark}
                >
                  {statusMark ? "Đang nhập" : "Nhập điểm"}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </section>
      </div>
    );
  }
}

Home.propTypes = {};
export default withAxios(withRouter(Home));
