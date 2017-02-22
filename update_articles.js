'use strict'

const Promise = require("bluebird")
const request = require('request-promise')
const cron = require('node-cron')
const r = require('rethinkdb')
const parser = Promise.promisify(require('node-feedparser'))

function updateArticles() {
  let connection = null

  r.connect( {host: 'localhost', port: 28015})
    .then((conn) => {
      connection = conn
    })
    .then(() => {
      return request('http://feeds.bbci.co.uk/news/world/rss.xml')
    })
    .then((rssString) => {
      return parser(rssString)
    })
    .then((rssFeed) => {
      //The articles table has a primary key called link
      //Each item in the article array has a link property which will be unique
      //This way we ensure we only store each article once
      return r.table('articles').insert(rssFeed.items).run(connection)
    }).then((result) => {
      console.log(result)
      connection.close()
    })
    .catch((err) => {
      console.error(err)
    })
}

cron.schedule('*/5 * * * *', updateArticles)
