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

import { config } from 'meta.js'
import { createVerifiedIdentityClaimObject } from '@meta.js/identity-claims'

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
const createProfileMetaIdentityClaim = (claimMessage, issuer, subProperty) => {
  if (typeof claimMessage === 'undefined' || typeof claimMessage !== 'string') {
    throw new Error('`claimMessage` is undefined or not of type string.')
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

  if (typeof subProperty === 'undefined' || typeof subProperty !== 'string') {
    throw new Error('`subProperty` is undefined or not of type string.')
  }

  const property = `${config.META_ID_PROFILE_CLAIM_PREFIX}${subProperty}`

  return createVerifiedIdentityClaimObject(
    claimMessage,
    {
      id: issuer.id,
      privateKey: issuer.privateKey,
    },
    property,
    issuer.id
  )
}

export default createProfileMetaIdentityClaim
