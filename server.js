const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// Setup Session Here
// PLACEHOLDER COMMENT

// Handlebars Initialization
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// Turn on Connection to DB and Server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});