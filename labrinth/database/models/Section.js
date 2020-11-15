module.exports = (sequelize, dataTypes) => {
    let alias = "secciones"
    let cols = {

        id: {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre : {
            type : dataTypes.STRING(45),
            allowNull : false
        }


    }
    let config = {

        tableName: "sections",
        timestamps: false
        

    }
    const Section = sequelize.define (alias, cols, config);
    Section.associate = function(models){

        Section.hasMany(models.Productos,{ //una categoria tiene muchos productos (1:M)
            as : "productos",
            foreignKey : "sections_id"
        })
    }
    return Section
}