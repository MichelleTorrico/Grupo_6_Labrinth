module.exports = (sequelize, dataTypes) => {
    let alias = "compras"
    let cols = {

        users_id : {
            type : dataTypes.INTEGER(10)
        },
        products_id : {
            type : dataTypes.INTEGER(10)
        },
        id: {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        cantidad:{
            type: dataTypes.INTEGER(10),
            allowNull: false

        },
        tipo_pago:{
            type : dataTypes.STRING(45),
            allowNull : false

        }

    }
    let config = {

        tableName : "compras",
        timestamps : true,
        underscored : true
        
       

    }
    const Compra = sequelize.define (alias, cols, config);
    Compra.associate = function(models){

    }
    return Compra
}