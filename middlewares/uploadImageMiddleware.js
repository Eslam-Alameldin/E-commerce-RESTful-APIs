const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions = () => {
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Images allowed", 400), false);
    }
  }

  const storage = multer.memoryStorage();

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);
exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
