const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PrefetchPolyfillPlugin = require('prefetch-polyfill-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === "production"
const extractScss = new ExtractTextPlugin('css/[name]-[contenthash].css', {
	disable: !isProd
})
const extractVueS = new ExtractTextPlugin('css/own-[name]-[contenthash].css', {
	disable: !isProd,
	allChunks: true
})
const config = {
	devtool: isProd ? false : 'inline-source-map',
	entry: {
		app: './src/app',
		vendor: ['vue', 'vue-router', 'vuex']
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash].js',
		publicPath: !isProd ? '/' : 'http://koa.jcmark.cn'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					loaders: {
						scss: extractVueS.extract({
								fallback: 'vue-style-loader',
								use: [{
									loader: 'css-loader',
									options: {
										minimize: isProd
									}
								}, {
									loader: 'postcss-loader'
								}, {
									loader: 'sass-loader'
								}
								]
							})
					},
					postLoaders: {
						html: 'babel-loader'
					}
				}
			},
			// js babel 转义
			{
				exclude: /node_modules/,
				test: /\.js/,
				use: 'babel-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: extractScss.extract({
					fallback: 'style-loader',
					use: [
							{ loader: 'css-loader',
								options: {
									minimize: isProd
								}
							},
							{loader: 'postcss-loader'},
							{loader: 'sass-loader'}
						]
				})
			},
			// 对于静态资源
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000,
							outputPath: isProd ? 'static/' : '/'
						}
					}
				]
			},
			// 字体等等
			{
				test: /\.ttf$/,
				loader: "url-loader",
				options: {
					limit: 1000,
					outputPath: isProd ? 'static/' : '/'
				}
			},
			{
				test: /\.(eot|woff)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 1000,
							outputPath: isProd ? 'static/' : '/'
						}
					}
				]
			},
		]
	},
	plugins: [
		extractVueS,
		extractScss,
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,'../src/index.html'),
			filename: 'index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new  webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: Infinity
		})
	],
}
if (isProd) {
	config.plugins.push(new webpack.EnvironmentPlugin({
		NODE_ENV: 'production',
		DEBUG: false
	}))
	config.plugins.push(
		new UglifyJsPlugin({
			test: /\.(js)$/i
		})
	)
	config.plugins.push(
		new PrefetchPolyfillPlugin()
	)
	config.plugins.push(
		new CompressionPlugin({
			test: /\.js$|\.css$|\.html$/
		})
	)
} else {
	config.devServer = {
		//静态资源name
		//contentBase: path.join(__dirname, '../dist'),
		allowedHosts: [
			'.jcmark.com',
		],
		port: 9000
	}
}
module.exports = config
