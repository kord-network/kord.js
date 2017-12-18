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

import { bufferToHex, sha3 } from 'ethereumjs-util'
import slugify from 'slugify'
import { signMessage } from '@meta.js/identity-claims'

const META_ID_USERNAME_SUFFIX = 'id.meta'

/**
 * Create a valid META Identity object to register a new META Identity
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {String} username           Identity username
 * @return {Object}                    META Identity object
 */
export const createIdentityObject = (account, username) => {
  return {
    owner: account.address,
    signature: signMessage(username, account.privateKey),
    username: username,
  }
}

/**
 * Get a META Identity `username` from a common name
 *
 * @param  {String} commonName Common name to use for META Identity username
 * @return {String}            META Identity username
 */
export const getUsernameFromName = commonName =>
  `${slugify(commonName.toLowerCase())}.${META_ID_USERNAME_SUFFIX}`

/**
 * Convert a META Identity `username` into META Identity `id`
 *
 * @param  {String} username META Identity `username` string
 * @return {String}          META Identity `id` hex
 */
export const getIdFromUsername = username => bufferToHex(sha3(username))
