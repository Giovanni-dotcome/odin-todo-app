const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts', // Entry point for your application
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true, // Clean the output directory before emit
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve these extensions
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Process TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.sass$/i, // Process Sass files
                use: [
                    'style-loader', // Injects styles into the DOM
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader', // Compiles Sass to CSS
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Specify your HTML template
            filename: 'index.html',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true, // Enable gzip compression
        port: 9000, // Dev server port
        open: true, // Open the browser after server is started
    },
    mode: 'development', // Set the mode to development
};
