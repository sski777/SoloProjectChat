import pool from '../db.js'
import express from 'express'
import dotenv from 'dotenv'


dotenv.config();



const route = express.Router()

route.use(express.json())


route.get('/', async (req, res) => {
   try{
      const gettable = await pool.query('SELECT * FROM messages')
      res.status(200).json(gettable.rows)
   }
   catch(error){
      res.status(400).json({error:error.message})
   } 
})

route.post('/', async (req, res) => {
  try{
    const getname = req.body.name
    const getid = req.body.id
    console.log(getid)
    const getcontent = req.body.content
    const addentry = await pool.query('INSERT INTO messages (id,sender,content) VALUES ($1,$2,$3)', [getid,getname,getcontent])
    const gettable = await pool.query('SELECT * FROM messages')
    res.status(201).json(gettable.rows)
  }
  catch(error){
    console.log(error.message)
    res.status(400).json({error:error.message})
  }  
})



export default route