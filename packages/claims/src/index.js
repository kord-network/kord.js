import {
  bufferToHex,
  ecrecover,
  ecsign,
  fromRpcSig,
  pubToAddress,
  sha3,
  toChecksumAddress,
  toRpcSig,
} from 'ethereumjs-util'

/**
 * Create a valid META Claim object to verify a new claim
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {Object} claimMessage       Raw claim message
 * @param  {Object} extraData          Any extra properties to add to claim object
 * @return {Object}                    META Claim object
 */
export const createMetaClaimObject = (
  account,
  claimMessage,
  extraData = {}
) => {
  return Object.assign(
    {
      address: account.address,
      claimHash: bufferToHex(sha3(claimMessage)),
      claimMessage: claimMessage,
      signature: signMessage(claimMessage, account.privateKey),
    },
    extraData
  )
}

/**
 * Recover address from claim hash
 *
 * @param  {String} claimHash sha3 hash of claim message
 * @param  {String} signature Ethereum RPC signature object
 * @return {String}           Recovered Ethereum public address hex
 */
export const recoverAddressFromClaim = (claimHash, signature) => {
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
 * Verify claim subject's address against recovered address
 *
 * @param  {String}  address   Ethereum address of claim subject
 * @param  {String}  claimHash sha3 hash of claim message
 * @param  {String}  signature Ethereum RPC signature object
 * @return {Boolean}           Verified
 */
export const verifyClaim = (address, claimHash, signature) => {
  // recover address from claim
  const recoveredAddress = recoverAddressFromClaim(claimHash, signature)

  // verify recovered address equals given address
  const verified = recoveredAddress === address

  return verified
}
