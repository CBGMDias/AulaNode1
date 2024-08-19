const Sequelize = require('sequelize')
const config = require('../config/database.js')

const Endereco = require('../models/Endereco.js')

const connection = new Sequelize(config)

Endereco.init(connection)
Endereco.associate(connection.models)

module.exports = connection
