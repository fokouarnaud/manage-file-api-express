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
In order to run tests run the following commands: 

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
    "success": False, 
    "error": 400,
    "message": "bad request"
}
```
The API will return three error types when requests fail:
- 400: Bad Request
- 404: Resource Not Found
- 422: Not Processable 
- 500: Internal Server Error 

### Endpoints 
#### GET /categories
- General:
    
    - Retrieves a dictionary of categories in which the keys are the IDs, and the value is the corresponding string of the category
    - Arguments of the request : none
    - Returns: object with a single key, "categories", which contains an object "id: category_string": value pair
 
- Sample: `curl http://127.0.0.1:5000/categories`

```
{
  "categories": {
    "1": "Science", 
    "2": "Art", 
    "3": "Geography", 
    "4": "History", 
    "5": "Entertainment", 
    "6": "Sports"
  }
}
```
#### GET /questions
- General:
    - Returns a list of questions objects, success value, and total number of questions, current_category, categories
    - Results are paginated in groups of 10. Include a request argument to choose page number, starting from 1. 
- Sample: `curl http://127.0.0.1:5000/questions`

```
{
  "categories": {
    "1": "Science", 
    "2": "Art", 
    "3": "Geography", 
    "4": "History", 
    "5": "Entertainment", 
    "6": "Sports"
  }, 
  "current_category": "History", 
  "questions": [
    {
      "answer": "Apollo 13", 
      "category": 5, 
      "difficulty": 4, 
      "id": 2, 
      "question": "What movie earned Tom Hanks his third straight Oscar nomination, in 1996?"
    }, 
    {
      "answer": "Tom Cruise", 
      "category": 5, 
      "difficulty": 4, 
      "id": 4, 
      "question": "What actor did author Anne Rice first denounce, then praise in the role of her beloved Lestat?"
    }, 
    {
      "answer": "Maya Angelou", 
      "category": 4, 
      "difficulty": 2, 
      "id": 5, 
      "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?"
    }, 
    {
      "answer": "Edward Scissorhands", 
      "category": 5, 
      "difficulty": 3, 
      "id": 6, 
      "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"
    }, 
    {
      "answer": "Muhammad Ali", 
      "category": 4, 
      "difficulty": 1, 
      "id": 9, 
      "question": "What boxer's original name is Cassius Clay?"
    }, 
    {
      "answer": "Brazil", 
      "category": 6, 
      "difficulty": 3, 
      "id": 10, 
      "question": "Which is the only team to play in every soccer World Cup tournament?"
    }, 
    {
      "answer": "Uruguay", 
      "category": 6, 
      "difficulty": 4, 
      "id": 11, 
      "question": "Which country won the first ever soccer World Cup in 1930?"
    }, 
    {
      "answer": "George Washington Carver", 
      "category": 4, 
      "difficulty": 2, 
      "id": 12, 
      "question": "Who invented Peanut Butter?"
    }, 
    {
      "answer": "Lake Victoria", 
      "category": 3, 
      "difficulty": 2, 
      "id": 13, 
      "question": "What is the largest lake in Africa?"
    }, 
    {
      "answer": "The Palace of Versailles", 
      "category": 3, 
      "difficulty": 3, 
      "id": 14, 
      "question": "In which royal palace would you find the Hall of Mirrors?"
    }
  ], 
  "success": true, 
  "total_questions": 19
}
```
#### POST /questions
- General:
    - Sends a POST request to add a new question

- `curl http://127.0.0.1:5000/questions -X POST -H "Content-Type: application/json" -d '{ "question":  "Here is a new question chain","answer":  "Here is a new answer string","difficulty": 1,"category": 3}'`
```
{
  "created": 25, 
  "success": true
}
```

#### POST /questions
- General:
    - Sends a POST request to search for a specific question by search term

- `curl http://127.0.0.1:5000/questions -X POST -H "Content-Type: application/json" -d '{"searchTerm": "title"}'`
```
{
  "current_category": "History", 
  "questions": [
    {
      "answer": "Maya Angelou", 
      "category": 4, 
      "difficulty": 2, 
      "id": 5, 
      "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?"
    }, 
    {
      "answer": "Edward Scissorhands", 
      "category": 5, 
      "difficulty": 3, 
      "id": 6, 
      "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"
    }
  ], 
  "success": true, 
  "total_questions": 2
}
```

#### DELETE /questions/{question_id}
- General:
  - Deletes a specified question using the question ID
  
- `curl -X DELETE http://127.0.0.1:5000/questions/16`
```
{
  "deleted": 16, 
  "success": true
}
```

#### GET /categories/{category_id}/questions
- General:
  - get questions based on category
  - Arguments de la requête : « category_id » - integer
  - Return: questions based on category
- `curl -X GET  http://127.0.0.1:5000/categories/5/questions`
```
{
  "current_category": "Entertainment", 
  "questions": [
    {
      "answer": "Tom Cruise", 
      "category": 5, 
      "difficulty": 4, 
      "id": 4, 
      "question": "What actor did author Anne Rice first denounce, then praise in the role of her beloved Lestat?"
    }, 
    {
      "answer": "Edward Scissorhands", 
      "category": 5, 
      "difficulty": 3, 
      "id": 6, 
      "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"
    }
  ], 
  "total_questions": 2
}
```

#### POST /quizzes
- General:
    - Sends a POST request to get the next question

- `curl http://127.0.0.1:5000/quizzes -X POST -H "Content-Type: application/json" -d '{"previous_questions": [],"quiz_category": {"type": "Entertainment", "id": 5}}'`
```
{
  "question": {
    "answer": "Edward Scissorhands", 
    "category": 5, 
    "difficulty": 3, 
    "id": 6, 
    "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?"
  }
}
```


## Deployment N/A