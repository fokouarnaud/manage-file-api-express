const Joi = require('joi');
const express = require("express");
const router = express.Router();
const documents = require("../services/documents");
const config = require("../config");
const multer = require('multer');
const { s3Uploadv2 } = require("../s3Service");
const { validateRegister, validateUpdate } = require('../validators');
const baser_url = config.baseUrl;



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

    res.json(await documents.getMultiple(req.query.page,
      req.query.limit,
      req.query.matricule,
      req.query.nom,
      req.query.departement,
      req.query.type_doc,
      req.query.annee,
      baser_url));
  } catch (err) {
    console.error(`Error while getting documents `, err.message);
    next(err);
  }
});


/* GET document. */
router.get("/:id", async function (req, res, next) {
  try {

    res.json(await documents.getOne(req.params.id, baser_url));
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
      const document = { ...req.body, source_doc: results[0]?.Key };
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
    upload(req, res, async function (err) {

      const { error } = validateUpdate(req.body);
      if (error) return next(error.details[0]);
      let results = [];
      if (req.body.is_file_delete) {

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
        results = await s3Uploadv2(req.files);
      }
     
      const document = { ...req.body, source_doc: results.length>0 ? results[0]?.Key : req.body.source_doc };
      //update result info to database
      res.json(await documents.update(req.params.id, document));


    });
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
