import { utilService } from "./util.service.js"

downloadCountryFlags()

function downloadCountryFlags() {
    const countries = getCountries().then((countries) => {
        console.log(
            "Countries:",
            countries.map((c) => c.name)
        )
        downloadFlags(countries).then(() => {
            console.log("Your flags are ready")
        })
    })
}

// TODO: get the countries from the JSON file with utilService.readJsonFile
// sort by population (descending)
// return the top 5

function getCountries() {
    var countries = []

    return new Promise((resolve, reject) => {
        const raw = utilService
            .readJsonFile("data/countries.json")
            .then((rawData) => {
                let sortData = rawData.sort((a, b) => {
                    const x = a.population
                    const y = b.population
                    return x > y ? -1 : x < y ? 1 : 0
                })

                for (let i = 0; i < 5; i++) {
                    countries.push(sortData[i])
                }
                resolve(countries)
            })
            .catch(reject)

        return countries
    })
}

function downloadFlags(countries) {
    const prms = countries.map((country) => {
        return utilService.download(
            country.flags.svg,
            `flags/${country.name.common}.svg`

            // country.flags.png,
            // `flags/${country.name.common}.png`
        )
    })
    return Promise.all(prms)
}
