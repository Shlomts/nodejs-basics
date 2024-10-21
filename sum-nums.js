import fs from "fs"

sumNums()

function sumNums() {
    return new Promise((resolve, reject) => {
        fs.readFile("data/sum-data.txt", "utf8", (err, contents) => {
            if (err) reject(err)
            else {
                const nums = contents.split("\r\n")
                const sum = nums.reduce((acc, currNum) => ((+acc)+(+currNum)), 0)
                console.log(sum)
                resolve()
            }
        })
    })
}
