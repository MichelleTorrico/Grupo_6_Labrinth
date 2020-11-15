module.exports = (sequelize, dataTypes) => {
    let alias = "Productos"
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
    const Productos = sequelize.define (alias, cols, config);
    Productos.associate = function(models){

        Productos.belongsTo(models.Secciones,{ //un producto le pertenece a una sección (N:1)
            as : "seccion",
            foreignKey : "sections_id"
        })

        Productos.belongsTo(models.Categorias,{ //un producto le pertenece a una categoria (N:1)
            as : "categoria",
            foreignKey : "categories_id"
        })

        Productos.belongsToMany(models.Usuarios,{ //un producto tiene muchos usuarios (N:M)
            as : 'usuarios',
            through : 'compras',
            foreignKey : 'products_id',
            otherKey : 'users_id',
            timestamps : false
        })

    }
    return Productos
}