import Koa from 'koa';
import mount from 'koa-mount';
import session from 'koa-session';
import chalk from 'chalk';

import graphqlHTTP from 'koa-graphql';

// common/shared models throughout the app.
import {
  RootSchema // GraphQL schema version for.. well, GraphQL.
} from './models';


console.log(RootSchema);

// BEGIN GraphQL Server

// Don't use the GraphiQL IDE in production.
const USE_GRAPHIQL = process.env.NODE_ENV !== 'production';
// assign application port based on ENV or default.
const APP_PORT = process.env.PORT || 3000;

const app = new Koa;

app.keys = [ '1nm3w3n1' ];


app.use(
  mount(
    '/graphql',              // GraphQL is available/mounted on '/graphql'
    graphqlHTTP({            // Instance of GraphQLHTTP (koa-graphql)
      schema: RootSchema,    // GraphQL Root Schema
      graphiql: USE_GRAPHIQL // Whether or not enable the GraphiQL IDE at
                             // .. the mounted endpoint.
    })
  ) // end mount '/graphql'
);

app.use(session(app));


app.listen(APP_PORT, () => {
  chalk.green(`Application now listening at ${APP_PORT}`);
});
