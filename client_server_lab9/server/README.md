### __List all films__

URL: `/api/films`

HTTP Method: GET.

Description: Get all the available films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": "1",
    "watchdate": "2023-03-10"
    "rating":"5"
  },
  ...
]
```


### __Get a single film__

URL: `/api/film/<id>`

HTTP Method: GET.

Description: Get the film represented by the `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

```
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": "1",
    "watchdate": "2023-03-10"
    "rating":"5"
  }

```



### __Update an existing film__

URL: `/api/film/<id>`

HTTP Method: PUT.

Description: Update an identified by `<id>`.

Request body: A JSON object representing the film.
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": "1",
    "watchdate": "2023-03-10"
    "rating":"5"
  },
  ...
]
```

### __Update an existing film__

URL: `/api/films/<id>`

HTTP Method: PUT.

Description: Update an identified by `<id>`.

Request body: A JSON object representing the film.
```
 {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": "1",
    "watchdate": "2023-03-10"
    "rating":"5"
  }
```

Response: `200 OK` (success), `404 Not Found` (wrong id), or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).