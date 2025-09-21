const express = require('express');
const bodyParser = require('body-parser');
const visiteRoutes = require('./routes/Visite');
const database = require('./config/database');

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/Visite', visiteRoutes);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/visites', (req, res) => {
    res.redirect('/visite/all');
});
app.get('visite/search', (req, res) => {
    res.redirect('searchResults');
});

// Synchroniser la base de données et démarrer le serveur
database.sync({ force: false }).then(() => {
    app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));
});
