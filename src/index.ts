/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 * @copyright Naree Co.
 * @license MIT
 */

import chalk from 'chalk'
import minimist from 'minimist'
import webpack from 'webpack'
import getWebpackConfig from './webpack.config'
const {argv}: {argv: string[]} = process
const [engineName, what, ...others]: string[] = argv
console.log(chalk.grey('Running on ') + chalk.green(engineName))
console.log(chalk.grey('Running a ') + chalk.green(what))
const args = minimist(others, {
  alias: {
    c: 'config',
  },
})
const configPath: string = args.config || './vuepack.config.js'

const webpackConfig = getWebpackConfig(require(configPath))
console.log(configPath, others[0], others[1])
