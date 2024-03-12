const { checkSchema } = require("express-validator");
const { userModel } = require("../models/user.model");

const creatUserValidation = checkSchema({
  username: {
    notEmpty: true,
    isLength: {
      options: {
        max: 20,
        min: 3,
      },
      errorMessage:
        "Username's length must be 20 characters maximum and 3 characters minimum.",
    },
    custom: {
      options: async (value) => {
        const user = await userModel.find({
          username: value,
        });
        if (user.length != 0) {
          throw new Error("Username already registered");
        }
      },
    },
  },
  email: {
    isEmail: true,
    errorMessage: "Invalid email address",
    custom: {
      options: async (value) => {
        const user = await userModel.find({
          email: value,
        });
        if (user.length != 0) {
          throw new Error("Email already registered");
        }
      },
    },
  },
  dateOfBirth: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
});

const updateUserValidation = checkSchema({
  username: {
    notEmpty: true,
    isLength: {
      options: {
        max: 20,
        min: 3,
      },
      errorMessage:
        "Username's length must be 20 characters maximum and 3 characters minimum.",
    },
    custom: {
      options: async (value) => {
        const user = await userModel.find({
          username: value,
        });
        if (user.length != 0) {
          throw new Error("This Username is existing!");
        }
      },
    },
  },
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: "Invalid email address",
    custom: {
      options: async (value) => {
        const user = await userModel.find({
          email: value,
        });
        if (user.length != 0) {
          throw new Error("This email address is existing!");
        }
      },
    },
  },
});

module.exports = { creatUserValidation, updateUserValidation };
