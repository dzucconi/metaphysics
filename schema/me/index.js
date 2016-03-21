import date from '../fields/date';
// import Bidders from './bidders';
// import BidderPositions from './bidder_positions';
// import SaleRegistrations from './sale_registrations';
import {
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

const Me = new GraphQLObjectType({
  name: 'Me',
  fields: {
    id: {
      type: GraphQLString,
    },
    created_at: date,
    email: {
      type: GraphQLString,
    },
    // bidders: Bidders,
    // bidder_positions: BidderPositions,
    // sale_registrations: SaleRegistrations,
  },
});

export default {
  type: Me,
  resolve: (root, options, { rootValue: { loaders: { gravity } } }) =>
    gravity.load('me', options, { cache: false }),
};
