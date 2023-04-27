const { now } = require('mongoose')
const item = require('../model/item')
class newsController {
    post(req,res) {
        
        item.find().then(items => {
            items = items.map(items => items.toObject())
            res.render('hehe',{
                items
            })
        })
        .catch(err => {
            console.log(err)
        })
        // item.create({name:'something',gender:"female" ,description:'maybe' ,  date:Date.now() })
        // res.render('hehe')
      
    }
    index(req, res) {
        res.render('something')
        
        
    }
    getByGender(req, res) {
        item.find({gender : "female"}).then (items => {
            items = items.map(items => items.toObject())
            res.render('hehe',{
                items
            })
        })
        .catch(err => {
            console.log(err)
        })
        }
        getItems(req, res) {
            item.findById(req.params._id)
              .then(items => {
                res.render('details', {items : items.toObject()})
              })
              .catch(err => {
                console.error(err);
                res.status(500).json({
                  message: 'Lỗi server'
                });
              });
          }
          update(req, res){
            item.updateMany({ image: { $exists : true } }, { $set: { image: "anh.jpg" } })
            .then(result => {
               console.log("update thành công")
            })
            .catch(err => {
               res.json("không update đc")
            });
              
          }
        }
module.exports =  new newsController