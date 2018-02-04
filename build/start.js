/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 * @copyright Naree Co.
 * @license MIT
 */
import appRootPath from 'app-root-path'
import joinPath from 'join-path'
import chalk from 'chalk'
import webpack from 'webpack'
import ora from 'ora'
import startConfig from './start.config'
const {entryName} = startConfig
const root = appRootPath.path
const {argv} = process
const [engineName, what, runningType, ...others] = argv
const configRootPath = joinPath(root, startConfig.webpackConfigPath)
const spinner = ora('Building ...')
const logReadingError = (message = '') => {
  console.log(chalk.grey('Reading webpack config ') + chalk.red('error') + message)
}
const logPackingComplete = (message = '') => {
  console.log(chalk.cyan('Building complete') + message)
}
const runApp = (where) => {
  require(where)
}
let config
console.log(chalk.grey('Running on ') + chalk.green(engineName))
console.log(chalk.grey('Running a ') + chalk.green(what))
try{
  config = require(configRootPath)
}catch(error){
  logReadingError()
  throw error
}
if(!config.entry || !config.entry[entryName]){
  logReadingError(' -> ' + chalk.red('no entry name') + chalk.grey(': ') + chalk.green(entryName))
  throw new Error(`webpack config has no entry name: ${entryName}`)
}
console.log(chalk.grey('Reading webpack config from ') + chalk.green(configRootPath) + '\n')

spinner.start()
webpack(config, function(err, stats) {
  spinner.stop()
  if(err){
    throw err
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n\n')
  const appPath = joinPath(root, 'dist', entryName)
  if(runningType === 'start'){
    logPackingComplete(
      chalk.grey(' and ') +
      chalk.cyan('Starting ') + chalk.green('App') + chalk.grey(' -> ') +
      chalk.green(appPath) + '\n'
    )
    process.argv = [engineName, what, ...others]
    setTimeout(() => {
      runApp(appPath)
    }, 1)
    return
  }
  logPackingComplete()
})