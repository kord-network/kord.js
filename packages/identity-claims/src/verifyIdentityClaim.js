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

import { recoverAddressFromIdentityClaim } from '@meta.js/identity-claims'

/**
 * Verify identity claim subject's address against recovered address
 *
 * @param  {String}  address   Ethereum address of identity claim subject
 * @param  {String}  claimHash sha3 hash of identity claim message
 * @param  {String}  signature Ethereum RPC signature object
 * @return {Boolean}           Verified
 */
const verifyIdentityClaim = (address, claimHash, signature) => {
  // recover address from identity claim
  const recoveredAddress = recoverAddressFromIdentityClaim(claimHash, signature)

  // verify recovered address equals given address
  const verified = recoveredAddress === address

  return verified
}

export default verifyIdentityClaim
