const express = require('express');
const router = express.Router();
const Visite = require('../models/Visite');

// Génération d'un ticket unique
const generateTicketNumber = () => {
    return 'TICKET-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Ajouter une Visite
router.post('/add', async (req, res) => {
    try {
        const { plateNumber, infoUser, email } = req.body;
        const ticketNumber = generateTicketNumber();
        const visite = await Visite.create({ plateNumber, infoUser, email, ticketNumber });
        // res.json({ message: 'Visite ajoutée avec succès', visite });
        res.redirect("../visites");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer toutes les visites
router.get('/all', async (req, res) => {
    try {
        const visites = await Visite.findAll({ order: [['createdAt', 'DESC']] });
        res.render('allVisits', { visites });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre à jour une visite via le bouton "Marquer comme sortie"
router.post('/mark-exit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const visite = await Visite.findByPk(id);
        if (!visite) return res.status(404).json({ message: 'Visite non trouvée' });

        // Calcul du montant
        const createdAt = new Date(visite.createdAt);
        const updatedAt = new Date();
        const durationInHours = Math.ceil((updatedAt - createdAt) / (1000 * 60 * 60));
        const amount = durationInHours <= 1 ? 1000 : durationInHours * 1000;

        // Mettre à jour le statut et le montant
        visite.status = 1;
        visite.amount = amount;
        await visite.save();

        res.redirect('/visite/all'); // Retourner à la liste des visites
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer les véhicules présents
router.get('/present', async (req, res) => {
    try {
        const visitesPresentes = await Visite.findAll({ where: { status: 0 }, order: [['createdAt', 'DESC']] });
        res.render('presentVisits', { visites: visitesPresentes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer les véhicules sortis
router.get('/exited', async (req, res) => {
    try {
        const visitesSorties = await Visite.findAll({ where: { status: 1 }, order: [['updatedAt', 'DESC']] });
        res.render('exitedVisits', { visites: visitesSorties });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("./visite/search", async (req, res) => {
    const { query } = req.query; // Récupère la requête de recherche
    try {
        // Chercher les visites correspondant à la plaque, au ticket ou à l'email
        const visites = await Visite.find({
            $or: [
                { plateNumber: { $regex: query, $options: "i" } },
                { ticketNumber: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        });

        if (visites.length > 0) {
            // Redirige vers la page des résultats si des données sont trouvées
            res.render("searchResults", { visites, query });
        } else {
            // Reste sur la page actuelle avec un message d'erreur
            res.render("currentView", { message: "Aucune information trouvée.", query });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la recherche.");
    }
});

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
