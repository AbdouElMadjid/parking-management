const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Visite = database.define('Visite', {
    plateNumber: { type: DataTypes.STRING,
                    allowNull: false
    },
    ticketNumber: { type: DataTypes.STRING,
                    unique: true,
                    allowNull: false
    },
    status: {  type: DataTypes.TINYINT,
               defaultValue: 0
    },
    amount: { type: DataTypes.DECIMAL(10, 2),
              defaultValue: 0
    },
    infoUser: { type: DataTypes.STRING,
                allowNull: true
    },
    email: { type: DataTypes.STRING,
             allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Visite;
