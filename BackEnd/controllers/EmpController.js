import { Router } from "express";

import { Employee } from "../models/emp.js";

export let router =Router();

router.get('/', async(req, res) => {
    let  users = await Employee.find()
    res.status(201).json( users )
        
})


router.post('/',async (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    let PostUser= await emp.save()
    res.status(201).json( PostUser )
});

router.put('/:id', async(req, res) => {
    
  try {
    let  emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    let updateUser = await Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true })
    res.status(201).json( {msg:"user is updated", updateUser} )
  } catch (error) {
    res.status(400).json( { msg:"not found id", error} )

  }
});

router.delete('/:id', async(req, res) => {

    try {
       let  delUser= await Employee.findByIdAndRemove(req.params.id)
       res.status(201).json( {msg:"user is deleted", delUser} )

    } catch (error) {
        res.status(400).json( { msg:"not found id", error} )
    };
});