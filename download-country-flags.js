import { utilService } from "./util.service.js"

downloadCountryFlags()

function downloadCountryFlags() {
    getCountries().then((countries) => {
        console.log(
            "Countries:",
            countries.map((c) => c.name)
        )
        return downloadFlags(countries)
    })
    .then(() => {
        console.log("Your flags are ready")
    })
}

// TODO: get the countries from the JSON file with utilService.readJsonFile
// sort by population (descending)
// return the top 5

function getCountries() {
        return utilService
            .readJsonFile("data/countries.json")
            .then((rawData) => 
               rawData.sort((a, b) => b.population - a.population ).slice(0,5)
            )
            .catch((err) => console.log(err))
}

function downloadFlags(countries) {
    const prms = countries.map((country) => {
        return utilService.download(
            // country.flags.svg,
            // `flags/${country.name.common}.svg`

            country.flags.png,
            `flags/${country.name.common}.png`
        )
    })
    return Promise.all(prms)
}
