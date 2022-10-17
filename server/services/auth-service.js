require('dotenv').config({path: __dirname + '../../.env'});
const User = require('../models/user')
const Token = require('../models/token')
const jwt = require('jsonwebtoken');
const { getHashedString } = require('../helpers/hashedString')
const Mail = require('./mail.js')
const createError = require('http-errors')
const authHelper = require('../helpers/authHelper');

const { JWT_SECRET_KEY } = process.env

exports.login = async function (loginUser) {
  try {
    const {email, password} = loginUser

    const existUser = await User.findOne({
      password: getHashedString(password),
      email: email
    });

    if (!existUser) { throw createError(400, 'There is no such user') }
    if (!existUser.confirmed) { throw createError(400, 'Confirm your email account') } 
      
    return await authHelper.updateTokens(existUser._id)
  } catch (err) {
    throw err
  }
}

exports.registration = async function (newUser) {
  try {
    const { email, name, password} = newUser
    const repeatUser = await User.findOne({email});
    
    if (repeatUser) { throw createError(400, 'This email is already occupied') }
    
    const user = new User({
      name: name,
      password: getHashedString(password),
      email: email,
      confirmed: false,
      lastVisitDate: new Date(),
      isNotifications: true,
      folders: {items: []}
    })

    const {_id: userId} = await user.save()

    const verificationToken = authHelper.generateVerificationToken(userId)
    const url = `http://localhost:4200/api/auth/mail-confirmation/${verificationToken}`

    await Mail.send(email, 'Confirmation', 'Use this link to confirm your email', 
    `<h2 style="text-align: center;">Use this link to confirm your email</h2>
    <div style="width: 100%; background: #333; text-align: center; padding: 1rem 2rem; border-radius: 25px;">
      <a style="color: #fff;" href="${url}"> ${url} </a>
    </div>`)

    return user
  } catch (err) {
    throw err
  }
}

exports.confirmation = async function(verificationToken) {
  try {
    const { userId } = (jwt.verify(verificationToken, JWT_SECRET_KEY))
    await User.findOneAndUpdate({_id: userId}, {confirmed: true})
  } catch(err) {
    throw err
  }
}

exports.refreshTokens = async function(tokens) {
  const { refreshToken } = tokens

  let payload = null;
  let newTokens = null;
  try {
    payload = jwt.verify(refreshToken, JWT_SECRET_KEY)
    if (payload.type !== 'refresh') { throw createError(400, 'Invalid token!') }
  } catch(err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw createError(401, 'RefreshToken expired!')
    } else if (err instanceof jwt.JsonWebTokenError) { throw createError(400, 'Invalid token!') }
  }

  await Token.findOne({ tokenId: payload.id })
    .exec()
    .then(token => {
      if (token === null) { throw createError(400, 'Invalid token!') }

      newTokens = authHelper.updateTokens(token.userId)
    })
    
    return newTokens
}

exports.logout = async function(request) {
  try {
    const { userId } = request
    return await authHelper.logout(userId)
  } catch(err) {
    throw err
  }
}