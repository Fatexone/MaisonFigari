const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');

// Configurer body-parser pour lire les données des formulaires
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le répertoire public pour les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour la page d'accueil
app.get('/', (req, res) => {
  // Lien YouTube pour la vidéo
  const videoUrl = 'https://www.youtube.com/embed/wjUryf-UKTY';
  res.render('index', { videoUrl });
});

// Route pour la page des activités
app.get('/activites', (req, res) => {
  res.render('activites');
});

// Route pour la page de l'environnement
app.get('/environnement', (req, res) => {
  res.render('environnement');
});

// Route pour gérer la soumission du formulaire de contact
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Logique pour traiter les données du formulaire
  // Par exemple, vous pouvez les stocker dans une base de données MongoDB ou envoyer un email
  
  console.log(`Message reçu de ${name} (${email}) : ${message}`);
  
  // Après soumission, rediriger vers la page d'accueil ou une autre page
  res.redirect('/');
});

// Route pour désactiver la demande de favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Lancer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
