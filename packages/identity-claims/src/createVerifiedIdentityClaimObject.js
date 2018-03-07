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

import { ecsign, sha3, toBuffer, toRpcSig } from 'ethereumjs-util'

/**
 * Create a valid KORD Claim object to add to a KORD Graph
 *
 * @param  {String} claimMessage      Raw claim value
 * @param  {Object} graph             KORD Graph name
 * @param  {Object} issuer            Claim issuer data object
 * @param  {String} issuer.id         KORD ID of claim issuer
 * @param  {String} issuer.privateKey Private key of claim issuer
 * @param  {String} property          Property of identity claim
 * @param  {String} subject           KORD ID of claim subject
 * @return {Object}                   Verified identity claim object
 */
const createVerifiedIdentityClaimObject = (
  claimMessage,
  graph,
  issuer,
  property,
  subject
) => {
  if (typeof claimMessage === 'undefined' || typeof claimMessage !== 'string') {
    throw new Error('`claimMessage` is undefined or not of type string.')
  }

  if (typeof graph === 'undefined' || typeof graph !== 'string') {
    throw new Error('`graph` is undefined or not of type string.')
  }

  if (typeof issuer === 'undefined' || typeof issuer !== 'object') {
    throw new Error('`issuer` is undefined or not of type object.')
  }

  if (!issuer.hasOwnProperty('id') || typeof issuer.id !== 'string') {
    throw new Error('`issuer.id` is undefined or not of type string.')
  }

  if (
    !issuer.hasOwnProperty('privateKey') ||
    typeof issuer.privateKey !== 'string'
  ) {
    throw new Error('`issuer.privateKey` is undefined or not of type string.')
  }

  if (typeof property === 'undefined' || typeof property !== 'string') {
    throw new Error('`property` is undefined or not of type string.')
  }

  if (typeof subject === 'undefined' || typeof subject !== 'string') {
    throw new Error('`subject` is undefined or not of type string.')
  }

  // generate verified claim buffer
  const verifiedClaimBuffer = sha3(
    Buffer.concat([
      toBuffer(issuer.id),
      toBuffer(subject),
      toBuffer(property),
      toBuffer(claimMessage),
    ])
  )

  // generate ECDSA signature of verified claim buffer using the claim service private key
  const signatureObject = ecsign(
    verifiedClaimBuffer,
    Buffer.from(issuer.privateKey, 'hex')
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
    graph: graph,
    issuer: issuer.id,
    property: property,
    signature: signature,
    subject: subject,
  }
}

export default createVerifiedIdentityClaimObject
