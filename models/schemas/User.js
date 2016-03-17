import sequelize from '../adapters';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
  // GraphQLInt,
  // GraphQLID
  // GraphQLList // uncomment this when Todos are implemented.
} from 'graphql';

import EmailType from './types';
// import { resolver } from 'graphql-sequelize';
import { sequelizeNodeInterface } from 'graphql-sequelize/lib/relay';

const {
  nodeInterface
} = sequelizeNodeInterface(sequelize);

import {
  mutationWithClientMutationId,
  // connectionArgs,
  // connectionDefinitions,
  // connectionFromArray,
  // cursorForObjectInConnection,
  fromGlobalId,
  globalIdField
} from 'graphql-relay';

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
  },
  email: {
    ...SEQUELIZE_REQUIRED_STRING,
    validate: {
      isEmail: true
    }
  }
};

const User = sequelize.define('user', UserDef);

const UserFields = {
  firstName: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'The first/given name of a particular user.',
    resolve: (user) => user.firstName
  },
  lastName: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'The last name of a particular user.',
    resolve: (user) => user.lastName
  },
  email: {
    type: EmailType,
    description: 'A valid email address',
    resolve: (user) => user.email
  }
};

// TODO: make the relation
// User.Todos = User.hasMany(Todo, {as: 'todos'});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User object.',
  fields: {
    id: globalIdField('User'),
    ...UserFields
    // todos: {
    //   type: new GraphQLList(TodoType),
    //   resolve: resolver(User.Todos. { separate: true })
    // }
  },
  interfaces: [ nodeInterface ]
});

const UserCreate = mutationWithClientMutationId({
  name: 'UserCreateMutation',
  inputFields: {
    ...UserFields
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => user
    }
  },
  mutateAndGetPayload: async ({ firstName, lastName, email }) => {
    const user = await User.create({
      firstName,
      lastName,
      email
    });

    return {
      user
    };
  }
});

const UserUpdate = mutationWithClientMutationId({
  name: 'UserUpdateMutation',
  inputFields: {
    id: globalIdField('User'),
    firstName: {
      type: GraphQLString,
      description: 'The first/given name of a particular user.'
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of a particular user.'
    },
    email: {
      type: EmailType,
      description: 'A valid email address of a user'
    }
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => user
    }
  },
  mutateAndGetPayload: async (updateParams) => {
    let { id } = fromGlobalId(updateParams.id);
    id = parseInt(id);
    const user = await User.update(updateParams, {
      where: {
        id
      }
    }).then(async () => {
      const result = await User.findOne({
        id
      }).then(({ dataValues }) => dataValues);
      return result;
    });

    return {
      user
    };
  }
});

export { User, UserType, UserDef, UserCreate, UserUpdate };
