/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import browsers from './browsers'
export default {
  plugins: ['lodash'],
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {browsers},
      },
    ],
    'stage-2', 'stage-3',
  ],
  env: {
    test: {
      presets: ['env', 'stage-2', 'stage-3'],
      plugins: ['istanbul'],
    },
  },
}
