import Sequelize from 'sequelize';

const opts = Array(2);

const SequelizeSQLite3 = new Sequelize('database', ...opts, {
  dialect: 'sqlite',
  storage: '/tmp/rrrgs.sqlite'
});

export default SequelizeSQLite3;
