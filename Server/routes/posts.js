import express from "express";

const router = express();
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;

//Notes

//router.route("/").get(getAllJobs).post(createJob);
// router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);
