const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, 
  limit = config.listPerPage,
   matricule = "",
   nom="",
   departement="",
   type_doc="",
   annee="",
   baser_url) {
  //const offset = helper.getOffset(page, config.listPerPage);
  const rowsAll = await db.query(
    `SELECT id, nom_etudiant, matricule_etudiant, departement_etudiant, titre_doc, mot_cle_doc,
    membre_jury_soutenance, directeur_soutenance, source_doc,type_doc, description_doc, annee_soutenance 
    FROM document WHERE matricule_etudiant LIKE '${matricule}%' 
    AND nom_etudiant LIKE '${nom}%'
    AND departement_etudiant LIKE '${departement}%'
    AND type_doc LIKE '${type_doc}%'
    AND annee_soutenance LIKE '${annee}%'`
  );
  const total_count = helper.emptyOrRows(rowsAll).length;
  const offset = helper.getOffset(page, limit);
  const rows = await db.query(
    `SELECT id, nom_etudiant, matricule_etudiant, departement_etudiant, titre_doc, mot_cle_doc,
    membre_jury_soutenance, directeur_soutenance, source_doc,type_doc, description_doc, annee_soutenance 
    FROM document WHERE matricule_etudiant LIKE '${matricule}%' 
    AND nom_etudiant LIKE '${nom}%'
    AND departement_etudiant LIKE '${departement}%'
    AND type_doc LIKE '${type_doc}%'
    AND annee_soutenance LIKE '${annee}%'
    LIMIT ${offset},${limit}`
  );
  const data = helper.emptyOrRows(rows);
  const page_count = data.length;
  const meta = {
    page,
    limit,
    total_count,
    page_count,
    baser_url
  };

  return {
    data,
    meta
  };
}



async function getOne(id, baser_url) {

  const rows = await db.query(
    `SELECT id, nom_etudiant, matricule_etudiant, departement_etudiant, titre_doc, mot_cle_doc,
    membre_jury_soutenance, directeur_soutenance, source_doc,type_doc, description_doc, annee_soutenance 
    FROM document WHERE id=${id}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { id, baser_url };

  return {
    data,
    meta,
  };
}

async function create(document) {
  const result = await db.query(
    `INSERT INTO document 
    (nom_etudiant, matricule_etudiant, departement_etudiant, titre_doc, mot_cle_doc,
      membre_jury_soutenance, directeur_soutenance, source_doc,type_doc, description_doc, annee_soutenance) 
    VALUES 
    ("${document.nom}",
     "${document.matricule}", 
    "${document.departement}",
     "${document.titre_memoire}",
     "${document.mot_cle}",
     "${document.membre_jury}",
     "${document.directeur_memoire}",
    "${document.source_doc}",
    "${document.type_doc}",
     "${document.description}",
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
    type_doc="${document.type_doc}",
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
