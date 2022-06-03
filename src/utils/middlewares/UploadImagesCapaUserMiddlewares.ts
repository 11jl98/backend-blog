import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/user/capa')
    },
    filename: function (req, file, cb) {
        cb(null, req.id_user + '_capa' +  '.' + file.originalname.split('.')[1])
    }
  })

export const UploadImagesCapaUserMiddlewares = multer({
    storage,
    fileFilter: (req, file, cb)=> {
      const extentionImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
          formatOk => formatOk == file.mimetype
      )

      if(extentionImg) return cb(null, true)

      return cb(null, false)
    }

})