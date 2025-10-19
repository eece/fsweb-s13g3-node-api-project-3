const express = require('express');

const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get('/', (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  return usersModel.get()
  .then(users => {
    return res.status(200).json(users);
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  const id = req.user.id;
  return usersModel.getById(id)
  .then(user => {
    return res.status(200).json(user);
  })
});

router.post('/', validateUser, (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  const user = req.body;
  return usersModel.insert(user)
  .then(newUser => {
    return res.status(201).json(newUser);
  })
});
// api/users/:id PUT 
router.put('/:id',validateUserId, validateUser, (req, res) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.

  const user = req.body;
  const id = req.user.id;
  return usersModel.update(id, user)
  .then(updatedUser => {
    return res.status(200).json(updatedUser);
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  const id = req.user.id;
  return usersModel.remove(id)
  .then(deletedUser => {
    return res.status(200).json(req.user);
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  const id = req.user.id;
  return usersModel.getUserPosts(id)
  .then(posts => {
    return res.status(200).json(posts);
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  const post = req.body;
  const id = req.user.id;
  post.user_id = id;
  postsModel.insert(post).then((newPost) => {
    return res.status(201).json(newPost);
  }) 
});

// routerı dışa aktarmayı unutmayın
module.exports = router;