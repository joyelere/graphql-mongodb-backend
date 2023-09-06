const User = require('./models/Post.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const resolvers = {
  Query: {
    // Sample query returning a "Hello World" message
    hello: () => {
      return 'Hello World';
    },

    // Query to get all users
    getAllUsers: async () => {
      return await User.find();
    },

    // Query to get a user by ID
    user: async (_parent, { id }, _context, _info) => {
      return await User.findById(id);
    },
  },

  Mutation: {
    // Mutation for user signup
    signup: async (_, { newUser }) => {
      try {
        // Check if a user with the provided email already exists
        const user = await User.findOne({ email: newUser.email });
        if (user) {
          throw new Error("User already exists with that email");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        // Create a new user instance
        const newUserInstance = new User({
          ...newUser,
          password: hashedPassword,
        });

        // Save the new user to the database
        await newUserInstance.save();

        // Return the newly created user instance
        return newUserInstance;

      } catch (error) {
        // Handle specific error when a user already exists
        if (error.message === "User already exists with that email") {
          throw error; // Re-throw the specific error message
        }
        throw new Error('Signup failed'  + error.message);
      }
    },

    // Mutation for user signin
    signin: async (_, { userSignin }) => {
      // Find the user in the database by their email
      const user = await User.findOne({ email: userSignin.email });

      // If the user doesn't exist, throw an error
      if (!user) {
        throw new Error("User doesn't exist with that email");
      }

      // Compare the provided password with the hashed password in the database
      const doMatch = await bcrypt.compare(userSignin.password, user.password);

      // If the passwords don't match, throw an error
      if (!doMatch) {
        throw new Error("Password is invalid");
      }

      // Generate a JWT token for the authenticated user
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      // Return the token as an object
      return { token };
    },
  },
};

module.exports = resolvers;
