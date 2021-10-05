const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const SngOperaciones = require('./Controlador/SngOperaciones.js');
const sngOp = SngOperaciones.getInstance();

const viewsPath = path.join(__dirname, 'Vista');
const ejsViewsPath = path.join(__dirname, 'Vista/Ejs');

const app = express();

app.set('port', 3000);
app.use(morgan('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended:true, limit: '100mb'}));
app.set('view engine', 'ejs');
app.use(express.static(viewsPath));
app.set('views', ejsViewsPath);

app.use(session({
  secret: 'm!S3ssi0nn0de',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));

app.use('/', sngOp.getOperacionesBiomasa());
app.use('/', sngOp.getOperacionesEtiqueta());
app.use('/', sngOp.getOperacionesUsuario());
app.use('/', sngOp.getOperacionesNavegacion());

app.listen(app.get('port'));