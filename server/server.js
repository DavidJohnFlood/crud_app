const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development'])

app.use(express.json())
app.use(cors())

app.listen(port, ()=> {console.log(`Server listening on port ${port}`)})

app.get('/', (req, res) =>{
    res.send({message: 'Application up and running.'})
    console.log(`GET /`)
})

app.get('/all_items', (req, res) =>{
    knex.select('*')
        .from('items')
        .then(items => { res.status(200).json(items) })
        .then(console.log(`GET /all_items`))
        .catch(err => { res.status(500).json({message: err})
                        console.log(`GET /all_items ERROR: ${err}`)})
})

app.get('/my_items/:user_id', (req, res) =>{
    knex.select('*')
        .from('items')
        .where('user_id', req.params.user_id)
        .then(items => { res.status(200).json(items) })
        .then(console.log(`GET /my_items/${req.params.user_id}`))
        .catch(err => { res.status(500).json({message: err})
                        console.log(`GET /my_items/${req.params.user_id} ERROR: ${err}`)})
})

app.get('/items/:item_id', (req, res) =>{
    knex.select('*')
        .from('items')
        .where('id', req.params.item_id)
        .then(item => { res.status(200).json(item) })
        .then(console.log(`GET /items/${req.params.item_id}`))
        .catch(err => { res.status(500).json({message: err})
                        console.log(`GET /items/${req.params.item_id} ERROR: ${err}`)})
})

app.put('/items/:item_id', (req, res) =>{
    const { user_id, quantity, item_name, description } = req.body;
    knex.select('*')
        .from('items')
        .where('id', req.params.item_id)
        .update({ user_id, quantity, item_name, description })
        .then((rowCount) => {(rowCount===0)?
            res.status(404).json({message: 'Item not found'})
            :res.status(200).json({message: 'Item put'})})
        .then(console.log(`PUT /items/${req.params.item_id}`))
        .catch(err => { res.status(500).json({message: err})
                        console.log(`PUT /items/${req.params.item_id} ERROR: ${err}`)})
})

app.patch('/items/:item_id', (req, res) =>{
    const { user_id, quantity, item_name, description } = req.body;
    knex.select('*')
        .from('items')
        .where('id', req.params.item_id)
        .update({ user_id, quantity, item_name, description })
        .then((rowCount) => {(rowCount===0)?
            res.status(404).json({message: 'Item not found'})
            :res.status(200).json({message: 'Item patched'})})
        .then(console.log(`PATCH /items/${req.params.item_id}`))
        .catch(err => { res.status(500).json({message: err})
                        console.log(`PATCH /items/${req.params.item_id} ERROR: ${err}`)})
})

app.post('/items/', (req, res) =>{
    const { user_id, quantity, item_name, description } = req.body;
    knex('items')
        .insert({ user_id, quantity, item_name, description })
        .returning('id')
        .then((ids) => {res.status(201).json({message: `Item added`, item_id: ids[0].id})
                        console.log(`POST /items/  New Id: ${ids[0].id}`)})
        .catch(err => { res.status(500).json({message: err})
                        console.log(`POST /items/ ERROR: ${err}`)})
})

app.delete('/items/:item_id', (req, res) =>{
    knex.select('*')
        .from('items')
        .where('id', req.params.item_id)
        .del()
        .then((rowCount) => {(rowCount===0)?
                res.status(404).json({message: 'Item not found'})
                :res.status(200).json({message: 'Item deleted'})})
        .then(console.log(`DELETE /items/${req.params.item_id}`))
        .catch(err => { res.status(500).json({message: err})
                        console.log(`DELETE /items/${req.params.item_id} ERROR: ${err}`)})
})

app.post('/login', (req, res) =>{
    knex.select('*')
        .from('users')
        .where('username', req.body.username)
        .andWhere('password', req.body.password)
        .then(user => {
            user.length===0?
                res.status(400).json({message: "User not found"})
                :res.status(200).json(user)})
        .then(console.log(`POST /login`))
        .catch(err => { res.status(500).json({message: err})
                        console.log(`POST /login ERROR: ${err}`)})
})

app.post('/user', (req, res) =>{
    const { first_name, last_name, username, password } = req.body;
    knex.select("*")
        .from('users')
        .where('username', username)
        .then(rows=>{
            if(rows.length>0)
            {res.status(409).json({created: false, message: "User already exists"})}
            else
            {
                knex('users')
                    .insert({ first_name, last_name, username, password })
                    .returning('id')
                    .then((ids) => {res.status(201).json({created: true, id: ids[0].id, message: `User added.`})
                                    console.log(`POST /user  New Id: ${ids[0].id}`)})
                    .catch(err => { res.status(500).json({message: err})
                                    console.log(`POST /user ERROR: ${err}`)})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
            console.log(`POST /user ERROR: ${err}`)})
})