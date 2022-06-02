import LANGUAGE_COLORS from "../utils/languageColors"

export const TopLanguageData = (data) => {
    const repos = data.repos
    const languages = {}
    for (var i = 0; i < repos.length; i++) {
        const repoLanguage = repos[i].language
        if (languages.hasOwnProperty(repoLanguage)) {
            var tempLanguageCounter = languages[repoLanguage]
            languages[repoLanguage] = tempLanguageCounter + 1
        }
        else {
            // exclude "language === null" for repos that don't have languages specified
            if (repoLanguage !== null) {
                languages[repoLanguage] = 1
            }
        }
    }

    // labels
    var labels = []
    for (var prop in languages) {
        labels.push(prop)
    }

    // dataset
    var datasetData = []
    for (var prop in languages) {
        datasetData.push(languages[prop])
    }

    // graphs colors
    var colors = []
    for (var prop in languages) {
        colors.push(LANGUAGE_COLORS[prop])
    }

    return { labels, datasetData, colors }
}


export const MostStarredData = (data) => {
    const repos = data.repos
    // labels
    var labels = ["", "", "", "", ""]
    // dataset
    var datasetData = [0, 0, 0, 0, 0]
    // graphs colors
    var colors = ["red", "green", "purple", "white", "orange"]

    try {
        const reposStripped = repos.map((el) => {
            const tempObj = {}
            tempObj['name'] = el.name
            tempObj['amount'] = el.stargazers_count
            return tempObj
        })
        const reposStrippedAndSortedByStars = reposStripped.sort((a, b) => b.amount - a.amount)

        for (var i = 0; i < 5; i++) {
            labels[i] = (reposStrippedAndSortedByStars[i].name)
            datasetData[i] = (reposStrippedAndSortedByStars[i].amount)
        }

    }
    catch (err) {
    }
    return { labels, datasetData, colors }
}


export const StarsPerLanguageData = (data) => {
    const repos = data.repos
    const startPerLanguage = {}
    for (var i = 0; i < repos.length; i++) {
        const repoLanguageName = repos[i].language
        const repoLanguageStar = repos[i].stargazers_count

        if (startPerLanguage.hasOwnProperty(repoLanguageName)) {
            var totalStars = startPerLanguage[repoLanguageName]
            startPerLanguage[repoLanguageName] = totalStars + repos[i].stargazers_count
        }
        else {
            // exclude "language === null" for repos that don't have languages specified
            if (repoLanguageName !== null) {
                startPerLanguage[repoLanguageName] = repos[i].stargazers_count
            }
        }
    }
    console.log(startPerLanguage)

    // labels
    var labels = []
    for (var prop in startPerLanguage) {
        if (startPerLanguage[prop] !== 0) {
            labels.push(prop)
        }
    }

    // dataset
    var datasetData = []
    for (var prop in startPerLanguage) {
        datasetData.push(startPerLanguage[prop])
    }

    // graphs colors
    var colors = []
    for (var prop in startPerLanguage) {
        colors.push(LANGUAGE_COLORS[prop])
    }

    console.log(labels, datasetData, colors)

    return { labels, datasetData, colors }
}
