import { diskStorage } from 'multer'
import { uuid } from 'uuidv4'
import { extname } from 'path'

export const fileStorage = diskStorage({
  destination: function(req, file, cb) {
    cb(null, './upload')
  },
  filename: (req, file, cb) => {
    return cb(null, `${uuid()}${extname(file.originalname)}`)
  }
})
