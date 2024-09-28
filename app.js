import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'; // Import de body-parser

const { urlencoded } = bodyParser; // Déstructure urlencoded
const app = express();

// Récupérer le répertoire actuel en mode ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');

// Définir le répertoire des vues
app.set('views', path.join(__dirname, 'views'));

// Configurer body-parser pour lire les données des formulaires
app.use(urlencoded({ extended: true }));

// Définir le répertoire public pour les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour supprimer tout en-tête Content-Security-Policy existant
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});

// Réappliquer une politique Content-Security-Policy minimale sans 'require-trusted-types-for'
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " + 
    "img-src 'self' https://i.ytimg.com; " + 
    "script-src 'self' https://www.youtube.com; " +
    "style-src 'self' https://fonts.googleapis.com; " +  
    "font-src 'self' https://fonts.gstatic.com; " +  
    "frame-src 'self' https://www.youtube.com;"
  );
  next();
});

// Route principale pour la page d'accueil
app.get('/', (_req, res) => {
  const videoUrl = 'https://www.youtube.com/embed/wjUryf-UKTY'; // Lien de la vidéo YouTube
  res.render('index', { videoUrl, title: 'Accueil' });
});

// Route pour la page des activités
app.get('/activites', (_req, res) => {
  res.render('activites', { title: 'Activités' });
});

// Route pour la page de l'environnement
app.get('/environnement', (_req, res) => {
  res.render('environnement', { title: 'Environnement' });
});

// Route pour la page de contact
app.get('/contact', (_req, res) => {
  res.render('contact', { title: 'Contact' });
});

// Route pour gérer la soumission du formulaire de contact
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Message reçu de ${name} (${email}) : ${message}`);
  res.redirect('/');
});

// Route pour désactiver la demande de favicon.ico
app.get('/favicon.ico', (_req, res) => res.status(204));

// Gestion des erreurs 404 (page non trouvée) - à la fin des routes
app.use((_req, res) => {
  res.status(404).render('404', { message: 'Page non trouvée' });
});

// Lancer le serveur sur le port spécifié par l'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
