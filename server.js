const app = require('./app');
const db = require('./db');

const port = process.env.PORT || 3030;

// db.sequelize.sync({ force: true });
db.sequelize.sync();
// db.sequelize.sync({ alter: true });

app.listen(port, () => {
  console.log(`listen on ${port}`);
});
