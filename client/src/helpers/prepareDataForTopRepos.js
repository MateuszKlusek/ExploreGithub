export const TopReposData = (data) => {
    const repos = data.repos
    console.log(repos)


    const dataToReturn = repos.slice(0, 8)
    console.log(dataToReturn)

    return dataToReturn

}