const metaIdentity = require('../dist/meta-identity')

describe('@meta.js/identity :: getUsernameFromName', () => {
  it('Should generate a META Identity username', () => {
    const commonName = 'Viktor Trón'

    const actual = metaIdentity.getUsernameFromName(commonName)
    const expected = 'viktor-tron.id.meta'

    expect(actual).toEqual(expected)
  })
})
