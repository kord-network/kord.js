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

import { recoverAddressFromIdentityClaim } from './index.js'
import { isValidAddress } from 'ethereumjs-util'

/**
 * Verify identity claim subject's address against recovered address
 *
 * @param  {String}  address   Ethereum address of identity claim subject
 * @param  {String}  claimHash sha3 hash of identity claim message
 * @param  {String}  signature Ethereum RPC signature hash
 * @return {Boolean}           Verified
 */
const verifyIdentityClaim = (address, claimHash, signature) => {
  if (typeof address === 'undefined' || !isValidAddress(address)) {
    throw new Error('`address` is not a valid Ethereum public address.')
  }

  if (typeof claimHash === 'undefined' || typeof claimHash !== 'string') {
    throw new Error('`claimHash` is undefined or not of type string.')
  }

  if (typeof signature === 'undefined' || typeof signature !== 'string') {
    throw new Error('`signature` is undefined or not of type string.')
  }

  // recover address from identity claim
  const recoveredAddress = recoverAddressFromIdentityClaim(claimHash, signature)

  // verify recovered address equals given address
  const verified = recoveredAddress === address

  return verified
}

export default verifyIdentityClaim
