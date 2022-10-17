const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4
const Token = require('../models/token')
const { tokens, secret } = require('../config/app').jwt

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: tokens.access.type,
  }
  const options = { expiresIn: tokens.access.expiresIn }

  return jwt.sign(payload, secret, options)
}

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type,
  }
  const options = { expiresIn: tokens.refresh.expiresIn }

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options)
  }
}

const replaceDbRefreshToken = async (tokenId, userId) => {
  Token.findOneAndRemove({ userId })
    .exec()
    .then(() => Token.create({ tokenId, userId }))
}

const generateVerificationToken = (userId) => {
  const payload = { userId }

  return jwt.sign(payload, secret)
}

const updateTokens = (userId) => {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken()

  return replaceDbRefreshToken(refreshToken.id, userId)
    .then(() => ({
      accessToken,
      refreshToken: refreshToken.token
    }))
}

const logout = async (userId) => {
  return await Token.findOneAndRemove({ userId })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
  generateVerificationToken,
  updateTokens,
  logout,
}