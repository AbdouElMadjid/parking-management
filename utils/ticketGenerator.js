// Module pour générer un ticket aléatoire
const crypto = require('crypto');

module.exports = {
    generateTicket: function() {
        // Génère un ticket unique basé sur un identifiant aléatoire et la date
        const ticket = crypto.randomBytes(6).toString('hex').toUpperCase();
        return ticket;
    }
};
