const authService = require('../services/auth-service')

exports.login = async function(req, res) { 
  try {
    const tokens = await authService.login(req.body)
    if (tokens) { 
      res.send(tokens)
    }
  } catch(err) {
    throw err
  }
}

exports.registration = async function(req, res) {
  try {
    const user = await authService.registration(req.body)
    res.send(user)
  } catch(err) {
    throw err
  }
}

exports.confirmation = async function(req, res) {
  try {
    await authService.confirmation(req.params.token)
    res.redirect('http://localhost:4200/auth')
  } catch(err) {
    throw err
  }
}

exports.refreshTokens = async function(req, res) {
  try {
    const tokens = await authService.refreshTokens(req.body)
    res.send(tokens)
  } catch(err) {
    throw err
  }
}

exports.logout = async function(req, res) {
  try {
    const token = await authService.logout(req.body)
    res.send(token)
  } catch(err) {
    throw err
  }
}