const multer = require("multer");

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './src/temp/uploads')
        },
        filename: (req, file, cb) => {
            let imagem = Date.now().toString() + "_" + file.originalname
            cb(null, imagem)
            return imagem
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if (extensaoImg) {
            return cb(null, true);
        }
        return cb(null, false);
    }
}));