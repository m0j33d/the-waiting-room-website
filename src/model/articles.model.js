module.exports = (sequelize, DataTypes) => {

    const ArticleModel = sequelize.define('Article',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        article_body: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    },{
        tableName : "articles"
    });

    return ArticleModel
}