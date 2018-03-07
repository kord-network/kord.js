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

import {
  bufferToHex,
  ecrecover,
  fromRpcSig,
  isValidSignature,
  pubToAddress,
  toChecksumAddress,
} from 'ethereumjs-util'

/**
 * Recover address from identity claim hash
 *
 * @param  {String} claimHash sha3 hash of identity claim message
 * @param  {String} signature Ethereum RPC signature object
 * @return {String}           Recovered Ethereum public address hex
 */
const recoverAddressFromIdentityClaim = (claimHash, signature) => {
  if (typeof claimHash === 'undefined' || typeof claimHash !== 'string') {
    throw new Error('`claimHash` is undefined or not of type string.')
  }

  // generate signature parameters
  const { v, r, s } = fromRpcSig(signature)

  if (typeof signature === 'undefined' || !isValidSignature(v, r, s)) {
    throw new Error('`signature` is not a valid Ethereum RPC signature.')
  }

  // generate claim buffer from claim hash minus `0x` prefix
  const claimBuffer = Buffer.from(claimHash.substring(2), 'hex')

  // recover public key from claim
  const recoveredPublicKey = ecrecover(claimBuffer, v, r, s)

  // generate Ethereum address hex from public key
  const recoveredAddress = toChecksumAddress(
    bufferToHex(pubToAddress(recoveredPublicKey))
  )

  return recoveredAddress
}

export default recoverAddressFromIdentityClaim
