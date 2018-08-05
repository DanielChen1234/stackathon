const Sequelize = require('sequelize')
const db = require('../db')

const Park = db.define('park', {
    name: {type: Sequelize.STRING},
    description: {type: Sequelize.TEXT},
    picture: {type: Sequelize.STRING},
    address: {type: Sequelize.STRING},
    longitude: {type: Sequelize.INTEGER},
    latitude: {type:Sequelize.INTEGER}
});

module.exports = Park
