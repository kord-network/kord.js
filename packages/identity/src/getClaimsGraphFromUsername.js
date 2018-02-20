/**
 This file is part of the meta.js library.

 Copyright (C) 2017 JAAK MUSIC LTD

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

 If you have any questions please contact yo@jaak.io
*/

import { META_ID_USERNAME_SUFFIX } from '@meta.js/shared'

/**
 * Get a META Claims Graph from a `username`
 *
 * @param  {String} username META Identity username
 * @return {String}          META Claims Graph name
 */
const getClaimsGraphFromUsername = username => {
  if (typeof username === 'undefined' || typeof username !== 'string') {
    throw new Error('`username` is undefined or not of type string.')
  }

  return `${username}${META_ID_USERNAME_SUFFIX}`
}

export default getClaimsGraphFromUsername
