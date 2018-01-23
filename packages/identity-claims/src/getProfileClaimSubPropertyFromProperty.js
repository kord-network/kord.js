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

import { META_ID_PROFILE_CLAIM_PREFIX } from '@meta.js/shared'

/**
 * Get the sub-property of a META Identity Profile Claim from the claim's property
 *
 * @example getProfileClaimSubPropertyFromProperty('profile.name') // => 'name'
 *
 * @param  {String} property Profile claim property
 * @return {String}          Profile claim sub-property
 */
const getProfileClaimSubPropertyFromProperty = property => {
  if (typeof property === 'undefined' || typeof property !== 'string') {
    throw new Error('`property` is undefined or not of type string.')
  }

  return property.replace(
    new RegExp(`${META_ID_PROFILE_CLAIM_PREFIX}`, 'i'),
    ''
  )
}

export default getProfileClaimSubPropertyFromProperty
