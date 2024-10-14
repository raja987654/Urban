const express = require("express");
// config router
const router = express.Router();
const controller = require("../controllers/posts");
const { auth } = require("../middleware/auth");

// fetching routers

// get post by creator
router.get("/post/creator", controller.getPostsByCreator);
// get post by search
router.get("/post/search", controller.getPostsBySearch);
// get all posts
router.get("/post", controller.getPosts);
// get single post
router.get("/post/:id", controller.getPost);

// Create Update, Delete, routes, like and comment  with auth middle ware

// create post
router.post("/post", controller.createPost);
// update post
router.put("/post/:id", controller.updatePost);
// delete post
router.delete("/post/:id", controller.deletePost);
// Like button
router.patch("/post/:id/likePost", controller.likePost);
// comment route
router.post("/post/:id/commentPost", controller.commentPost);

module.exports = router;
