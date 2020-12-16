const path = require('path')
const HTMLWebpackPLugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    context:  path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main:  './index.tsx',
    },
    devtool: 'source-map',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', 'jpg', '.jpeg']
    },
    plugins: [
        new HTMLWebpackPLugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/static'), to: path.resolve(__dirname, 'dist/static') }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'dist/styles',
                        },
                    },
                    'css-loader', 'sass-loader']
            },
            {
                test: /\.сss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'dist/styles',
                        },
                    },
                    'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }]
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }]
            }
        ]
    }
}
