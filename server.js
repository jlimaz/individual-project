// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/apiRoutes');
const path = require('path');
const session = require('express-session');
const userController = require('./controllers/userController');
const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'views', 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', routes);

const frontRoutes = require('./routes/frontRoutes');
app.use('/', frontRoutes);

// Login route
app.post('/login', userController.loginUser);

app.post('/create-account', async (req, res) => {
  try {
    // profile_photo pode ser null ou um valor padrão
    req.body.profile_photo = null;
    await userController.createUser(req, res);
    // Redireciona para login após criar conta com sucesso
    res.redirect('/login');
  } catch (err) {
    res.redirect('/create-account?error=1');
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});