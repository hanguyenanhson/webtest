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
      const keyword = req.query.search; // Lấy từ khóa được nhập vào trong thanh search từ query parameter "search"
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
    console.log('I AM HERE')
    const update = {}
    Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== '') {
          update[key] = req.body[key];
        }
      });
      console.log(update)
      item.findByIdAndUpdate(req.params._id, update, {new:true}).then(result => {
        console.log(result)
        res.redirect('/')
      })
      .catch(err =>{
        res.status(500).json({
            message: 'Lỗi server'
        })
        console.log(err)
      })
      
  }
}
module.exports = new newsController