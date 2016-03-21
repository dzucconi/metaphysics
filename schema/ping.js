import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const PingType = new GraphQLObjectType({
  name: 'Ping',
  description: 'System ping',
  fields: {
    ping: {
      type: GraphQLString,
      description: 'Is the system up or down?',
    },
  },
});

const Ping = {
  type: PingType,
  args: {
    cache: {
      type: GraphQLBoolean,
      defaultValue: false,
    },
  },
  resolve: (root, { cache }, { rootValue: { loaders: { gravity } } }) =>
    gravity[cache ? 'cached' : 'uncached'].load('system/ping', { foo: 'bar' }),
};

export default Ping;
