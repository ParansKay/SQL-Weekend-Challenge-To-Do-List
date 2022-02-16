const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// must require modules to use them
const pool = require( './modules/pool' );

const PORT = process.env.PORT || 5000;
const todolistRouter = require('./routes/todolist.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// GLOBALS

// ROUTES
app.use('/todolist', todolistRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

// GET ROUTE
app.get ('/todolist', (req,res)=>{
    const queryString = `SELECT*FROM paran_todo_list ORDER BY stat ASC`;
    pool.query(queryString).then((results)=>{
      res.send (results.rows);
    }).catch ((err)=>{
      console.log (err);
      res.sendStatus(500);
    })
  })
// POST ROUTE
  app.post ('/todolist', (req,res)=>{
    console.log('/todolist POST hit:', req.body);
    let queryString = `INSERT INTO "paran_todo_list" (stat, task, due, notes) VALUES ($1, $2, $3, $4)`;
    let values = [req.body.stat, req.body.task, req.body.due, req.body.notes];
    pool.query(queryString, values).then((results)=>{
      res.sendStatus(201);
    }).catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    })
  })
//DELETE ROUTE
  app.delete( '/todolist', (req, res)=>{
    let queryString = `DELETE FROM "paran_todo_list" where id=${req.query.id};`
    pool.query( queryString ).then( (results)=>{
      res.sendStatus( 200 );
    }).catch( (err)=>{
      console.log( err );
      res.sendStatus( 500 );
    })
  })
//PUT ROUTE
  app.put( '/todolist', (req, res)=>{
    console.log( '/todolist PUT:', req.query)
    let queryString= `UPDATE "paran_todo_list" SET stat=NOT stat WHERE id=${req.query.id};`
    console.log( req.body.stat ); 
    pool.query( queryString ).then( (results)=>{
      res.sendStatus( 200 );
    }).catch( (err)=>{
      console.log( err );
      res.sendStatus( 500 );
    })
  })