module.exports = (sequelize, dataTypes) => {
    let alias = "categorias"
    let cols = {

        id : {
            type : dataTypes.INTEGER(),
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : dataTypes.STRING(45),
            allowNull : false
        }

    }
    let config = {

        tableName: "categories",
        timestamps: false
        

    }
    const Category = sequelize.define (alias, cols, config);

    Category.associate = function(models){

        Category.hasMany(models.Productos,{ //una categoria tiene muchos productos (1:M)
            as : "productos",
            foreignKey : "categories_id"
        })
    }
    return Category
}