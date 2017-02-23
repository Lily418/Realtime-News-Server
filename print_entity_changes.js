'use strict';

let r = require('rethinkdb');

let connection = null;


r.connect( {host: 'localhost', port: 28015})
.then( (conn) => {
  connection = conn
  return r.table('articles').changes().run(connection)
})
.then((cursor) => {
  return cursor.eachAsync((row) => {
    printDistinctEntities()
  })
})
.catch((err) => {
  console.log(err)
  throw err
})

function printDistinctEntities() {
  return r.table('articles').concatMap((article) => article('entities')).run(connection)
    .then((cursor) => {
    return cursor.eachAsync((row) => {
      process.stdout.write(row + " ")
    })
    console.log("")
  })
}
