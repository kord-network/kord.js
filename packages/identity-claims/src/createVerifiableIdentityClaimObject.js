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

import { signMessage } from './index.js'
import { bufferToHex, sha3 } from 'ethereumjs-util'

/**
 * Create a valid KORD Claim object to verify a new claim
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {String} claimMessage       Raw claim message
 * @param  {String} graph              KORD Graph name
 * @param  {String} subject            KORD ID of subject (hash of `username`)
 * @param  {Object} extraData          Any extra properties to add to claim object
 * @return {Object}                    KORD Claim object
 */
const createVerifiableIdentityClaimObject = (
  account,
  claimMessage,
  graph,
  subject,
  extraData = {}
) => {
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

  if (typeof claimMessage === 'undefined' || typeof claimMessage !== 'string') {
    throw new Error('`claimMessage` is undefined or not of type string.')
  }

  if (typeof graph === 'undefined' || typeof graph !== 'string') {
    throw new Error('`graph` is undefined or not of type string.')
  }

  if (typeof subject === 'undefined' || typeof subject !== 'string') {
    throw new Error('`subject` is undefined or not of type string.')
  }

  if (typeof extraData !== 'object') {
    throw new Error('`extraData` must be of type object.')
  }

  return Object.assign(
    {
      address: account.address,
      claimHash: bufferToHex(sha3(claimMessage)),
      claimMessage: claimMessage,
      graph: graph,
      signature: signMessage(claimMessage, account.privateKey),
      subject: subject,
    },
    extraData
  )
}

export default createVerifiableIdentityClaimObject
