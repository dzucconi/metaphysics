import xapp from 'artsy-xapp';
import debug from 'debug';
import morgan from 'morgan';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import { gravityLoader } from './lib/loaders/gravity';

xapp.on('error', debug('error'));
xapp.init({
  url: process.env.ARTSY_API_URL
}, function() {
  require('./config').ARTSY_XAPP_TOKEN = xapp.token;
});

let app = express();
let port = process.env.PORT || 3000;

app
  .get('/favicon.ico', (req, res) => {
    res
      .status(200)
      .set({ 'Content-Type': 'image/x-icon' })
      .end();
  })
  .all('/graphql', (req, res) => res.redirect('/'))
  .use('/', morgan('combined'), graphqlHTTP((req) => {
    gravityLoader.clearAll();

    return {
      schema: schema,
      graphiql: true
    }
  }))
  .listen(port, () => debug('info')(`Listening on ${port}`));
