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
  createVerifiedIdentityClaimObject,
  verifyIdentityClaim,
} from './index.js'
import { KORD_GRAPH_BOOKMARK_CLAIM_PROPERTY } from '@kord.js/shared'
import { bufferToHex, sha3 } from 'ethereumjs-util'

/**
 * Create a valid KORD Claim object for a bookmark claim
 * A bookmark claim attests that a KORD ID has independently verified the claims
 * made about another KORD ID
 *
 * @param  {Array}  claims            Set of KORD Claims to verify
 * @param  {Object} graph             KORD Graph name
 * @param  {Object} issuer            KORD Agent initiating the bookmark claim
 * @param  {String} issuer.id         KORD ID of claim issuer
 * @param  {String} issuer.privateKey Private key of claim issuer
 * @param  {String} subject           KORD ID receiving the Bookmark claim
 * @return {Object}                   Verified KORD Graph Bookmark Claim
 */
const createBookmarkClaim = (claims, graph, issuer, subject) => {
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

  // verify all claims made about the subject KORD Agent
  const isKordGraphVerfied = claims.every(claim => {
    return verifyIdentityClaim(
      claim.issuerAddress,
      bufferToHex(sha3(claim.claim)),
      claim.signature
    )
  })

  // disallow bookmark claim if KORD Graph cannot be verified
  if (!isKordGraphVerfied) {
    return {
      error: new Error(
        'KORD Graph could not be verified. Ensure each claim has a valid `issuerAddress`.'
      ),
    }
  }

  // set claim message to the claim subject's `id`
  const claimMessage = subject

  // set claim `property` for bookmark claim
  const property = KORD_GRAPH_BOOKMARK_CLAIM_PROPERTY

  return createVerifiedIdentityClaimObject(
    claimMessage,
    graph,
    issuer,
    property,
    subject
  )
}

export default createBookmarkClaim
