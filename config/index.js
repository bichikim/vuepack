/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 * @copyright Naree Co.
 * @license MIT
 */
module.exports = {
  babel: {
    'presets': [[
      'env', {
        'targets': {
          'node': '8.9.1',
        },
      },
    ], 'stage-2', 'stage-3'],
  },
}
