import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import sequelize from './adapters';

import { resolver } from 'graphql-sequelize';
import { sequelizeNodeInterface } from 'graphql-sequelize/lib/relay';

const {
  nodeField,
  nodeTypeMapper
} = sequelizeNodeInterface(sequelize);


import { User, UserType } from './schemas';

nodeTypeMapper.mapTypes({
  [User.name]: UserType
});

const RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootType',
    fields: {
      user: {
        type: UserType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: resolver(User, { include: false })
      }
    }
  })
});

const ModelDefs = {
  [User.name]: User
};

export { RootSchema, ModelDefs };
