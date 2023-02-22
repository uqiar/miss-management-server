
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const DIR = (process.cwd() + "/" + "assets/images").toString();
//
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
exports.upload = multer({
    storage: storage,
    limits: { fileSize: '20000000' },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
exports.uploadImage = async (req, res) => {
    try {
        //const url = req.protocol + '://' + req.get('host')
        //res.json(url + '/assets/' + req.file.filename)
        if (req.params.currentImg) {
            var path = DIR + '/' + req.params.currentImg
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                //file removed
            })
        }
        res.status(200).json(req.file.filename)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.findImage = async (req, res) => {
    try {
        res.sendFile(DIR + '/' + req.params.url);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
