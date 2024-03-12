const asyncHandler = require("express-async-handler");
const { tweetModel } = require("../models/tweet.model");

const getAllTweets = async (req, res) => {
  const data = await tweetModel.find({}).exec();
  res.json({ message: true, data: { data: data } });
};

const getTweetById = async (req, res) => {
  const data = await tweetModel.findById(req.params.id).exec();
  res.json({ message: true, data: { data: data } });
};

const createTweet = asyncHandler(async (req, res) => {
  const newTweet = new tweetModel(req.body);
  const result = await newTweet.save();
  res.json({ message: true, data: { data: result } });
});

const deleteTweetById = async (req, res) => {
  const result = await tweetModel.deleteOne({ _id: req.params.id });
  res.json({
    message: true,
    data: {
      data: "Tweet deleted successfully",
    },
  });
};

const updateTweetById = async (req, res) => {
  const updatedTweet = await tweetModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json({
    message: true,
    data: {
      data: updatedTweet,
    },
  });
};

module.exports = {
  getAllTweets,
  getTweetById,
  createTweet,
  deleteTweetById,
  updateTweetById,
};
