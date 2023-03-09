const { Sequelize, DataTypes} = require("sequelize")
const config = require('../../config/dbConfig')

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
});

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error)=>{
        console.error('Unable to sync to the database:', error);
    })

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./users.model')(sequelize, DataTypes)
db.articles = require('./articles.model')(sequelize, DataTypes)
db.comments = require('./comments.model')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => console.log('Table sync successfully.'))
    .catch((error)=>{
        console.error('Unable to sync to the database:', error);
    })


module.exports = db