const express = require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const router = express.Router()




const dataSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true, minlength: 3 }

})

const dataModel = mongoose.model('dataModel', dataSchema)


router.get('/student/data', async (req, res) => {
    let Data = await dataModel.find()
    res.send(Data)
})


router.post('/student/data', async (req, res) => {
    const {error} = validateData(req.body)
    if(error) res.status(400).send(error.details[0].message)

    let datas = new dataModel({
        id: req.body.id,
        name: req.body.name

    })
    await datas.save()
    res.send(datas)
})
router.put('/student/data/:id', async (req, res) => {
    let students = await dataModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!students) return res.status(404).send('students is not found')
        
    res.send(students)
})
router.get('/student/data/:id', async (req, res) => {
    let students = await dataModel.findById(req.params.id)
    if (!students) res.status(404).send('students is not found')

    res.send(students)
})


function validateData(datas){
    const schema = {
        name : Joi.string().required().min(3)
    }
    return Joi.validate(datas,schema)
} // validaters()



module.exports = router
