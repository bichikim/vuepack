/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
const needVersion = {first: 8, second: 9}
export const isAbleToRun = (nodeVersion) => {
  const [first, second] = nodeVersion.slice(1).split('.')
  return !(first < needVersion.first || second < needVersion.second)
}
