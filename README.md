# Manage file api

Organizations generally want to show their student's work to a large number of people or other organizations. With manage-file-api they can save important documents such as dissertations and theses, safely.

All code follows [ESLint style guide](https://eslint.org/docs/latest/rules/). 



## Getting Started

### Pre-requisites and Local Development 
Developers using this project should already have [nodejs](https://nodejs.org) installed on their local machines.

#### Frontend

For an example of frontend UI using the api. [View the README.md from source repository for more details.](https://github.com/fokouarnaud/manage-file-nextjs)


#### Backend

Run the following commands to start the api: 
```
npm install // only once to install dependencies
npm start 
```

By default, the app will run on localhost:3000. 


### Tests
Run the following commands for tests:

```
npm test
```

The first time you run the tests, omit the dropdb command. 

All tests are kept in `index.test.js` file and should be maintained as updates are made to app functionality. 

## API Reference

### Getting Started
- Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, `http://127.0.0.1:5000/`, which is set as a proxy in the frontend configuration. 
- Authentication: This version of the application does not require authentication or API keys. 

### Error Handling
Errors are returned as JSON objects in the following format:
```
{
    "success": false,
    "error": 404,
    "message": "Not found"
}
```
The API will return two error types when requests fail:
- 404: Resource Not Found
- 500: Internal Server Error 

### Endpoints 

#### GET /documents
- General:
    - Returns a list of documents objects and meta data value
    - Results are paginated in groups of 10 by default
- Sample: `curl http://127.0.0.1:3000/documents`

```
{
    "data": [
        {
            "id": 3,
            "nom_etudiant": "EBE ZAMBO Yves François",
            "matricule_etudiant": "07P4789",
            "departement_etudiant": "education specialisee",
            "titre_doc": "Image inconsciente et sémiotique du corps. Une approche clinique de deux déterminannts de la relation d’aide en situation de difficulté de réinsertion sociale",
            "mot_cle_doc": "analyse, education",
            "membre_jury_soutenance": "NTUDA EBODE Joseph Vincent, Professeur/UY2 NKELZOK KOMTSINDI Valère,Professeur/UDla NGUIMFACK Léonard, Maitre de Conférences/UY1",
            "directeur_soutenance": "undefined",
            "source_doc": "uploads/742509e0-fad9-4ba4-abfa-1055a4712202-10.1.1.108.5844.pdf",
            "type_doc": "memoire",
            "description_doc": "Durant les deux dernières décennies, la pression à l’évaluation chiffrée, dans le système éducatif québécois, s’est grandement intensifiée. Cette pression a provoqué un accroissement du nombre d’évaluations chiffrées dans les écoles, entrainant dans son sillage des dérives au plan de la pratique comme le gonflement artificiel des notes des élèves pour satisfaire les cibles du Ministère de l’Éducation en matière de réussite. La pression prend de l’ampleur à la fin du primaire, au moment où les élèves de 6e année doivent opérer le passage vers le secondaire. Dans la foulée, la performance scolaire traduite par la note chiffrée représente un critère de choix pour sélectionner les élèves dans certains établissements privés d’enseignement réputés pour leur « excellence ». Dans ce contexte, l’évaluation chiffrée est devenue un enjeu sociopolitique. À ce jour, la recherche a surtout documenté les impacts psychologiques de la pression à l’évaluation chiffrée sur le travail d’enseignant·e·s (stress, anxiété, fatigue, abandon) ; peu d’attention a été portée à la manière dont les enseignant·e·s s’ajustent pour composer avec ce contexte. Ainsi, ce mémoire vise à comprendre comment des enseignant·e·s de 6e année du primaire s’adaptent face à la pression à l’évaluation chiffrée des apprentissages des élèves québécois. Plus précisément, il documente les formes d’adaptations secondaires que les enseignant·e·s déploient pour négocier les contraintes institutionnelles et les conventions professionnelles qui se construisent autour de l’évaluation chiffrée des apprentissages. La théorie de Perrenoud (2004b) sur le « métier d’élève » est ici transposée au « métier d’enseignant » afin d’éclairer ces adaptations secondaires. Sur le plan méthodologique, le point de vue des enseignant·e·s a été privilégié, recueilli au moyen d’entretiens individuels conduits auprès de 4 enseignantes de 6e année travaillant dans des établissements d’enseignement primaire de Montréal et de Laval. Les données recueillies sont présentées suivant deux registres d’analyse. Dans le premier registre, le matériau de recherche est analysé selon le point de vue des participantes à partir d’une stratégie de raisonnement par questionnement analytique (Paillé et Mucchielli (2016). Il en ressort trois catégories d’adaptations secondaires que les enseignantes ont développées pour s’affranchir un peu de l’influence externe qui pèse sur leur travail, à savoir : l’allègement des tâches d’évaluation, l’alignement des modalités d’évaluation et l’ajustement de l’évaluation selon une commande externe. Dans le deuxième registre, en cohérence avec la démarche inductive employée, un éclairage complémentaire est mobilisé pour donner sens à la dynamique d’actions réciproques entre les acteurs qui sous-tend ces stratégies d’adaptation. Il s’agit de la théorie de la régulation sociale de Reynaud (1979), issue de la sociologie des organisations. Combinée aux apports d’autres auteurs affiliés à une perspective interactionniste, cette théorie conduit à éclairer la fabrique de l’évaluation par la mise en relief de trois stratégies de régulation : la régulation de contrôle, la régulation autonome et la régulation conjointe.",
            "annee_soutenance": "2021"
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "totalCount": 1,
        "pageCount": 1,
        "baseUrl": "https://aws-s3-save.s3.amazonaws.com"
    }
}
```
#### POST /documents
- General:
    - Sends a POST request to add a new document

- `curl -X POST http://127.0.0.1:3000/documents  -H "Content-Type: multipart/form-data" -F "username=demo" -F "nom=Sabahi" -F "matricule=145VFR" -F "departement=Psychopedagogie" -F "titre_memoire=Conception des jeux sérieux éducatifs : comment concevoir une expérience optimale d’apprentissage?" -F  "mot_cle=Jeux serieux, design pedagogique" -F  "membre_jury=Viens Jacques" -F  "directeur_memoire=" -F  "type_doc=memoire" -F  "description=Lesjeuxserieuxchercheaexplorer" -F  "annee_soutenance=2021" -F "file=@/path/to/file.pdf"`
```
{
    "message": "Document created successfully"
}
```

#### PUT /documents/{document_id}
- General:
    - updated specific document by ID

- `curl -X PUT http://127.0.0.1:3000/documents/3  -H "Content-Type: multipart/form-data" -F "username=demo" -F "nom=Sabahi" -F "matricule=145VFR" -F "departement=Psychopedagogie" -F "titre_memoire=Conception des jeux sérieux éducatifs : comment concevoir une expérience optimale d’apprentissage?" -F  "mot_cle=Jeux serieux, design pedagogique" -F  "membre_jury=Viens Jacques" -F  "directeur_memoire=" -F  "type_doc=memoire" -F  "description=Lesjeuxserieuxchercheaexplorer" -F  "annee_soutenance=2021"`
```
{
    "message": "Document updated successfully"
}
```

#### DELETE /documents/{document_id}
- General:
  - Deletes a specified document using ID
  
- `curl -X DELETE http://127.0.0.1:3000/documents/3`
```
{
    "message": "Document deleted successfully"
}
```

#### GET /documents/{document_id}
- General:
  - get specific document by ID
- `curl -X GET  http://127.0.0.1:3000/documents/3`
```
{
    "data": [
        {
            "id": 3,
            "nom_etudiant": "EBE ZAMBO Yves François",
            "matricule_etudiant": "07P4789",
            "departement_etudiant": "education specialisee",
            "titre_doc": "Image inconsciente et sémiotique du corps. Une approche clinique de deux déterminannts de la relation d’aide en situation de difficulté de réinsertion sociale",
            "mot_cle_doc": "analyse, education",
            "membre_jury_soutenance": "NTUDA EBODE Joseph Vincent, Professeur/UY2 NKELZOK KOMTSINDI Valère,Professeur/UDla NGUIMFACK Léonard, Maitre de Conférences/UY1",
            "directeur_soutenance": "undefined",
            "source_doc": "uploads/742509e0-fad9-4ba4-abfa-1055a4712202-10.1.1.108.5844.pdf",
            "type_doc": "memoire",
            "description_doc": "Durant les deux dernières décennies, la pression à l’évaluation chiffrée, dans le système éducatif québécois, s’est grandement intensifiée. Cette pression a provoqué un accroissement du nombre d’évaluations chiffrées dans les écoles, entrainant dans son sillage des dérives au plan de la pratique comme le gonflement artificiel des notes des élèves pour satisfaire les cibles du Ministère de l’Éducation en matière de réussite. La pression prend de l’ampleur à la fin du primaire, au moment où les élèves de 6e année doivent opérer le passage vers le secondaire. Dans la foulée, la performance scolaire traduite par la note chiffrée représente un critère de choix pour sélectionner les élèves dans certains établissements privés d’enseignement réputés pour leur « excellence ». Dans ce contexte, l’évaluation chiffrée est devenue un enjeu sociopolitique. À ce jour, la recherche a surtout documenté les impacts psychologiques de la pression à l’évaluation chiffrée sur le travail d’enseignant·e·s (stress, anxiété, fatigue, abandon) ; peu d’attention a été portée à la manière dont les enseignant·e·s s’ajustent pour composer avec ce contexte. Ainsi, ce mémoire vise à comprendre comment des enseignant·e·s de 6e année du primaire s’adaptent face à la pression à l’évaluation chiffrée des apprentissages des élèves québécois. Plus précisément, il documente les formes d’adaptations secondaires que les enseignant·e·s déploient pour négocier les contraintes institutionnelles et les conventions professionnelles qui se construisent autour de l’évaluation chiffrée des apprentissages. La théorie de Perrenoud (2004b) sur le « métier d’élève » est ici transposée au « métier d’enseignant » afin d’éclairer ces adaptations secondaires. Sur le plan méthodologique, le point de vue des enseignant·e·s a été privilégié, recueilli au moyen d’entretiens individuels conduits auprès de 4 enseignantes de 6e année travaillant dans des établissements d’enseignement primaire de Montréal et de Laval. Les données recueillies sont présentées suivant deux registres d’analyse. Dans le premier registre, le matériau de recherche est analysé selon le point de vue des participantes à partir d’une stratégie de raisonnement par questionnement analytique (Paillé et Mucchielli (2016). Il en ressort trois catégories d’adaptations secondaires que les enseignantes ont développées pour s’affranchir un peu de l’influence externe qui pèse sur leur travail, à savoir : l’allègement des tâches d’évaluation, l’alignement des modalités d’évaluation et l’ajustement de l’évaluation selon une commande externe. Dans le deuxième registre, en cohérence avec la démarche inductive employée, un éclairage complémentaire est mobilisé pour donner sens à la dynamique d’actions réciproques entre les acteurs qui sous-tend ces stratégies d’adaptation. Il s’agit de la théorie de la régulation sociale de Reynaud (1979), issue de la sociologie des organisations. Combinée aux apports d’autres auteurs affiliés à une perspective interactionniste, cette théorie conduit à éclairer la fabrique de l’évaluation par la mise en relief de trois stratégies de régulation : la régulation de contrôle, la régulation autonome et la régulation conjointe.",
            "annee_soutenance": "2021"
        }
    ],
    "meta": {
        "id": "3",
        "baseUrl": "https://aws-s3-save.s3.amazonaws.com"
    }
}
```