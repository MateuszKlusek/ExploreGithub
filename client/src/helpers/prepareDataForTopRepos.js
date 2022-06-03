export const TopReposData = (data) => {
    var repos = data.repos
    var filteredReposWithLanguages = repos.filter((el) => el.language !== null)
    console.log(filteredReposWithLanguages)
    filteredReposWithLanguages.sort((a, b) => b.size - a.size)
    filteredReposWithLanguages = filteredReposWithLanguages.slice(0, 8)

    console.log(filteredReposWithLanguages)

    return filteredReposWithLanguages

}