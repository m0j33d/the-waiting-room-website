module.exports = (sequelize, DataTypes) => {

    const CommentModel = sequelize.define('Comment',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        tableName : "comments"
    });

    return CommentModel
}