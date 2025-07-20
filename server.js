
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Firebase Admin SDK initialization
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing JSON body (needed for sessionLogin)
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

// Middleware to check if user is authenticated via session cookie
function isAuthenticated(req, res, next) {
  const sessionCookie = req.cookies.session || '';
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      req.user = decodedClaims;
      next();
    })
    .catch((error) => {
      res.redirect('/login');
    });
}

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login'); // Your login.html renamed to login.ejs and placed in /views
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

// Session login (called from frontend after Firebase Auth)
app.post('/sessionLogin', async (req, res) => {
  const idToken = req.body.idToken;
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: false }; // secure: true if using HTTPS
    res.cookie('session', sessionCookie, options);
    res.status(200).send('Session login successful');
  } catch (error) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

app.get('/logout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/login');
});

// Fallback for unknown POST to /login (prevent error)
app.post('/login', (req, res) => {
  res.status(404).send("Direct login is not supported. Use Firebase authentication.");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

