import puppeteer from 'puppeteer';

export const scrape = async (profileQuery) => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.goto(`https://github.com/${profileQuery}`);


    // wait for main selector of the website
    await page.waitForSelector(".application-main")

    try {
        // js-plaxify class only for 404 website
        await page.waitForSelector(".js-plaxify", { hidden: true, timeout: 2000 })
    } catch (err) {
        throw "the user doesn't exist"
    }


    // getting data

    //profileURL
    var profileURL;
    try {
        profileURL = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.js-profile-editable-names.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block", el => el.innerHTML)
        profileURL = profileURL.trim()
    } catch (err) {
        profileURL = " "
    }

    // profileURL to compare
    var profileURL_toCompare;
    try {
        profileURL_toCompare = profileURL.toLowerCase();
    } catch (err) {
        profileURL_toCompare = " "
    }

    // getting id (strip from avatarURL)
    var id;
    try {
        id = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.position-relative.d-inline-block.col-2.col-md-12.mr-3.mr-md-0.flex-shrink-0 > a > img", e => e.getAttribute("src"))
        var tempId = id.split("/u/")
        tempId = tempId[1]
        tempId = tempId.split("?")
        id = Number(tempId[0])
    }
    catch (err) { }

    // avatar_url => make avatar url
    var avatar_url = `https://avatars.githubusercontent.com/u/${id}`

    // type (admin or user), looks like this can't be scraped
    var type = " "

    // site admin
    var site_admin = false;

    // name
    var name;
    try {
        name = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.js-profile-editable-names.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-name.vcard-fullname.d-block.overflow-hidden", el => el.innerHTML)
        name = name.trim()
    } catch (err) {
        name = " "
    }

    // company
    var company;
    try {
        company = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > ul > li:nth-child(1) > span > div", el => el.innerHTML)
    } catch (err) {
        company = " "
    }

    // blog
    var blog;
    try {
        blog = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > ul > li:nth-child(3) > a", el => el.innerHTML)
    } catch (err) {
        blog = " "
    }

    // location
    var location;
    try {
        location = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > ul > li:nth-child(2) > span", el => el.innerHTML)
    } catch (err) {
        location = " "
    }

    // email (can't figure out is there's an e-mail DOM element to scrape)
    var email;
    try {
        email = " "
    } catch (err) {
        email = " "
    }

    // hireable 
    // https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-user-account-settings/what-does-the-available-for-hire-checkbox-do
    // github shut down entirely 'hireable" on August 19, 2021, but previously set ones might be visible
    var hireable = ' '

    // bio
    var bio;
    try {
        bio = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4 > div", el => el.innerHTML)
    } catch (err) {
        bio = " "
    }
    // twitter_username
    var twitter_username;
    try {
        twitter_username = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > ul > li:nth-child(3) > a", el => el.innerHTML)
    } catch (err) {
        twitter_username = " "
    }

    // public_repos
    var public_repos;
    try {
        public_repos = await page.$eval("#js-pjax-container > div.mt-4.position-sticky.top-0.d-none.d-md-block.color-bg-default.width-full.border-bottom.color-border-muted > div > div > div.Layout-main > div > nav > a:nth-child(2) > span", el => Number(el.innerHTML))

    } catch (err) {
        public_repos = 0
    }

    // public_gists
    var public_gists = 0

    // followers
    var followers;
    try {
        followers = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span", el => el.innerHTML)
    }
    catch (err) {
        followers = 0
    }

    // following
    var following;
    try {
        follwing = await page.$eval("#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(2) > span", el => el.innerHTML)
    }
    catch (err) {
        following = 0
    }

    // created_at (can't be created_at from scraped)
    var created_at = new Date()

    // updated_at (can't be created_at from scraped)
    var updated_at = new Date()

    // scraped_at
    var scraped_at = new Date()

    // repos 
    var repos = []

    var data_to_save = {
        profileURL,
        profileURL_toCompare,
        id,
        avatar_url,
        type,
        site_admin,
        name,
        company,
        blog,
        location,
        email,
        hireable,
        bio,
        twitter_username,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at,
        scraped_at,
        repos,
    }

    var reposDataToSave = []

    // scraper repos
    var numberOfTabs = Math.ceil(public_repos / 30)
    var tabCounter = 0
    while (tabCounter < numberOfTabs) {
        const page = await browser.newPage()
        await page.goto(`https://github.com/${profileQuery}?page=${tabCounter + 1}&tab=repositories`);

        // getting the number of repos to parse in current website
        var numberOfReposInCurrentTab;
        if (public_repos >= (tabCounter + 1) * 30) {
            numberOfReposInCurrentTab = 30
        } else {
            numberOfReposInCurrentTab = public_repos - (tabCounter * 30)
        }

        // repos for this tab
        var thisTabReposData = []

        var languages;
        try {
            languages = await page.$$eval(`span[itemprop="programmingLanguage"]`, el => el.map(x => x.innerHTML))
        } catch (err) {
            console.log(err)
        }

        var descriptions;
        try {
            descriptions = await page.$$eval(`p[itemprop="description"]`, el => el.map(x => x.textContent.trim()))
        } catch (err) {
            console.log(err)
        }

        for (var i = 0; i < numberOfReposInCurrentTab; i++) {
            var temp = {}
            if (!languages[i]) {
                temp.language = null
            } else {
                temp.language = languages[i]
            }

            if (!descriptions[i]) {
                temp.description = ' '
            } else {
                temp.description = descriptions[i]
            }
            thisTabReposData.push(temp)
        }

        var repoCounterInCurrentTab = 0
        while (repoCounterInCurrentTab < numberOfReposInCurrentTab) {

            // title
            var name;
            try {
                name = await page.$eval(`#user-repositories-list > ul > li:nth-child(${repoCounterInCurrentTab + 1}) > div.col-10.col-lg-9.d-inline-block > div.d-inline-block.mb-1 > h3>a`, el => el.innerHTML)
                name = name.trim()
            } catch (err) {
                console.log(err)
                name = " "
            }

            // stargazers_count
            var stargazers_count;
            try {
                // the look-up element
                const as = await page.$$eval(`#user-repositories-list > ul > li:nth-child(${repoCounterInCurrentTab + 1}) > div.col-10.col-lg-9.d-inline-block > div.f6.color-fg-muted.mt-2 > a`, el => el.filter(x => x.href.endsWith("stargazers")).map(x => x.text))
                if (as.length === 0) {
                    stargazers_count = 0
                } else {
                    stargazers_count = as[0]
                    stargazers_count = Number(stargazers_count.trim())
                }
            } catch (err) {
                console.log(err)
                stargazers_count = 0
            }

            // stargazers_count
            var forks;
            try {
                // the look-up element
                const as = await page.$$eval(`#user-repositories-list > ul > li:nth-child(${repoCounterInCurrentTab + 1}) > div.col-10.col-lg-9.d-inline-block > div.f6.color-fg-muted.mt-2 > a`, el => el.filter(x => x.href.endsWith("members")).map(x => x.text))
                if (as.length === 0) {
                    forks = 0
                } else {
                    forks = as[0]
                    forks = Number(forks.trim())
                }
            } catch (err) {
                console.log(err)
                forks = 0
            }

            // add properties to thisRepoData
            thisTabReposData[repoCounterInCurrentTab].name = name
            thisTabReposData[repoCounterInCurrentTab].stargazers_count = stargazers_count
            thisTabReposData[repoCounterInCurrentTab].forks = forks
            thisTabReposData[repoCounterInCurrentTab].size = null

            repoCounterInCurrentTab += 1
        }
        reposDataToSave = [...reposDataToSave, ...thisTabReposData]

        tabCounter += 1
    }
    data_to_save.repos = reposDataToSave

    await browser.close();
    return data_to_save
}
