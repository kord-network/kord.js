import { config } from 'meta.js'

/**
 * Check if a META Identity Claim is a profile claim
 *
 * @param  {Object}  claim META Identity Claim object
 * @return {Boolean}       Profile claim boolean
 */
const isProfileClaim = claim => {
  if (typeof claim === 'undefined' || typeof claim !== 'object') {
    throw new Error('`claim` is undefined or not of type object.')
  }

  if (typeof claim.property === 'undefined') {
    throw new Error('`claim` is missing a `property` property.')
  }

  return claim.property.startsWith(`${config.META_ID_PROFILE_CLAIM_PREFIX}`)
}

export default isProfileClaim
