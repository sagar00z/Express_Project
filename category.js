const express = require('express')
const Joi = require('joi')

const router = express.Router()

let categories = [
    { id: 1, name: 'WEB' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'DevOps' }
]


router.get('/api/categories', (req, res) => {
    res.send(categories)
})// use to read the data

router.post('/api/categories', (req, res) => {
    const {error} = validateData(req.body)
    if(error) res.status(400).send(error.details[0].message)
        
    const category = {
        id: categories.length + 1,
        name: req.body.name
    }
    categories.push(category)
    res.send(categories)
}) // use to inser value

router.put('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id))
    if (!category) return res.status(404).send('this category of id not found')

    category.name = req.body.name
    res.send(category)
}) // use to update statement

router.get('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id))
    if (!category) return res.status(404).send('this category of id not found')

    res.send(category)
})




function validateData(categories){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate( categories , schema )
}


module.exports = router
