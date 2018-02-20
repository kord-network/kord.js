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

import { bufferToHex, sha3 } from 'ethereumjs-util'
import {
  createVerifiedIdentityClaimObject,
  verifyIdentityClaim,
} from '@meta.js/identity-claims'
import { META_ID_FOLLOW_CLAIM_PROPERTY } from '@meta.js/shared'

/**
 * Create a valid META Identity Claim object for a follow claim
 * A follow claim attests that a META ID has independently verified the claims
 * made about another META ID
 *
 * @param  {Array}  claims            Set of META Identity Claims to verify
 * @param  {Object} graph             META Claims Graph name
 * @param  {Object} issuer            META Identity initiating the follow claim
 * @param  {String} issuer.id         META Identity `id` of claim issuer
 * @param  {String} issuer.privateKey Private key of claim issuer
 * @param  {String} subject           META Identity `id` receiving the follow claim
 * @return {Object}                   Verified META Identity Follow Claim
 */
const followMetaIdentity = (claims, graph, issuer, subject) => {
  if (typeof claims === 'undefined' || !Array.isArray(claims)) {
    throw new Error('`claims` is undefined or not an array.')
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

  if (typeof subject === 'undefined' || typeof subject !== 'string') {
    throw new Error('`subject` is undefined or not of type string.')
  }

  // verify all claims made about the subject META Identity
  const isMetaIdentityVerfied = claims.every(claim => {
    return verifyIdentityClaim(
      claim.issuerAddress,
      bufferToHex(sha3(claim.claim)),
      claim.signature
    )
  })

  // disallow follow claim if META Identity cannot be verified
  if (!isMetaIdentityVerfied) {
    return {
      error: new Error(
        'META Identity could not be verified. Ensure each claim has a valid `issuerAddress`.'
      ),
    }
  }

  // set claim message to the claim subject's `id`
  const claimMessage = subject

  // set claim `property` for follow claim
  const property = META_ID_FOLLOW_CLAIM_PROPERTY

  return createVerifiedIdentityClaimObject(
    claimMessage,
    graph,
    issuer,
    property,
    subject
  )
}

export default followMetaIdentity
