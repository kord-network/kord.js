import { config } from 'meta.js'

/**
 * Get the sub-property of a META Identity Profile Claim from the claim's property
 *
 * @example getProfileClaimSubPropertyFromProperty('profile.name') // => 'name'
 *
 * @param  {String} property Profile claim property
 * @return {String}          Profile claim sub-property
 */
const getProfileClaimSubPropertyFromProperty = property => {
  if (typeof property === 'undefined' || typeof property !== 'string') {
    throw new Error('`property` is undefined or not of type string.')
  }

  return property.replace(
    new RegExp(`${config.META_ID_PROFILE_CLAIM_PREFIX}`, 'i'),
    ''
  )
}

export default getProfileClaimSubPropertyFromProperty
