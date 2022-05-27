import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/posts')
    },
    filename: function (req, file, cb) {
        cb(null, req.id_user + '.' + file.originalname.split('.')[1])
    }
  })

export const UploadImagesMiddlewares = multer({
    storage,
    fileFilter: (req, file, cb)=> {
      const extentionImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
          formatOk => formatOk == file.mimetype
      )

      if(extentionImg) return cb(null, true)

      return cb(null, false)
    }

})