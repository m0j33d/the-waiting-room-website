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
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  first_name | string  |  required|
|  last_name  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |
|  phone_number |  string |  optional |


### Article
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  created_at |  date |  required |
|  state | string  |  required, default:draft, enum: ['draft', 'published'] |
|  title  |  string |  required, unique  |
|  description |   string |  required  |
|  author |  number |  required |
|  body |  string |  required |



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
  "message": "Registration successful!",
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
  "email": 'doe@example.com",
}
```

- Responses

Success
```
{
  "type": success
  "message": You are successfully logged in,
  "token": "nnfnfjfjkfdjkdfkdj",
}
```

---
### Create Blog

- Route: /blog
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "Tent",
  "description": "Story of Tent",
  "tags": ["Mytag1", "Mytag2"],
  "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}
```

- Responses

Success
```
{
  "msg": "Blog created successfully!",
  "data": {
    "title": "Tent",
    "description": "Story of Tent",
    "author": "6363e35ac448afb0a73c320d",
    "state": "draft",
    "read_count": 0,
    "tags": ["Mytag1", "Mytag2"],
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "createdAt": "2022-11-03T15:59:01.387Z",
    "reading_time": 1 min
  }
}
```
---
### Get Blog by Id

- Route: /blog/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "status": true,
  "data": {
    "_id": "6363e5451a82fea6773422bf",
    "title": "Tent",
    "description": "Story of Tent",
    "author": "6363e35ac448afb0a73c320d",
    "state": "draft",
    "read_count": 2,
    "tags": ["Mytag1", "Mytag2"],
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "createdAt": "2022-11-03T15:59:01.387Z",
  },
  "author": {
    "first_name": "MJ",
    "last_name": "AD",
    "email": "mj@mj.com",
    "phone_number": "",
  }
}
```
---

### Get All blogs

- Route: /blog
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
{
  "status": true,
  "data": [
    {
      "_id": "6363e5451a82fea6773422bf",
      "title": "Tent",
      "description": "Story of Ten",
      "author": "6363e35ac448afb0a73c320d",
      "state": "published",
      "read_count": 2,
      "tags": ["tent"],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "createdAt": "2022-11-03T15:59:01.387Z",
      "updatedAt": "2022-11-03T16:16:37.821Z",
    }
  ]
}
```
---

### Get all blogs by a user

- Route: /blog/allBlogs
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
{
  "status": true,
  "data": [
    {
      "_id": "6363e5451a82fea6773422bf",
      "title": "Tent",
      "description": "Story of Ten",
      "author": "6363e35ac448afb0a73c320d",
      "state": "published",
      "read_count": 2,
      "tags": ["tent"],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "createdAt": "2022-11-03T15:59:01.387Z",
      "updatedAt": "2022-11-03T16:16:37.821Z",
    }
  ]
}
```
---

### Edit blog

- Route: /blog/:id
- Method: PUT
- Header:
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "Tent v2",
  "description": "Story of Tent v2",
}
```
- Responses

Success
```
  {
  "msg": "Blog Updated Successfully",
  "data": {
    "read_count": 0,
    "_id": "635eeb7908facaf61af9a5fd",
    "title": "Tent v2",
    "description": ""Story of Tent v2",
    "author": "635d1d946e0fd51acc2f1d77",
    "read_count": 2,
    "tags": ["tent"],
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "createdAt": "2022-11-03T15:59:01.387Z",
    "updatedAt": "2022-11-03T16:16:37.821Z",
  }

```
---

...

## Contributor
- Mojeed Adeoye