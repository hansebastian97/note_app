var Userdb = require('../model/model');

// Create and save new user
exports.create = function(req, res){
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can't be empty!"});
        return
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    user
        .save(user)
        .then(data =>{
            // res.send(data);
            res.redirect('/') 
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"   
            })
        });
};

// retrieve and return all users/ retrieve and return a single user
exports.find = function(req, res){
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(400).send({message: `Error! User with id ${id} not found!`})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error while searching for user"+id})
            })
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occurence while retrieving user information"})
        })
    }
}

// Update a new identified user by user id
exports.update = function(req, res){
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data to update cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error while updating user information"})
        })
}

// Delete a user with specified user id

exports.delete = function(req, res){
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: "Error, no data found"})
            }else{
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id= ${id}`
            });
        });
}

 