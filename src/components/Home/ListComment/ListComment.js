import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ActionTitle, ActionWrapper } from "../Action.style.js";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Grid } from "@material-ui/core";
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

const ListComment = (props) => {
  const isSelectedCommentInCodeMirror = ({
    selectedComment,
    currentComment,
  }) => {
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

  const jumpToLine = ({ start_line, end_line }) => {
    const startPosition =
      start_line.row <= end_line.row ? start_line.row : end_line.row;
    const cm = document.getElementsByClassName("CodeMirror")[0].CodeMirror;
    var t = cm.charCoords({ line: startPosition, ch: 0 }, "local").top;
    cm.scrollTo(null, t);
  };

  const handleDisabledExpandExpandPanelComment = (e, comment) => {
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

  const renderListComment = () => {
    const { id, comments, editComment, selectedCommentObj, classes } = props;
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

        const isSelectComment = isSelectedCommentInCodeMirror({
          selectedComment: selectedCommentObj,
          currentComment: comment,
        })
          ? "selected-comment"
          : "";

        listComment.push(
          <li
            key={`wrap-comment-li-${index + 1}-${id}`}
            className={classes.listSection}
            onClick={() => jumpToLine({ start_line, end_line })}
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
                      >
                        {`Commnet ${index + 1}: (Line ${durationLine})`}
                      </ActionTitle>
                      <ActionTitle
                        className="Asset_area_edit_comment_Title"
                        key={`${id}-${comment.id}-area-edit-comment-${
                          index + 1
                        }`}
                        onClick={(e) =>
                          handleDisabledExpandExpandPanelComment(e, comment)
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
  return <>{renderListComment()}</>;
};

ListComment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListComment);