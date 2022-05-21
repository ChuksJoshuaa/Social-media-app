import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import createCustomError from "../errors/custom-error.js";

//Get all posts
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of the page
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      NumberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//get single post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//Get all posts by search
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    if (!posts) {
      res.status(404).json({ msg: "Object not found" });
    }
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//Create posts
export const createPosts = async (req, res, next) => {
  const post = req.body;

  const { creator, title, tags, message } = post;

  try {
    if (title === "" || tags === "" || message === "") {
      return next(createCustomError("Please fill in the form completely", 404));
    } else {
      // req.body.creator = req.userId;
      const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
      });
      await newPost.save();
      res.status(201).json({ newPost });
    }
  } catch (error) {
    res.status(409).json({ msg: error.msg });
  }
};

//Update posts
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  const { creator, title, tags, message, selectedFile } = post;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  } else {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { creator, title, tags, message, selectedFile },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedPost);
  }
};

//Delete posts
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  } else {
    await PostMessage.findByIdAndDelete(_id);
  }
  res.status(200).send("Job was deleted Successfully");
};

// like posts
export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ msg: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  } else {
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedPost);
  }
};

//Comment posts

export const commentPost = async (req, res) => {
  // const { id } = req.params;
  const { id: _id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(_id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedPost);
};
