'use strict';

let r = require('rethinkdb');

let connection = null;
r.connect( {host: 'localhost', port: 28015})
.then( (conn) => {
  return r.table('tv_shows').insert({ name: 'iZombie' }).run(conn)
})
.then((result) => {
  console.log(result)
})
.catch((err) => {
  console.log(err)
  throw err
})
