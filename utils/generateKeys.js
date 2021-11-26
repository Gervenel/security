const rsa = require('js-crypto-rsa')
const xml = require('xml-js')
const { writeFileSync } = require('fs')

const generateKeys = async () => {
    return { privateKey, publicKey } = await rsa.generateKey(2048)
}

const getXMLString = (data) => {
    return xml.json2xml(data, {compact: true, spaces: 4})
}

const exportKeysToXML = async (path = './', fileName = 'keys.xml') => {
    const keys = await generateKeys()
    const xmlData = getXMLString({ keys })

    writeFileSync(`${path}/${fileName}`, xmlData)
}

const exportKeysToJSON = async (path = './', fileName = 'keys.json') => {
    const keys = await generateKeys()
    const json = JSON.stringify({ keys })

    writeFileSync(`${path}/${fileName}`, json)
}

module.exports = {
    generateKeys,
    exportKeysToXML,
    exportKeysToJSON
}
