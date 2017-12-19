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

import {
  bufferToHex,
  ecrecover,
  ecsign,
  fromRpcSig,
  pubToAddress,
  sha3,
  toChecksumAddress,
  toRpcSig,
} from 'ethereumjs-util'

/**
 * Create a valid META Identity Claim object to verify a new identity claim
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {Object} claimMessage       Raw identity claim message
 * @param  {Object} extraData          Any extra properties to add to identity claim object
 * @return {Object}                    META Identity Claim object
 */
export const createIdentityClaimObject = (
  account,
  claimMessage,
  extraData = {}
) => {
  return Object.assign(
    {
      address: account.address,
      claimHash: bufferToHex(sha3(claimMessage)),
      claimMessage: claimMessage,
      signature: signMessage(claimMessage, account.privateKey),
    },
    extraData
  )
}

/**
 * Recover address from identity claim hash
 *
 * @param  {String} claimHash sha3 hash of identity claim message
 * @param  {String} signature Ethereum RPC signature object
 * @return {String}           Recovered Ethereum public address hex
 */
export const recoverAddressFromIdentityClaim = (claimHash, signature) => {
  // generate signature parameters
  const { v, r, s } = fromRpcSig(signature)

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

/**
 * Generate a valid ECDSA signature for use with Ethereum RPC clients
 *
 * @param  {String} message    Message to sign
 * @param  {String} privateKey Private key to sign message with
 * @return {String}            ECDSA signature
 */
export const signMessage = (message, privateKey) => {
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

/**
 * Verify identity claim subject's address against recovered address
 *
 * @param  {String}  address   Ethereum address of identity claim subject
 * @param  {String}  claimHash sha3 hash of identity claim message
 * @param  {String}  signature Ethereum RPC signature object
 * @return {Boolean}           Verified
 */
export const verifyIdentityClaim = (address, claimHash, signature) => {
  // recover address from identity claim
  const recoveredAddress = recoverAddressFromIdentityClaim(claimHash, signature)

  // verify recovered address equals given address
  const verified = recoveredAddress === address

  return verified
}
