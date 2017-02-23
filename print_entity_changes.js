'use strict';

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


r.connect( {host: 'localhost', port: 28015})
.then( (conn) => {
  connection = conn
  return r.table('articles').changes().run(connection)
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
  return r.table('articles').concatMap((article) => article('entities')).run(connection)
    .then((cursor) => {
      return cursor.toArray()
  }).then((results) => {
    return pusher.trigger('articles-channel', 'entity-list-updated', {
      entities : results
    })
  })
}
