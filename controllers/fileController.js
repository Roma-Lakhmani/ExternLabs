const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");

const downloadFile = async (req, res) => {
  // try {
  const type = req.query.type;
  const filename = req.query.filename;
  const ext = filename && filename.split(".")[1];
  if (!type || !filename) {
    res.send({
      error: "",
      msg: "Type or filename required",
    });
  }
  if (type === "download") {
    const filePath = path.join(__dirname, "../", "/uploads/", filename);
    res.download(filePath, `downloaded-file.${ext}`, (err) => {
      if (err) {
        //  throw err;
        res.send({
          error: err,
          msg: "Problem downloading the file",
        });
      }
    });
  } else {
    const filePath = path.join(__dirname, "../", "/uploads/", filename);
    //Similarly we can parse for other ext
    if (ext === "html") {
    } else if (ext === "pdf") {
      let dataBuffer = fs.readFileSync(filePath);
      pdf(dataBuffer).then(function (data) {
        res.status(200).json({
          status: "success",
          data: data.text,
          message: "File downloaded !",
        });
      });
    }
  }
};

module.exports = {
  downloadFile,
};
