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

import { isValidAddress } from 'ethereumjs-util'
import { signMessage } from '@meta.js/identity-claims'

/**
 * Create a valid META Identity object to register a new META Identity
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {String} username           Identity username
 * @return {Object}                    META Identity object
 */
const createIdentityObject = (account, username) => {
  if (typeof account === 'undefined' || typeof account !== 'object') {
    throw new Error('`account` is undefined or not of type object.')
  }

  if (!account.hasOwnProperty('address') || !isValidAddress(account.address)) {
    throw new Error('`address` is not a valid Ethereum public address.')
  }

  if (
    !account.hasOwnProperty('privateKey') ||
    typeof account.privateKey !== 'string'
  ) {
    throw new Error('`privateKey` is not a valid Ethereum private key.')
  }

  if (typeof username === 'undefined' || typeof username !== 'string') {
    throw new Error('`username` is undefined or not of type string.')
  }

  return {
    owner: account.address,
    signature: signMessage(username, account.privateKey),
    username: username,
  }
}

export default createIdentityObject
