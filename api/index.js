const express = require('express')

const app = express()

// Require API routes
const wordcut = require('./routes/wordcut')

// Import API Routes
app.use(wordcut)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
