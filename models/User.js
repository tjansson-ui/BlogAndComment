const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10

class User extends Model {
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password)
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    }
}, {
    hooks: {
        beforeCreate: async function(user) {
            user.password = await bcrypt.hash(user.password, saltRounds)
        },
        beforeUpdate: async function(user) {
            user.password = await bcrypt.hash(user.password, saltRounds)
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

module.exports = User