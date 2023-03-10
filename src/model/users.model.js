export default (sequelize, DataTypes) => {

    const UserModel = sequelize.define('User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    },{
        tableName : "users"
    });

    return UserModel
}