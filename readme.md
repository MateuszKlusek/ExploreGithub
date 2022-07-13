# Explore Github 

Technology used for building this website

- client
  - React (Typescript)
  - styled component
  - Chart.js
- server
  - Node.js 
  - express
  - puppeteer (for scraping data)
  - MongoDB for storing data both from Github API and scraping

--- 

Explore Github project explores the idea of getting the data from a source, using both external API and scraping the data. The idea of data scraping appeared in a situation when testing Github API required to wait a while for Github API "points" to restore, since Github set a limit for free API calls.

The biggest challenge was to "merge" api calls and data scraping into a one stream of data and have uniform data representation and the puppeteer scraping itself.
