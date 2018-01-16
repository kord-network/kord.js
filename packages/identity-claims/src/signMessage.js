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

import { ecsign, sha3, toRpcSig } from 'ethereumjs-util'

/**
 * Generate a valid ECDSA signature for use with Ethereum RPC clients
 *
 * @param  {String} message    Message to sign
 * @param  {String} privateKey Private key to sign message with
 * @return {String}            ECDSA signature
 */
const signMessage = (message, privateKey) => {
  // convert privateKey hex string to Buffer
  const bufferPrivateKey = Buffer.from(privateKey, 'hex')

  // create a sha3 hash of the message
  const msgHash = sha3(message)

  // generate signature of the message hash using the private key Buffer
  const signature = ecsign(msgHash, bufferPrivateKey)

  // convert signature to a hex string accepted by Ethereum RPC clients
  const rpcSignature = toRpcSig(signature.v, signature.r, signature.s)

  return rpcSignature
}

export default signMessage
