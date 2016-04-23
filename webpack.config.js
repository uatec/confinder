// module.exports = {
//     entry: './src/app.jsx',
//     output: {
//         filename: 'public/js/bundle.js', //this is the default name, so you can skip it
//         //at this directory our bundle file will be available
//         //make sure port 8090 is used when launching webpack-dev-server
//         publicPath: 'http://localhost:8090/'
//     },
//     module: {
        // loaders: [
        //     {
        //         //tell webpack to use jsx-loader for all *.jsx files
        //         test: /\.jsx$/,
        //         loader: 'jsx-loader?insertPragma=React.DOM&harmony'
        //     },
        //     {
        //         test: /\.css$/,
        //         loader: "style-loader!css-loader"
        //     }, {
        //         test: /\.less$/,
        //         loader: "style!css!less"
        //     },
        //     { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        //     { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        //     {
        //         test: /node_modules\/auth0-lock\/.*\.js$/,
        //         loaders: [
        //             'transform-loader?brfs',
        //             'transform-loader?packageify'
        //         ]
        //     }, {
        //         test: /node_modules\/auth0-lock\/.*\.ejs$/,
        //         loader: 'transform-loader?ejsify'
        //     }, {
        //         test: /\.json$/,
        //         loader: 'json-loader'
        //     }
        // ]
//     },
//     externals: {
//         //don't bundle the 'react' npm package with our bundle.js
//         //but get it from a global 'React' variable
//         // 'react': 'React'
//     },
//     resolve: {
//         extensions: ['', '.js', '.jsx', '.css']
//     }
// };

var path = require('path');

var CLIENT_DIR = path.resolve(__dirname, 'client');
var SERVER_DIR = path.resolve(__dirname, 'server/generated');
var DIST_DIR = path.resolve(__dirname, 'dist');

var loaders = [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?harmony'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.less$/,
                loader: "style!css!less"
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
                test: /node_modules\/auth0-lock\/.*\.js$/,
                loaders: [
                    'transform-loader?brfs',
                    'transform-loader?packageify'
                ]
            }, {
                test: /node_modules\/auth0-lock\/.*\.ejs$/,
                loader: 'transform-loader?ejsify'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ];

module.exports = [{
  name: 'client',
  target: 'web',
  context: CLIENT_DIR,
  entry: './index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    alias: {
      components: path.resolve(CLIENT_DIR, 'components')
    }
  }
},
{
  name: 'server',
  target: 'node',
  context: CLIENT_DIR,
  entry: {
      app: '../src/serverApp.jsx'
    // app: 'components/app/index.js'
  },
  output: {
    path: SERVER_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: loaders
  },
  resolve: {
    alias: {
      components: path.resolve(CLIENT_DIR, 'components')
    }
  }
}];