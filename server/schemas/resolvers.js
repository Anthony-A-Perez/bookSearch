const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('books');
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
  login: async (parent, { email, password }) => {
      try {
        
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
    saveBook: async (parent, { newBook }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: newBook } },
            { new: true }
          );

          return updatedUser;
        }
      } catch (error) {
        throw new AuthenticationError('you need to be logged in');
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
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
