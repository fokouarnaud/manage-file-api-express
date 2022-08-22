const express = require('express');
const multer = require('multer');
const documents = require('../services/documents');
const config = require('../config');
const { s3Uploadv2 } = require('../s3Service');
const { validateRegister, validateUpdate } = require('../validators');

const router = express.Router();

const { baseUrl } = config;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  }
  else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 1 }
}).array('file');

/* GET documents. */
router.get('/', async (req, res, next) => {
  try {
    res.json(await documents.getMultiple(
      req.query.page,
      req.query.limit,
      req.query.matricule,
      req.query.nom,
      req.query.departement,
      req.query.type_doc,
      req.query.annee,
      baseUrl
    ));
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting documents ', err.message);
    next(err);
  }
});

/* GET document. */
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await documents.getOne(req.params.id, baseUrl));
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting document ', err.message);
    next(err);
  }
});

/* POST document */
router.post('/', async (req, res, next) => {
  try {
    // eslint-disable-next-line consistent-return
    upload(req, res, async (err) => {
      const { error } = validateRegister(req.body);
      if (error) return next(error.details[0]);

      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            message: 'file is too large'
          });
        }

        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            message: 'File limit reached'
          });
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({
            message: 'File must be an pdf'
          });
        }
      }
      console.log(req.body);
      console.log(req.files);
      // upload file on remote storage
      const results = await s3Uploadv2(req.files);
      const document = { ...req.body, source_doc: results[0].Key };
      // save result info to database
      res.json(await documents.create(document));
    });
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while creating document', err.message);
    next(err);
  }
});

/* PUT document */
router.put('/:id', async (req, res, next) => {
  try {
    // eslint-disable-next-line consistent-return
    upload(req, res, async (err) => {
      const { error } = validateUpdate(req.body);
      if (error) return next(error.details[0]);
      let results = [];
      if (req.body.is_file_delete) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
              message: 'file is too large'
            });
          }

          if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
              message: 'File limit reached'
            });
          }

          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
              message: 'File must be an pdf'
            });
          }
        }

        // upload file on remote storage
        results = await s3Uploadv2(req.files);
      }
      const mySrc = results.length > 0 ? results[0].Key : req.body.source_doc;
      const document = { ...req.body, source_doc: mySrc };
      // update result info to database
      res.json(await documents.update(req.params.id, document));
    });
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while updating document', err.message);
    next(err);
  }
});

/* DELETE document */
router.delete('/:id', async (req, res, next) => {
  try {
    res.json(await documents.remove(req.params.id));
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while deleting document', err.message);
    next(err);
  }
});

module.exports = router;
