import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/imagePosts')
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + '.' + file.originalname.split('.')[1])
    }
  })

export const UploadImagesPostMiddlewares = multer({
    storage,
    fileFilter: (req, file, cb)=> {
      const extentionImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
          formatOk => formatOk == file.mimetype
      )

      if(extentionImg) return cb(null, true)

      return cb(null, false)
    }

})