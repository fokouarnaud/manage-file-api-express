const Joi = require('joi');
const express = require("express");
const router = express.Router();
const documents = require("../services/documents");
const multer = require('multer');
const { s3Uploadv2 } = require("../s3Service");
const {validateRegister, validateUpdate} = require('../validators');
const baser_url="https://aws-s3-save.s3.amazonaws.com";



const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 1 },
}).array("file");



/* GET documents. */
router.get("/", async function (req, res, next) {
  try {
    
    res.json(await documents.getMultiple(req.query.page,req.query.matricule,baser_url));
  } catch (err) {
    console.error(`Error while getting documents `, err.message);
    next(err);
  }
});


/* GET document. */
router.get("/:id", async function (req, res, next) {
  try {
  
    res.json(await documents.getOne(req.params.id,baser_url));
  } catch (err) {
    console.error(`Error while getting document `, err.message);
    next(err);
  }
});

/* POST document */
router.post("/", async function (req, res, next) {
  try {
  
    upload(req, res, async function (err) {

      const { error } = validateRegister(req.body);
      if (error) return next(error.details[0]);

      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "file is too large",
          });
        }

        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            message: "File limit reached",
          });
        }

        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            message: "File must be an pdf",
          });
        }
      }
     
      // upload file on remote storage
      const results = await s3Uploadv2(req.files);
      console.log(results);
      console.log(results[0].Key);
      const document={...req.body,source_doc:results[0].Key,annee_soutenance: "2022-02-07"};
      //save result info to database
      res.json(await documents.create(document));
      
    });



  } catch (err) {
    console.error(`Error while creating document`, err.message);
    next(err);
  }
});

/* PUT document */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await documents.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating document`, err.message);
    next(err);
  }
});

/* DELETE document */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await documents.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting document`, err.message);
    next(err);
  }
});

module.exports = router;
