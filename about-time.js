import fs from "fs"
import ms from "ms"

aboutTime()

function aboutTime() {
    fs.readFile("data/ms-data.txt", "utf8", (err, contents) => {
        if (err) return console.log("Cannot read file")
        const tsArr = contents.split("\r\n")
        tsArr.map(ts=>{
            console.log(ms(+ts, {long: true}))
        } )
    })
}
