'use strict';

let r = require('rethinkdb');

let connection = null;
r.connect( {host: 'localhost', port: 28015})
.then( (conn) => {
  return r.table('tv_shows').changes().run(conn)
})
.then((cursor) => {
  return cursor.eachAsync((row) => {
    console.log(row)
  })
}).then((row) => {
  console.log(JSON.stringify(row, null, 2))
})
.catch((err) => {
  console.log(err)
  throw err
})
