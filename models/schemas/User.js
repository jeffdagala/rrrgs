import sequelize from '../adapters';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
  // GraphQLList // uncomment this when Todos are implemented.
} from 'graphql';

import EmailType from './types';

import { sequelizeNodeInterface } from 'graphql-sequelize/lib/relay';

const {
  nodeInterface
} = sequelizeNodeInterface(sequelize);

// import {
//   resolver
// } from 'graphql-sequelize';

// import {Todo, TodoType} from './Todo';

import {
  SEQUELIZE_REQUIRED_STRING
} from '../lib/constants';

const UserDef = {
  firstName: {
    ...SEQUELIZE_REQUIRED_STRING
  },
  lastName: {
    ...SEQUELIZE_REQUIRED_STRING
  }
  // ,
  // email: {
  //   ...SEQUELIZE_REQUIRED_STRING,
  //   validate: {
  //     isEmail: true
  //   }
  // }
};



const User = sequelize.define('user', UserDef);

// TODO: make the relation
// User.Todos = User.hasMany(Todo, {as: 'todos'});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User object.',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the user.'
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The first/given name of a particular user.'
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The last name of a particular user.'
    }
    // ,
    // email: {
    //   type: EmailType,
    //   description: 'A valid email address'
    // }
    // todos: {
    //   type: new GraphQLList(TodoType),
    //   resolve: resolver(User.Todos. { separate: true })
    // }
  },
  interfaces: [ nodeInterface ]
});

export { User, UserType };
