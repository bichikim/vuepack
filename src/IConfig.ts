/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
export interface IConfig {
  webFolder: {
    static: string
  }
  devFolder: {
    dist: string,
    root: string,
    static: string,
  }
  devFile: {
    entry: string,
  }
  env: {

  }
}