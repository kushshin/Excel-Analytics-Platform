import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/excels/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }

})

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === '.xlsx' || ext === '.xls') cb(null, true);
  else cb(new Error('Only Excel files are allowed'), false);
};

const upload = multer({ storage: storage,fileFilter })

export default upload