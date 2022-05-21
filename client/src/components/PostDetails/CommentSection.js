import React, { useState, useRef } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behaviour: "smooth" });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6" className={classes.message}>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography
              key={i}
              gutterBottom
              variant="subtitle1"
              className={classes.message}
            >
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef}></div>
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6" className={classes.message}>
              Leave a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              color="primary"
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
