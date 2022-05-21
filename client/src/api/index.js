import axios from "axios";

const API = axios.create({ baseURL: "https://social-merny.herokuapp.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//Note you can use the first method or the second method. Both works the same
// const url = "http://localhost:5000/posts";

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const updatePost = (id, updatedPost) =>
//   axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

//  POSTS
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

//AUTH
export const signIn = (FormData) => API.post("user/signin", FormData);
export const signUp = (FormData) => API.post("user/signup", FormData);
