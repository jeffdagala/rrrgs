import { UserDef } from '../models/schemas';

module.exports = {
  up: (queryInterface) =>
    queryInterface.createTable('users', UserDef),
  down: (queryInterface) => {
    queryInterface.dropAllTables();
  }
};
