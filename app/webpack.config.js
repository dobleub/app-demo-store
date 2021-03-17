const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rules = [
	{
		test: /\.tsx?/,
		exclude: /node_modules/,
		loader: 'babel-loader'
	},
	{
		test: /\.html$/,
		loader: 'html-loader'
	},
	{
		test: /\.scss$/,
		use: [
			"style-loader", // creates style nodes from JS strings
			"css-loader", // translates CSS into CommonJS
			"sass-loader" // compiles Sass to CSS
		]
	}
];

module.exports = {
	target: 'web',
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/[name].bundle.js',
    	chunkFilename: 'js/[name].bundle.js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	module: { rules },
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css', '.scss', '.sass']
	},
	devServer: {
		contentBase: './build',
		host: '0.0.0.0',
		port: 8080
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'static/index.html'
		})
	]
}