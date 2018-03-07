/**
 This file is part of the kord.js library.

 Copyright (C) 2018 JAAK MUSIC LTD

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

import { signMessage } from '@kord.js/identity-claims'

/**
 * Generate input object for the KORD graph hash mutation
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Ethereum public address
 * @param  {String} account.privateKey Ethereum private key
 * @param  {String} hash               Swarm hash to sign
 * @return {Object}
 */
const createSetGraphInput = (account, hash) => {
  if (typeof account === 'undefined' || typeof account !== 'object') {
    throw new Error('`account` is undefined or not of type object.')
  }

  if (
    !account.hasOwnProperty('address') ||
    typeof account.address !== 'string'
  ) {
    throw new Error('`account.address` is undefined or not of type string.')
  }

  if (
    !account.hasOwnProperty('privateKey') ||
    typeof account.privateKey !== 'string'
  ) {
    throw new Error('`account.privateKey` is undefined or not of type string.')
  }

  if (typeof hash === 'undefined' || typeof hash !== 'string') {
    throw new Error('`hash` is undefined or not of type string.')
  }

  return {
    hash: hash,
    id: account.address,
    signature: signMessage(hash, account.privateKey),
  }
}

export default createSetGraphInput
