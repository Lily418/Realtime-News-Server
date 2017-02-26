'use strict';

const moment = require('moment');
const r = require('rethinkdb');
const Pusher = require('pusher');


const pusher = new Pusher({
  appId: process.env.RETHINK_DB_DEMO_PUSHER_APP_ID,
  key: process.env.RETHINK_DB_DEMO_PUSHER_KEY,
  secret: process.env.RETHINK_DB_DEMO_PUSHER_SECRET_KEY,
  cluster: process.env.RETHINK_DB_DEMO_PUSHER_CLUSTER,
  encrypted: true
});


let connection = null;


r.connect( {host: process.env.RETHINK_DB_HOST , port: parseInt(process.env.RETHINK_DB_PORT)})
.then( (conn) => {
  connection = conn
  return r.table('articles').filter((article) => article.hasFields('entities').and(article('entities').count().gt(0)))
                            .changes()
                            .run(connection)
})
.then((cursor) => {
  return cursor.eachAsync((row) => {
    pushDistinctEntities()
  })
})
.catch((err) => {
  console.log(err)
  throw err
})

function pushDistinctEntities() {
  return r.table('articles').between(r.epochTime(moment().subtract(1, 'days').unix()),r.now(), {index: 'date'})
                            .filter((doc) => doc.hasFields('entities'))
                            .concatMap((article) => article('entities'))
                            .distinct()
                            .run(connection)
    .then((cursor) => {
      return cursor.toArray()
  }).then((results) => {
    console.log(results)
    pusher.trigger('articles-channel', 'entity-list-updated', {
      entities : results
    }, (error) => { if (error) {console.log(error)}})
  }).catch((err) => {
    console.log(err)
    throw err
  })
}
