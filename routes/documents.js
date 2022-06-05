const express = require("express");
const router = express.Router();
const documents = require("../services/documents");

/* GET documents. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await documents.getMultiple(req.query.page,req.query.matricule));
  } catch (err) {
    console.error(`Error while getting documents `, err.message);
    next(err);
  }
});


/* GET document. */
router.get("/:id", async function (req, res, next) {
  try {
    res.json(await documents.getOne(req.params.id));
  } catch (err) {
    console.error(`Error while getting document `, err.message);
    next(err);
  }
});

/* POST document */
router.post("/", async function (req, res, next) {
  try {
    res.json(await documents.create(req.body));
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
