const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1,matricule="") {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, nom_etudiant, matricule_etudiant, departement_etudiant, titre_doc, mot_cle_doc,
    membre_jury_soutenance, directeur_soutenance, source_doc, description_doc, annee_soutenance 
    FROM document WHERE matricule_etudiant LIKE '${matricule}%' LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}



async function getOne(id) {
 
  const rows = await db.query(
    `SELECT id, nom_etudiant, matricule_etudiant, departement_etudiant, titre_doc, mot_cle_doc,
    membre_jury_soutenance, directeur_soutenance, source_doc, description_doc, annee_soutenance 
    FROM document WHERE id=${id}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { id };

  return {
    data,
    meta,
  };
}

async function create(document) {
  const result = await db.query(
    `INSERT INTO document 
    (nom_etudiant, matricule_etudiant, departement_etudiant, titre_doc, mot_cle_doc,
      membre_jury_soutenance, directeur_soutenance, source_doc, description_doc, annee_soutenance) 
    VALUES 
    ("${document.nom_etudiant}", "${document.matricule_etudiant}", 
    "${document.departement_etudiant}",
     "${document.titre_doc}",
     "${document.mot_cle_doc}",
     "${document.membre_jury_soutenance}",
     "${document.directeur_soutenance}",
    "${document.source_doc}",
     "${document.description_doc}",
      "${document.annee_soutenance}")`
  );

  let message = "Error in creating document";

  if (result.affectedRows) {
    message = "Document created successfully";
  }

  return { message };
}

async function update(id, document) {
  const result = await db.query(
    `UPDATE document 
    SET nom_etudiant="${document.nom_etudiant}",
    matricule_etudiant="${document.matricule_etudiant}",
    departement_etudiant="${document.departement_etudiant}",
    titre_doc="${document.titre_doc}", 
    mot_cle_doc="${document.mot_cle_doc}",
    membre_jury_soutenance="${document.membre_jury_soutenance}", 
    directeur_soutenance="${document.directeur_soutenance}",
    source_doc="${document.source_doc}",
    description_doc="${document.description_doc}",
    annee_soutenance="${document.annee_soutenance}"
    WHERE id=${id}`
  );

  let message = "Error in updating document";

  if (result.affectedRows) {
    message = "Document updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM document WHERE id=${id}`
  );

  let message = "Error in deleting document";

  if (result.affectedRows) {
    message = "Document deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getOne,
};
