import React, { useState } from "react";

import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts.js";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const history = useHistory();
  // <span>{moment(date).format("dddd Do, YYYY")}</span>;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?.googleId || user?.result?._id;

  const hasLikedPost = post.likes.find((like) => like === userId);

  const openPost = () => {
    return history.push(`/posts/${post._id}`);
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes({ ...post.likes, userId });
    }
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === userId) ? (
        <div style={{ fontSize: "0.9em", textTransform: "capitalize" }}>
          <ThumbUpAltIcon style={{ fontSize: "1em" }} />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </div>
      ) : (
        <div style={{ fontSize: "0.9em", textTransform: "capitalize" }}>
          <ThumbUpAltOutlined style={{ fontSize: "1em" }} />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "likes"}
        </div>
      );
    }

    return (
      <div style={{ fontSize: "0.9em", textTransform: "capitalize" }}>
        <ThumbUpAltOutlined style={{ fontSize: "1em" }} />
        &nbsp;Like
      </div>
    );
  };

  return (
    <Card className={classes.card} raised elevation={9}>
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5">
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.message}
        >
          {`${
            post.message.length > 100
              ? post.message.substring(0, 100)
              : post.message
          }`}{" "}
          <span onClick={openPost} style={{ color: "#72a6d4" }}>
            ...Read more
          </span>
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          style={{ color: "blue", fontFamily: `"Rajdhani", sans-serif` }}
          // onClick={() => dispatch(likePost(post._id))}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            style={{
              color: "crimson",
              fontSize: "0.9em",
              textTransform: "capitalize",
              fontFamily: `"Rajdhani", sans-serif`,
            }}
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon style={{ fontSize: "1em" }} />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
