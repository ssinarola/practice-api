const multer = require("multer");
const path = require("path");

// The disk storage engine gives you full control on storing files to disk. other wise we can go with only multer({ dest: './public/uploads/' })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "/public/uploads");
    // path.join(__dirname, "../public/uploads") => give proper path for storing files

    cb(null, path.join(__dirname, "../public/uploads"), (err, succ) => {
      if (err)
        console.log(
          "error multer diskStorage destination ================================>",
          err
        );
    });
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName, (error, succ) => {
      if (error)
        console.log(
          "error multer diskStorage filename ================>",
          error
        );
    });
  },
});

// const upload = multer({ dest: './public/uploads/' })
const upload = multer({ storage: storage });

module.exports = upload;
