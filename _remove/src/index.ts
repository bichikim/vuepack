/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 * @copyright Naree Co.
 * @license MIT
 */

import chalk from 'chalk'
import minimist from 'minimist'
//import webpack from 'webpack'
import getWebpackConfig from './webpack.config'
const {argv}: {argv: string[]} = process
const [engineName, what, ...others]: string[] = argv
console.log(chalk.grey('Running on ') + chalk.green(engineName))
console.log(chalk.grey('Running a ') + chalk.green(what))
const args = minimist(others, {
  alias: {
    c: 'config',
    d: 'development',
  },
})
const configPath: string = args.config || './vuepack.config.js'
const {development = false} = args
const webpackConfig = getWebpackConfig(require(configPath), development)
console.log(webpackConfig, others[0], others[1])
