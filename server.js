require("dotenv").config();
const express = require('express');
const session = require('express-session');
const routes = require('./controllers')
const exphbs = require('express-handlebars')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


//TODO add handlebars

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  });