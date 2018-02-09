import {IConfig} from './IConfig'
import {toStringObject, vueLoaderConfig, isSourceMap, isMinimize, resolvePath} from './utils'
import autoPreFixer from 'autoprefixer'
import webpack from 'webpack'
import babelConfig from './babel'
import browsersConfig from './browsers'
import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import {IWebpackConfig} from './IWebpackConfig'
const DEVELOPMENT = 'development', PRODUCTION = 'production'
export default (config: IConfig, isDev = false): IWebpackConfig => {
  const publicPath = (): string => {
    return config.webFolder.static
  }
  const sourceMap = (): boolean => {
    return isSourceMap(isDev)
  }

  const resolve = (..._path: string[]): string => {
    return resolvePath(config.devFolder.root, ..._path)
  }

  const staticPath = (): string => {
    return resolve(config.devFolder.dist, config.devFolder.static)
  }

  const outputPath = (): string => {
    return config.devFolder.dist
  }

  const minimize = (): boolean => {
    return isMinimize(isDev)
  }

  const entry = (): string => {
    return config.devFile.entry
  }

  const babel = (): {} => {
    return babelConfig
  }
  const browsers = (): any[] => {
    return browsersConfig
  }

  return {
    entry: {
      app: ['babel-polyfill', entry()],
    },
    output: {
      path: outputPath(),
      filename: '[name].js', // public path define public path in index.html
      publicPath: publicPath(),
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': isDev ? DEVELOPMENT : PRODUCTION,
          ...toStringObject(config.env),
        },
      })],
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('src'), resolve('test')],
          options: {
            formatter: eslintFriendlyFormatter,
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: Object.assign(vueLoaderConfig(config, isDev), {
            postcss: [
              // post css add or fix css for all browser
              autoPreFixer({
                browsers: browsers(),
              })],
            loaders: {
              js: {
                loader: 'babel-loader', options: babel(),
              },
            },
          }),
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test')],
          options: babel(),
        },
        {
          test: /\.css$/,
          loader: 'css-loader',
          options: {
            minimize: minimize(), sourceMap: sourceMap(),
          },
        },
        {
          test: /\.scss$/,
          loader: 'sass-loader',
          options: {
            minimize: minimize(), sourceMap: sourceMap(),
          },
        },
        {
          test: /\.sass$/,
          loader: 'sass-loader',
          options: {
            minimize: minimize(), sourceMap: sourceMap(), indentedSyntax: true,
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000, name: `${staticPath()}/img/[name].[hash:7].[ext]'`,
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000, name: `${staticPath()}/media/[name].[hash:7].[ext]`,
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000, name: `${staticPath()}/fonts/[name].[hash:7].[ext]`,
          },
        },
      ],
    },
  }
}