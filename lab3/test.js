const rsa = require('js-crypto-rsa')
const { writeFileSync, readFileSync } = require('fs')

const { generateKeys, exportKeysToXML } = require('../utils/generateKeys')

const encrypt = async (data, publicKey) => {
    return rsa.encrypt(data, publicKey, 'SHA-256')
}

const decrypt = async (data, privateKey) => {
    return rsa.decrypt(data, privateKey, 'SHA-256')
}

const encryptFile = async (fileToEncrypt, encryptFile, publicKey) => {
    const file = readFileSync(fileToEncrypt)

    const encryptedData = await encrypt(file, publicKey)

    writeFileSync(encryptFile, encryptedData)
}

const decryptFile = async (fileToDecrypt, decryptedFile, privateKey) => {
    const file = readFileSync(fileToDecrypt)

    const decryptedData = await decrypt(file, privateKey)

    writeFileSync(decryptedFile, decryptedData)
}

const test = async () => {
    await exportKeysToXML('./')

    const { publicKey, privateKey } = await generateKeys()

    await encryptFile('text.txt', 'encrypted.txt', publicKey)
    await decryptFile('encrypted.txt', 'decrypted.txt', privateKey)

    // verify files equality
    const fileInitial = readFileSync('text.txt')
    const fileDecrypted = readFileSync('decrypted.txt')

    if (JSON.stringify(fileInitial) === JSON.stringify(fileDecrypted)) {
        console.log('Are equal')
    } else {
        console.error('Aren\'t equal')
    }
}

test()
