const { model } = require("mongoose")
const { findOne } = require("../model/item")
const user = require('../model/user')
const passport = require('passport');

class loginController {
    login(req,res) {
        const warning = req.query.warning || '';
        res.render('login',{warning
        })
    }
    handleLogin(req, res) {
        
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
      })
    }
    register(req,res) {
        const warning = req.query.warning || ''
        res.render('register')
    }
    handleRegister(req,res) {
        const is_admin = req.body.user_type === 'admin' ? true : false;
        if(req.body.password!=req.body.confirm_password){
            res.render('register',{warning : "xác nhận mật khẩu sai"})
        }
        else if(!req.body.password||!req.body.username){
            res.render('register',{warning : "nhập đầy đủ username và password"})
        }
        else
         {
            user.findOne({name : req.body.username} ).then(users =>{
            if(!users){
                user.create({
                    name : req.body.username,
                    password : req.body.password,
                    admin : is_admin
                })
                console.log("register thành công")
                res.redirect('/login')
            }
            else{
                res.render('register',{warning : "tài khoản đã tồn tại"})
            }
        })
    }
}
}
module.exports = new loginController