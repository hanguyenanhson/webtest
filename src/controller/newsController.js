const {
  now
} = require('mongoose')
const item = require('../model/item')
class newsController {
  post(req, res) {
      const user = req.user
      console.log(user)
      item.find().then(items => {
              items = items.map(items => items.toObject())
              res.render('hehe', {
                  items: items,
                  user: user
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
  createProductPage(req, res) {
    if (!res.locals.isAdmin) {
        console.log(res.locals.isAdmin)
        // nếu người dùng chưa đăng nhập với tư cách là admin, redirect về trang chủ
        res.redirect('/');
        return;
      }
      res.render('createProductPage')
  }
  createProduct(req, res) {
      item.create({
          name: req.body.name,
          gender: req.body.gender,
          description: req.body.description,
          image: req.body.image
      }).then(result => {
          console.log('tạo product thành công')
          res.redirect('/')
      }).catch(err => {
          console.log(err)
      })
  }

  delete(req, res) {
      item.findByIdAndDelete(req.params._id).then((result) => {
          res.redirect('/delete/req.params._id')
          res.redirect('/')
      }).catch((err) => {
          console.log("Không delete được: ", err);
      })
  }

  createChangePage(req, res) {
    if (!res.locals.isAdmin) {
        console.log(res.locals.isAdmin)
        // nếu người dùng chưa đăng nhập với tư cách là admin, redirect về trang chủ
        res.redirect('/');
        return;
    }
      res.render('changePage')
  }
  searchProducts = (req, res) => {
      const keyword = req.query.search; // Lấy từ khóa được nhập vào trong thanh search từ query parameter "q"
      const regex = new RegExp(keyword, 'i'); // Tạo regular expression để tìm kiếm các sản phẩm có tên tương tự

      item.find({
              name: {
                  $regex: regex
              }
          })
          .then(items => {
              items = items.map(items => items.toObject())
              res.render('hehe', {
                  items
              }); // Trả về danh sách các sản phẩm có tên tương tự
          })
          .catch(error => {
              console.error(error);
              res.status(500).json({
                  message: 'Internal server error'
              });
          });
  };

  getByGender(req, res) {
      item.find({
              gender: "female"
          }).then(items => {
              items = items.map(items => items.toObject())
              res.render('hehe', {
                  items
              })
          })
          .catch(err => {
              console.log(err)
          })
  }
  getItems(req, res) {
      let isAdmin = false
      if (req.user && req.user.admin) {
          isAdmin = req.user.admin
      }
      item.findById(req.params._id)
          .then(items => {
              res.render('details', {
                  items: items.toObject(),
                  // isAdmin : isAdmin
              })
          })
          .catch(err => {
              console.error(err);
              res.status(500).json({
                  message: 'Lỗi server'
              });
          });
  }
  update(req, res) {
      item.updateMany({
              image: {
                  $exists: true
              }
          }, {
              $set: {
                  image: "anh.jpg"
              }
          })
          .then(result => {
              console.log("update thành công")
          })
          .catch(err => {
              res.json("không update đc")
          });

  }
}
module.exports = new newsController