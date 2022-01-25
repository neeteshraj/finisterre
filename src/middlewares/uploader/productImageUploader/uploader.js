const multer = require('multer');
const path = require('path');
const shortid = require('shortid');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(__dirname),'../../uploads/products'));
    },
    filename: (req, file, cb) => {
        cb(null, shortid.generate()+'-'+file.originalname)
    }
});


const upload = multer({storage:storage});




module.exports = upload;