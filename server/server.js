import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
// import uniRouter from './middleware/uniRouter';
import { config } from '../package.json';

const app = express();
app.listen(3000);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(config.assetsPublicPath, express.static(path.join(__dirname, 'public')));

import api from './api/';
app.use('/api/', api);

console.log('NODE_ENV', process.env.NODE_ENV);

// Development
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevServer = require('webpack-dev-server');
  const webpackDevConfig = require('../webpack.dev.js');
  
  new webpackDevServer(webpack(webpackDevConfig), {
    publicPath: config.assetsPublicPath,
    contentBase: path.resolve(__dirname, 'public'),
    inline: true,
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    noInfo: true,
    proxy: {
      "/api/*": "http://127.0.0.1:3000"
    }
  }).listen(8089, "localhost", () => { console.log('[WDS started on 8089]'); });
} else {
    // app.use('*', uniRouter);
    console.log("NOT IMPLEMENTED");
}
