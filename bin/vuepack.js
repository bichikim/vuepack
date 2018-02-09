/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 * @copyright Naree Co.
 * @license MIT
 */
import chalk from 'chalk'
import {isAbleToRun} from './version'
const {join} = require('path')
const [engineName, what, runningFor, ...others] = process.argv
const {version} = process
console.log(chalk.grey('Running on ') + chalk.green(engineName))
console.log(chalk.grey('Running a ') + chalk.green(what) + chalk.grey(` ${version}`))
const defaultCommand = 'build'
const commands = new Set([defaultCommand, 'start', 'test'])
const nextArgv = [engineName, what, ...others]
let nextRun = defaultCommand
if(commands.has(runningFor)){
  nextRun = runningFor
}

console.log(chalk.grey('Running for ') + chalk.green(nextRun))
process.argv = nextArgv
if(isAbleToRun(version)){
  require(join(__dirname, `${nextRun}.js`))
}else{
  console.log(chalk.grey(`It cannot Run on ${engineName}`) + chalk.red(` ${version}`))
}





