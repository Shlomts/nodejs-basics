import fs from 'fs'
import https from 'https'

export const utilService = {
    getRandomIntInclusive,
    readJsonFile,
    download
}


function readJsonFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, contents) => {
            if (err) reject(err)
            else {
                const data = JSON.parse(contents)
                resolve (data)
            }
        })
    })
}

function download(url, fileName) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(fileName)
		https.get(url, content => {
			content.pipe(file)
			file.on('error', reject)
			file.on('finish', () => {
				file.close()
				resolve()
			})
		})
	})
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}