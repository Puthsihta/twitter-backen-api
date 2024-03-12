const { faker } = require("@faker-js/faker");
const { userModel } = require("./src/models/user.model.js");
const { tweetModel } = require("./src/models/tweet.model.js");
const users = 50;
const tweets = 100;

const dbConnect = require("./src/db/db.js");

dbConnect().catch((err) => {
  console.log(err);
});

async function generate() {
  let userList = [];
  for (let i = 0; i < users; i++) {
    let user = new userModel({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      dateOfBirth: faker.date.birthdate(),
      password: faker.internet.password(),
    });
    const result = await user.save();
    userList.push(result._id);
    console.log(`user: ${result._id} generated!`);
  }

  for (let i = 0; i < tweets; i++) {
    const randomElement = userList[Math.floor(Math.random() * userList.length)];
    let tweet = new tweetModel({
      byUser: randomElement,
      text: faker.lorem.paragraph(),
      createdDate: new Date(),
    });
    const result = await tweet.save();
    console.log(`tweet: ${result._id} generated!`);
  }
}

async function linkRelationship() {
  const tweets = await tweetModel.find({});
  const users = await userModel.find({});
  users.forEach(async (user) => {
    const belongTweet = tweets.filter((tt) => {
      return tt.byUser.toString() == user._id;
    });
    let tweetArray = [];
    belongTweet.forEach((ttt) => {
      tweetArray.push(ttt._id);
    });
    user.tweets = tweetArray;
    await user.save();
    console.log(`user: ${user._id} saved with tweets: ${tweetArray.length}`);
  });
}

// generate();
// linkRelationship();
