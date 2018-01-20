let sqlite3 = require('sqlite3').verbose()
let Promise = require('es6-promise').Promise
let process = require('process')

function connect_db(db_name='SFCT.sqlite3'){
    return new sqlite3.Database(db_name)
}

function query_table(db, table_name){
    return new Promise(function(resolve, reject){
	return db.all(`select * from ${table_name}`, function(err, rows){
	    if(err){ reject(err) }
	    else { resolve(rows) }
	})
    })
}

if(process.argv.length > 3){
    let file_name = process.argv[2]
    let table_name = process.argv[3]
    let db = connect_db(file_name)

    query_table(db, table_name).then(function(rows){
	console.log(JSON.stringify(rows, null, '  '))
    }).catch(console.log)
} else {
    console.log(`useage: ${process.argv[0]} <file_name> <table_name>`)
}
