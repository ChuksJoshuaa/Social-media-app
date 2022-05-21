import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

//make sure you change the lg to 3

export default Posts;
