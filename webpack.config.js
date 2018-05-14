const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './abc.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },
  mode: 'development',
  module: {
    rules: [
        {   test: /\.css$/, 
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }   
    ]
  },
  devServer: {
    contentBase: './public'
  },
  plugins: [
    new ExtractTextPlugin("../css/styles.css"),
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};