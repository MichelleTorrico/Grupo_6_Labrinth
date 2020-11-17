module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios"
    let cols = {
        id: {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre_completo:{
            type: dataTypes.STRING(45),
            allowNull: false

        },
        email:{
            type: dataTypes.STRING(45),

        },
        password : {
            type : dataTypes.STRING(100),
            allowNull : false,
        },
        avatar : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        rol : {
            type : dataTypes.STRING(45),
            allowNull : false,
        }

    }
    let config = {
        tableName : "users",
        timestamps : false
        

        
    }
    const User = sequelize.define (alias, cols, config);
    User.associate = function(models){


        User.belongsToMany(models.Productos,{ //un usuario tiene muchos productos (N:M)
            as : 'productos',
            through : 'compras',
            foreignKey : 'users_id',
            otherKey : 'products_id',
            timestamps : false
        })


    }
    return User
}