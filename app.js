const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');

// Définir le répertoire des vues
app.set('views', path.join(__dirname, 'views'));

// Configurer body-parser pour lire les données des formulaires
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le répertoire public pour les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour la page d'accueil
app.get('/', (req, res) => {
  const videoUrl = 'https://www.youtube.com/embed/wjUryf-UKTY'; // Lien de la vidéo YouTube
  res.render('index', { videoUrl, title: 'Accueil' });  // Passer le titre
});

// Route pour la page des activités
app.get('/activites', (req, res) => {
  res.render('activites', { title: 'Activités' });  // Passer le titre
});

// Route pour la page de l'environnement
app.get('/environnement', (req, res) => {
  res.render('environnement', { title: 'Environnement' });  // Passer le titre
});

// Route pour la page de contact
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });  // Passer le titre
});

// Route pour gérer la soumission du formulaire de contact
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Logique pour traiter les données du formulaire
  console.log(`Message reçu de ${name} (${email}) : ${message}`);
  
  // Redirection après la soumission du formulaire
  res.redirect('/');
});

// Route pour désactiver la demande de favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Gestion des erreurs 404 (page non trouvée)
app.use((req, res, next) => {
  res.status(404).render('404', { message: 'Page non trouvée' });
});

// Lancer le serveur sur le port spécifié par l'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
