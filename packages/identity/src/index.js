import { bufferToHex, sha3 } from 'ethereumjs-util'
import slugify from 'slugify'
import { signMessage } from '@meta.js/identity-claims'

const META_ID_USERNAME_SUFFIX = 'id.meta'

/**
 * Create a valid META Identity object to register a new META Identity
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {String} username           Identity username
 * @return {Object}                    META Identity object
 */
export const createIdentityObject = (account, username) => {
  return {
    owner: account.address,
    signature: signMessage(username, account.privateKey),
    username: username,
  }
}

/**
 * Get a META Identity `username` from a common name
 *
 * @param  {String} commonName Common name to use for META Identity username
 * @return {String}            META Identity username
 */
export const getUsernameFromName = commonName =>
  `${slugify(commonName.toLowerCase())}.${META_ID_USERNAME_SUFFIX}`

/**
 * Convert a META Identity `username` into META Identity `id`
 *
 * @param  {String} username META Identity `username` string
 * @return {String}          META Identity `id` hex
 */
export const getIdFromUsername = username => bufferToHex(sha3(username))
