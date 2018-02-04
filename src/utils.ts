/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import _ from 'lodash'
import {IConfig} from '@/IConfig'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
interface ICssLoaderOptions {
  sourceMap: boolean
  minimize: boolean
  extract: boolean
}
interface ICssLoader {
  loader: string
  options: {
    indentedSyntax?: boolean
    minimize?: boolean
    sourceMap?: boolean
  }
}

export const resolvePath = (..._path: string[]) => {
  return path.resolve(..._path)
}

export const toStringObject = (object: {}): {} => {
  const stringObject: {} = {}
  _.forEach(object, (item: any, key: string) => {
    stringObject[key] = JSON.stringify(item)
  })
  return stringObject
}

const cssLoaders = (options: ICssLoaderOptions) => {
  const {sourceMap = false, minimize = false, extract = false} = options
  const cssLoader: ICssLoader = {
    loader: 'css-loader',
    options: {
      minimize,
      sourceMap,
    },
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader?: string, loaderOptions?: {}) {
    const loaders = [cssLoader]
    if(loader){
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if(extract){
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      })
    }else{
      return ['vue-style-loader'].concat(loaders as any)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    // postcss: generateLoaders(),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    less: generateLoaders('less'),
  }
}

export const isSourceMap = (isDev: boolean): boolean => {
  return isDev
}

export const isMinimize = (isDev: boolean): boolean => {
  return !isDev
}

export const isExtract = (isDev = false) => {
  return !isDev
}

export const vueLoaderConfig = (config: IConfig, isDevelopment: boolean): {} => {
  return {
    loaders: cssLoaders({
      sourceMap: isSourceMap(isDevelopment),
      minimize: isMinimize(isDevelopment),
      extract: isExtract(isDevelopment),
    }), // Css Modules option
    // https://vue-loader.vuejs.org/en/features/css-modules.html
    cssModules: {
      localIdentName: '[name]-[local]-[hash:base64:5]',
      camelCase: true,
    },
    transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href',
    },
  }
}