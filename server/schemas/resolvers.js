const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }
      throw new AuthenticationError("not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);

        if (!user) {
          throw new AuthenticationError("Something is wrong!");
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
    login: async (parent, args) => {
      try {
        const { email, password } = args;
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Can't find this user");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Wrong password!");
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
    saveBook: async (parent, { bookData }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: input } },
            { new: true, runValidators: true }
          );

          return updatedUser;
        }
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
  },
};

module.exports = resolvers;
