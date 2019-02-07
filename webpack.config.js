const path    = require('path');
const devMode = !(process.argv.indexOf('-p') !== -1);
const webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const tailwind = require('tailwindcss');
const purgeCss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cleanWebpackPlugin = require("clean-webpack-plugin");

const JSLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"],
            plugins: []
        }
    }
};

const ESLintLoader = {
    test: /\.js$/,
    enforce: "pre",
    exclude: /node_modules/,
    use: {
        loader: "eslint-loader",
        options: {
            configFile: __dirname + "/.eslintrc"
        }
    }
};

const CSSLoader = {
    test: /\.css$/,
    use: [
        {
            loader: miniCssExtractPlugin.loader,
            options: {}
        },
        {
            loader: "css-loader",
            options: {
                importLoaders: 1
            }
        },
        {
            loader: "postcss-loader",
            options: {
                ident: "postcss",
                parser: "postcss-scss",
                plugins: () => [
                    postcssImport(),
                    postcssNested(),
                    tailwind('./tailwind.config.js'),
                    purgeCss({
                        content: ['./src/templates/**/*.twig'],
                        extractors: [
                            {
                                extractor: TailwindExtractor,
                                extensions: ["twig"]
                            }
                        ]
                    }),
                    postcssPresetEnv({
                        preserve: false,
                        browsers: "last 2 versions",
                        stage: 2
                    }),
                    cssnano()
                ]
            }
        }
    ]
};


// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

const assetbundleSrc = './src/assetbundles/src';
const assetbundleDist = './src/assetbundles/dist';

module.exports = {
    entry: {
        'field-product-details': `${assetbundleSrc}/js/field-product-details.js`,
        'settings-discount': `${assetbundleSrc}/js/settings-discount.js`,
        'settings-plugin': `${assetbundleSrc}/js/settings-plugin.js`,
        'widget-orders': `${assetbundleSrc}/js/widget-orders.js`,
    },
    module: {
        rules: [CSSLoader, JSLoader, ESLintLoader]
    },
    plugins: [
        new miniCssExtractPlugin({
            publicPath: path.resolve(__dirname, assetbundleDist),
            filename: "css/[name].css",
        }),
        new cleanWebpackPlugin(
            [`${assetbundleDist}/js`, `${assetbundleDist}/css`],
            {
                root: path.resolve(__dirname, "./"),
                verbose: false,
                dry: false
            }
        )
    ],
    output: {
        path: path.resolve(__dirname, assetbundleDist),
        filename: "js/[name].js"
    },
};