// import models
const { User, BookInput } = require('../models');

const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // read request header for jwt
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('savedBooks')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },
}

module.exports = resolvers;