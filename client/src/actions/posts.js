import * as api from "../api";
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  LIKE,
  DELETE,
  UPDATE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../contants/actionTypes";

// Action Creators

//Get all posts
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//get single post
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data.post });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//Get posts by search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//Create posts
export const createPost = (post, history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    history.push(`/posts/${data.newPost._id}`);
    const action = { type: CREATE, payload: data.newPost };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

//Update posts
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//delete posts
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//like posts
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//Comment posts
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
