module.exports = (sequelize, dataTypes) => {
    let alias = "productos"
    let cols = {

        id: {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type : dataTypes.STRING(100),
            allowNull : false
        },
         descripcion : {
            type : dataTypes.STRING(300),
            allowNull : false
        },
        precio : {
            type : dataTypes.DECIMAL(5, 2).UNSIGNED,
            allowNull : false
        },
        descuento : {
            type: dataTypes.INTEGER(11),
            allowNull : false
        },
        imagen : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        sections_id : {
            type : dataTypes.INTEGER()
        },
        categories_id : {
            type : dataTypes.INTEGER()
        }

    }
    let config = {

        tableName : "products",
        timestamps : true,
        underscored : true
        
       

    }
    const Product = sequelize.define (alias, cols, config);
    Product.associate = function(models){

        Product.belongsTo(models.Secciones,{ //un producto le pertenece a una sección (N:1)
            as : "productos",
            foreignKey : "sections_id"
        })

        Product.belongsTo(models.Categorias,{ //un producto le pertenece a una categoria (N:1)
            as : "productos",
            foreignKey : "categories_id"
        })

        Product.belongsToMany(models.Usuarios,{ //un producto tiene muchos usuarios (N:M)
            as : 'usuarios',
            through : 'compras',
            foreignKey : 'products_id',
            otherKey : 'users_id',
            timestamps : false
        })

    }
    return Product
}