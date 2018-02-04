/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
interface IRule {
  test: any,
  loader: string,
  enforce?: 'pre'
  include?: string[]
  options?: {
    [name: string]: any,
  }
}

export interface IWebpackConfig {
  entry: string | {
    [name: string]: string | string[],
  }
  output: {
    path: string,
    filename: string,
    publicPath: string,
  }
  resolve: {
    extensions: string[],
    alias: {[name: string]: string},
  }
  plugins: any[],
  module: {
    rules: IRule[]
  }
  devtool?: string
}
