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
    isLength: {
      options: {
        max: 30,
        min: 6,
      },
      errorMessage:
        "Password length must be 20 characters maximum and 3 characters minimum.",
    },
  },
  confirmedPassword: {
    isLength: {
      options: {
        max: 30,
        min: 6,
      },
      errorMessage:
        "Password length must be 20 characters maximum and 3 characters minimum.",
    },
    custom: {
      options: async (value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Password mismatched!");
        }
      },
    },
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

const loginUserValidator = checkSchema({
  email: {
    isEmail: true,
    errorMessage: "Invalid email address",
    custom: {
      options: async (value) => {
        const user = await userModel.find({
          email: value,
        });
        if (user.length == 0) {
          throw new Error("Email not registered");
        }
      },
    },
  },
  password: {
    isLength: {
      options: {
        max: 30,
        min: 6,
      },
      errorMessage:
        "Password length must be 20 characters maximum and 3 characters minimum.",
    },
  },
});

module.exports = {
  creatUserValidation,
  updateUserValidation,
  loginUserValidator,
};
