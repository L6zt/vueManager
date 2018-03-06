const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
	devtool: 'inline-source-map',
	entry: {
		app: './src/app',
		common: ['vue']
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader'
					},
					postLoaders: {
						html: 'babel-loader'
					}
				}
			},
			{
				exclude: /node_modules/,
				test: /\.js/,
				use: 'babel-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
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
			},
			{
				test: /\.ttf$/,
				loader: "url-loader"
			},
			{
				test: /\.(eot|woff)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 1000
						}
					}
				]
			},
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
			template: path.resolve(__dirname,'../src/index.html'),
			filename: 'index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
		// new webpack.HotModuleReplacementPlugin({
		// })
	]
}