// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const Sequelize = require('sequelize');

const dbname = process.env.MYSQL_DBNAME;
const dbuser = process.env.MYSQL_USER;
const dbpass = process.env.MYSQL_PASSWORD;
const dbhost = process.env.MYSQL_HOST;
const dbport = process.env.MYSQL_PORT || 3306;

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  port: dbport,
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.activity = require('./models/activity.model')(sequelize, Sequelize);
db.todo = require('./models/todo.model')(sequelize, Sequelize);

db.activity.hasMany(db.todo, {
  foreignKey: {
    fieldName: 'activity_group_id',
    allowNull: false,
  },
});

module.exports = db;
