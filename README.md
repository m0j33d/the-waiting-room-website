# Article Website
This is an api for an article website

---

## Requirements
1. Users should be able to create their own user account and sign in.
2. Users should be able to write and post articles.
3. Users should be able to edit and delete their own articles.
4. Users should be able to comment on other users' articles.
5. The website should display all articles, with the most recently posted articles first.
6. Users should be able to view a specific article in detail with it’s comments.

---
## Setup
- Install NodeJS, SQL
- pull this repo
- update env with example.env
- run `npm install`
- run `npm run start:dev`

---
<!-- ## Base URL
- https://mojeed.com/ -->


## Models


### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  integer |  required |
|  first_name | string  |  required|
|  last_name  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |


### Article
| field  |  data_type | constraints  |
|---|---|---|
|  id |  integer |  required |
|  title  |  string |  required |
|  summary |   string |  required  |
|  owner_id |  integer |  required |
|  article_body |  string |  required |


### Comment
| field  |  data_type | constraints  |
|---|---|---|
|  id |  integer |  required |
|  user_id  |  integer |  required |
|  comment |   string |  required  |
|  article_id |  integer |  required |


## APIs
---

### Signup User

- Route: /user/signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "first_name": "jhon",
  "last_name": "doe",
}
```

- Responses

Success
```
{
  "type": success
  "message": "Registration successful",
}
```
---
### Login User

- Route: /user/login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "email": "doe@example.com",
}
```

- Responses

Success
```
{
  "type": success
  "message": "Login successful",
  "token": "nnfnfjfjkfdjkdfkdj",
}
```

---
### Create Article

- Route: /article
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "My Article title",
  "summary": "This is a quick summary of what my article is about.",
  "article_body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  "updatedAt": "2023-03-09T10:58:25.013Z",
  "createdAt": "2023-03-09T10:58:25.013Z"
}
```

- Responses

Success
```
{
  type: "success",
  message: "Article created successfully!",
  "article": {
    "id": 1,
    "title": "My Article title",
    "summary": "This is a quick summary of what my article is about.",
    "article_body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "owner_id": 1,
    "updatedAt": "2023-03-09T10:58:25.013Z",
    "createdAt": "2023-03-09T10:58:25.013Z"
  }
}
```
---
### Get Article by Id

- Route: /article/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "type": "success",
  "message": "Request successful",
  "article": {
    "id": 1,
    "title": "My Article title",
    "summary": "This is a quick summary of what my article is about.",
    "article_body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "owner_id": 1,
    "updatedAt": "2023-03-09T10:58:25.013Z",
    "createdAt": "2023-03-09T10:58:25.013Z"
  },
  "comments": [
    {
      "id": 1,
      "user_id": 1,
      "article_id": 1,
      "comment": "This is my comment on this article",
      "updatedAt": "2023-03-09T10:58:25.013Z",
      "createdAt": "2023-03-09T10:58:25.013Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "article_id": 1,
      "comment": "This is my second comment on this article",
      "updatedAt": "2023-03-09T10:58:25.013Z",
      "createdAt": "2023-03-09T10:58:25.013Z"
    }
  ]
}
```
---

### Get All Articles

- Route: /article
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 0)
    - per_page (default: 15)
    - order_by (default: created_at)
- Responses

Success
```
{
  "type": "success",
  "message": "Request successful",
  "articles": [
    {
    "id": 1,
    "title": "My Article title",
    "summary": "This is a quick summary of what my article is about.",
    "article_body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "owner_id": 1,
    "updatedAt": "2023-03-09T10:58:25.013Z",
    "createdAt": "2023-03-09T10:58:25.013Z"
  }
  ]
}
```
---


### Edit Article

- Route: /article/:id
- Method: PUT
- Header:
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "My new title",
  "summary": "I just editted my summary",
}
```
- Responses

Success
```
{
  "type": "success",
  "message": "Article updated successfully",
  "article": {
    "id": 1,
    "title": "My new title",
    "summary": "I just editted my summary",
    "article_body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "owner_id": 1,
    "updatedAt": "2023-03-09T10:58:25.013Z",
    "createdAt": "2023-03-09T10:58:25.013Z"
  }
}

```
---


### Delete Article

- Route: /article/:id
- Method: DELETE
- Header:
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "type": "success",
  "message": "Article deleted successfully",
}

```
---

---
### Create Comment

- Route: /comment
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "article_id" : 4,
  "comment" : "This is a very long boring article for article 4"
}
```

- Responses

Success
```
{
  "type": "success",
  "message": "Comment created successfully!",
  "coment": {
    "id": 1,
    "article_id": 4,
    "comment": "This is a very long boring article for article 4",
    "user_id": 6,
    "updatedAt": "2023-03-09T10:58:25.013Z",
    "createdAt": "2023-03-09T10:58:25.013Z"
  }
}

```


---
### Get Comment by Id

- Route: /comment/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "type": "success",
  "message": "Request successful",
  "comment": {
    "id": 2,
    "user_id": 1,
    "comment": "This is a very long boring article for article 4",
    "article_id": 4,
    "createdAt": "2023-03-09T10:57:54.000Z",
    "updatedAt": "2023-03-09T10:57:54.000Z"
  }

}
```


---
### Edit Comment

- Route: /article/:id
- Method: PUT
- Header:
    - Authorization: Bearer {token}
- Body: 
```
{
  "comment" : "This is the new comment"
}
```
- Response

Success
```
{
  "type": "success",
  "message": "Comment updated successfully",
  "coment": {
    "id": 2,
    "user_id": 6,
    "comment": "This is the new editted comment",
    "article_id": 4,
    "createdAt": "2023-03-09T10:57:54.000Z",
    "updatedAt": "2023-03-09T11:05:56.362Z"
  }
}

```


---
### Delete Comment

- Route: /article/:id
- Method: DELETE
- Header:
    - Authorization: Bearer {token}
- Response

Success
```
{
  "type": "success",
  "message": "Comment deleted successfully",
}

```

---


## Owner
- Mojeed Adeoye