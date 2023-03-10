import { Sequelize, DataTypes } from "sequelize"
import * as config from '../../config/dbConfig.js'
import User from '../model/users.model.js'
import Article from '../model/articles.model.js'
import Comment from '../model/comments.model.js'

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


db.users = User(sequelize, DataTypes)
db.articles = Article(sequelize, DataTypes)
db.comments = Comment(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => console.log('Table sync successfully.'))
    .catch((error)=>{
        console.error('Unable to sync to the database:', error);
    })


export { db }