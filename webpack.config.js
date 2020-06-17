const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isProd = process.env.NODE_ENV === `production`;
const isDev = !isProd;


const filename = (ext) => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`

const jsLoaders = () => {
	const loaders = [
		{
			loader: `babel-loader`,
			options: {
				presets: [`@babel/preset-env`],
				plugins: [`@babel/plugin-proposal-class-properties`],
			},
		},
	];

	if(isDev) {
		loaders.push(`eslint-loader`);
	}

	return loaders;
}

module.exports = {
	context: path.resolve(__dirname, `src`),
	mode: `development`,
	entry: [`@babel/polyfill`, `./index.js`],
	output: {
		filename: filename(`js`),
		path: path.resolve(__dirname, `dist`),
	},
	resolve: {
		extensions: [`.js`],
		alias: {
			'@': path.resolve(__dirname, `src`),
			'@core': path.resolve(__dirname, `src/core`),
		},
	},
	devtool: isDev ? `source-map` : false,
	devServer: {
		// contentBase: path.join(__dirname, `dist`),
		hot: isDev,
		port: 3000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, `src/favicon.ico`),
					to: path.resolve(__dirname, `dist`),
				},
			],
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename(`css`),
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						},
					},
					`css-loader`,
					`sass-loader`,
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
		],
	},
}
