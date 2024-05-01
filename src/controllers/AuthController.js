const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const mongoose = require('mongoose');

const tokenGenerate = (user = {}) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    authConfig.secret,
    {
      expiresIn: 86400,
    }
  );
};

module.exports = {
  async register(req, res) {
    const { email } = req.body;

    try {
      if (await UserModel.findOne({ email })) {
        return res.status(400).json({
          error: true,
          message: 'User already exists',
        });
      }

      const user = await UserModel.create(req.body);

      user.password = undefined;

      return res.status(200).json({
        user,
        token: tokenGenerate(user),
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async readUsers(req, res) {
    try {
      const users = await UserModel.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async readUserById(req, res) {
    const id = req.params.id;

    try {
      const user = await UserModel.findOne({ _id: id });

      if (!user) {
        return res.status(422).json({
          error: true,
          message: 'User not found',
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateUserById(req, res) {
    const id = req.params.id;
    const { name, email, password } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: true,
          message: 'Invalid user ID',
        });
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
      const updateFields = {};
      if (name) {
        updateFields.name = name;
      }
      if (email) {
        updateFields.email = email;
      }
      if (hashedPassword) {
        updateFields.password = hashedPassword;
      }

      const updatedUser = await UserModel.updateOne({ _id: id }, updateFields);

      if (updatedUser.nModified === 0) {
        return res.status(422).json({
          error: true,
          message: 'User not found or no fields were updated',
        });
      }

      return res.status(200).json(updateFields);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteUserById(req, res) {
    const id = req.params.id;

    try {
      const user = await UserModel.findOne({ _id: id });

      if (!user) {
        return res.status(422).json({
          error: true,
          message: 'User not found',
        });
      }

      await UserModel.deleteOne({ _id: id });

      return res.status(200).json({
        error: false,
        message: 'User deleted',
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
        return res.status(400).json({
          error: true,
          message: 'User not found',
        });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
          error: true,
          message: 'Invalid password',
        });
      }

      user.password = undefined;

      return res.status(200).json({
        user,
        token: tokenGenerate(user),
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};