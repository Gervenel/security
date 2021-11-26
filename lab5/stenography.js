const steggy = require('steggy')
const { readFileSync, writeFileSync } = require('fs')

// эта библиотека работает только с png фотками, других не нашел
const hideData = ({
        initialImgFile = './initial.png',
        dataFile = './secret_data.txt',
        outputImgPath = './secret_img.png',
        password,
        encoding,
} = {}) => {
    const initialImg = readFileSync(initialImgFile)
    const data = readFileSync(dataFile)

    const concealed = steggy.conceal(password)(initialImg, data, encoding)

    writeFileSync(outputImgPath, concealed)
}

const revealData = ({
    dataImgFile = './secret_img.png',
    outPutFile = './output_secret_data.txt',
    password,
    encoding,
} = {}) => {
    const imgToReveal = readFileSync(dataImgFile)

    const revealed = steggy.reveal(password)(imgToReveal, encoding).toString()

    console.log(revealed)

    writeFileSync(outPutFile, revealed)
}

hideData()
revealData()
