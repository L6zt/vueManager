const path = require('path')
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
	entry: './src/app',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'app.[hash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader'
					},
					postLoaders: {
						html: 'babel-loader'
					}
				}
			},
			{
				test: /\.js/,
				use: ['babel-loader']
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000
						}
					}
				]
			}
		]
	},
	devServer: {
		//静态资源
		//contentBase: path.join(__dirname, '../dist'),
		allowedHosts: [
			'.jcmark.com',
		],
		port: 9000
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin({
		})
	]
}