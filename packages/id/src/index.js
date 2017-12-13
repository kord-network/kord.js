import { bufferToHex, sha3 } from 'ethereumjs-util'
import slugify from 'slugify'
import { signMessage } from '@meta.js/claims'

const META_ID_USERNAME_SUFFIX = 'id.meta'

/**
 * Create a valid META-ID object to register a new META Identity
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {String} username           Identity username
 * @return {Object}                    META-ID object
 */
export const createMetaIdObject = (account, username) => {
  return {
    owner: account.address,
    signature: signMessage(username, account.privateKey),
    username: username,
  }
}

/**
 * Get a META-ID `username` from a common name
 *
 * @param  {String} commonName Common name to use for META-ID username
 * @return {String}            META-ID username
 */
export const getMetaIdUsernameFromName = commonName =>
  `${slugify(commonName.toLowerCase())}.${META_ID_USERNAME_SUFFIX}`

/**
 * Convert a META-ID `username` into META-ID `id`
 *
 * @param  {String} username META-ID username string
 * @return {String}          META-ID id hex
 */
export const getMetaIdFromUsername = username => bufferToHex(sha3(username))
