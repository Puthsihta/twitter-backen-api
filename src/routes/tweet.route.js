const express = require("express");
const {
  getAllTweets,
  getTweetById,
  createTweet,
  deleteTweetById,
  updateTweetById,
} = require("../controllers/tweet.controller");

const tweetRouter = express.Router();

tweetRouter.get("/", getAllTweets);
tweetRouter.get("/:id", getTweetById);
tweetRouter.post("/", createTweet);
tweetRouter.delete("/:id", deleteTweetById);
tweetRouter.put("/:id", updateTweetById);

module.exports = tweetRouter;
