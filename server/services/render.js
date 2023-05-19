const axios = require('axios');

exports.homeRoutes = function(req,res){
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            console.log(response.data)
            res.render('index', {users: response.data})
        })
        .catch(err =>{
            res.send(err)
        })



    // res.render('index', {users: "New Data"});
};

exports.add_user = function(req,res){
    res.render('add_user');
};

exports.update_user = function(req, res){
    axios.get('http://localhost:3000/api/users',{params:{id: req.query.id}})
    .then(function(userdata){
        res.render("update_user",{user:userdata.data})
    })
    .catch(err => {
        res.send(err);
    })
};