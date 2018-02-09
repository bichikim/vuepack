/* eslint-disable no-console */
/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
// const {resolve} = require('path')
import minimist from 'minimist'
const argv = minimist(process.argv.slice(2), {
  alias: {
    c: 'config',
    w: 'webpack',
  },
})

console.log('hi?')
console.log(argv)

