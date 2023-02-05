const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('activity',{
        nombre: {
            type: DataTypes.STRING
        },
        dificultad: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
        duracion: {
            type: DataTypes.STRING
        },
        temporada: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["Verano", "Otoño", "Invierno", "Primavera"]]
            }
        }
    },{
        timestamps: false
    })
}

