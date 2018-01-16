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

import { ecsign, sha3, toBuffer, toRpcSig } from 'ethereumjs-util'

/**
 * Create a valid META Identity Claim object to add to META Claims index
 *
 * @param  {String} claimMessage      Raw claim value
 * @param  {Object} issuer            Claim issuer data object
 * @param  {String} issuer.id         META Identity `id` of claim issuer
 * @param  {String} issuer.privateKey Private key of claim issuer
 * @param  {String} property          Property of identity claim
 * @param  {String} subject           META Identity `id` of claim subject
 * @return {Object}                   Verified identity claim object
 */
const createVerifiedIdentityClaimObject = (
  claimMessage,
  issuer,
  property,
  subject
) => {
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
    issuer: issuer.id,
    property: property,
    signature: signature,
    subject: subject,
  }
}

export default createVerifiedIdentityClaimObject
