const rsa = require('js-crypto-rsa')
const { readFileSync, writeFileSync} = require('fs')

const { exportKeysToJSON } = require('../utils/generateKeys')

const getKeysFromJSONFile = async () => {
    try {
        return  JSON.parse(readFileSync('./keys.json', 'utf-8'))
    } catch {
        await exportKeysToJSON('./')
        return JSON.parse(readFileSync('./keys.json', 'utf-8'))
    }
}

const generateSignature = async () => {
    const { keys: { privateKey } } = await getKeysFromJSONFile()
    const textData = readFileSync('./text.txt')

    const signature = await rsa.sign(textData, privateKey)

    writeFileSync('./signature.txt', signature)

    return signature
}

const verifySignature = async (signature) => {
    const { keys: { publicKey } } = await getKeysFromJSONFile()
    const textData = readFileSync('./text.txt')

    return await rsa.verify(textData, signature, publicKey)
}

const test = async () => {
    const signature = await generateSignature()
    const verified = await verifySignature(signature)

    console.log(`Verified: ${verified}`)
}

test()
