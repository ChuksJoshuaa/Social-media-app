import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import useStyles from "./styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PersonIcon from "@material-ui/icons/Person";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post, dispatch]);

  if (!post) {
    return null;
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter((item) => item._id !== id);

  const openPost = (_id) => {
    return history.push(`/posts/${_id}`);
  };
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <aside className={classes.aside}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography
              variant="h4"
              component="h2"
              className={classes.title}
              style={{ textTransform: "capitalize" }}
            >
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              className={classes.title}
              style={{ color: "crimson", textTransform: "capitalize" }}
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              className={classes.message}
            >
              {post.message}
            </Typography>
            <Typography variant="h6" className={classes.message}>
              <PersonIcon style={{ fontSize: "0.7em" }} />
              {post.name}
            </Typography>
            <Typography
              variant="body1"
              className={classes.message}
              style={{ fontWeight: "700" }}
            >
              <AccessTimeIcon style={{ fontSize: "0.7em" }} />{" "}
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <CommentSection post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </div>
        </div>
      </aside>

      <article className={classes.article}>
        {recommendedPosts.length ? (
          <div className={classes.section}>
            <Typography
              gutterBottom
              variant="h5"
              className={classes.message}
              style={{ color: "crimson", textTransform: "capitalize" }}
            >
              You might also check this out
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, message, name, likes, selectedFile, _id }) => (
                  <div
                    key={_id}
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      className={classes.title}
                      style={{ textTransform: "capitalize" }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      className={classes.message}
                    >
                      <PersonIcon style={{ fontSize: "0.7em" }} /> {name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.message}
                      style={{ fontWeight: "700" }}
                    >
                      <AccessTimeIcon style={{ fontSize: "0.7em" }} />{" "}
                      {moment(post.createdAt).fromNow()}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      className={classes.message}
                    >
                      {`${
                        message.length > 100
                          ? message.substring(0, 100)
                          : message
                      }`}{" "}
                      <span style={{ color: "#72a6d4" }}>.....</span>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      color="primary"
                      className={classes.message}
                      style={{ fontSize: "0.9em", color: "blue" }}
                    >
                      {likes.length} {likes.length > 1 ? "likes" : "like"}
                    </Typography>
                    <img
                      src={selectedFile}
                      width="200px"
                      height="200px"
                      alt="file"
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div style={{ visibility: "hidden" }}>.</div>
        )}
      </article>
    </Paper>
  );
};

export default PostDetails;
