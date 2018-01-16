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
  toBuffer,
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
 * @param  {String} subject            META Identity `id` of subject (hash of `username`)
 * @param  {Object} extraData          Any extra properties to add to identity claim object
 * @return {Object}                    META Identity Claim object
 */
export const createVerifiableIdentityClaimObject = (
  account,
  claimMessage,
  subject,
  extraData = {}
) => {
  return Object.assign(
    {
      address: account.address,
      claimHash: bufferToHex(sha3(claimMessage)),
      claimMessage: claimMessage,
      signature: signMessage(claimMessage, account.privateKey),
      subject: subject,
    },
    extraData
  )
}

/**
 * Create a valid META Identity Claim object for a profile claim
 * This is a self-issued claim, usually referencing a Swarm hash of profile data
 *
 * @param  {String} claimMessage      Raw identity claim message
 * @param  {Object} issuer            Claim issuer data object
 * @param  {String} issuer.id         META Identity `id` of claim issuer
 * @param  {String} issuer.privateKey Private key of claim issuer
 * @param  {String} subProperty       Type of profile claim contained in `claimMessage`
 * @return {Object}                   Verified META Identity Claim object
 */
export const createProfileMetaIdentityClaim = (
  claimMessage,
  issuer,
  subProperty
) => {
  return createVerifiedIdentityClaimObject(
    claimMessage,
    {
      id: issuer.id,
      privateKey: issuer.privateKey,
      property: `profile.${subProperty}`,
    },
    issuer.id
  )
}

/**
 * Create a valid META Identity Claim object to add to META Claims index
 *
 * @param  {String} claimMessage            Raw claim value
 * @param  {Object} claimService            Claim service configuration object
 * @param  {String} claimService.id         META Identity `id` of claim service (issuer)
 * @param  {String} claimService.privateKey Private key of claim service (issuer)
 * @param  {String} claimService.property   Property of identity claim
 * @param  {String} subject                 META Identity `id` of claim subject
 * @return {Object}                         Verified identity claim object
 */
export const createVerifiedIdentityClaimObject = (
  claimMessage,
  claimService,
  subject
) => {
  // generate verified claim buffer
  const verifiedClaimBuffer = sha3(
    Buffer.concat([
      toBuffer(claimService.id),
      toBuffer(subject),
      toBuffer(claimService.property),
      toBuffer(claimMessage),
    ])
  )

  // generate ECDSA signature of verified claim buffer using the claim service private key
  const signatureObject = ecsign(
    verifiedClaimBuffer,
    Buffer.from(claimService.privateKey, 'hex')
  )

  // convert ECDSA signature buffer to hex value
  const signature = toRpcSig(
    signatureObject.v,
    signatureObject.r,
    signatureObject.s
  )

  // return verified identity claim object
  return {
    claim: claimMessage,
    issuer: claimService.id,
    property: claimService.property,
    signature: signature,
    subject: subject,
  }
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
