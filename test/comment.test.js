import supertest from "supertest"
import httpServer from "../bin/www.js"

let token
let id

beforeAll((done) => {
    supertest(httpServer)
      .post('/api/v1/user/login')
      .send({
        "password": "Password",
        "email" : "example@example.com"
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
 });

 afterAll(() => {
    httpServer.close()
 })

describe("Comment Route", () => {

    it('CREATE /comment', async () => {
        const comment = {
            "article_id": 7,
            "comment": "Story of Ten",
        }

        const response = await supertest(httpServer)
        .post("/api/v1/comment")
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })
        .send(comment)  

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(201)
        expect(response.body.type).toBe('success')
        expect((response) => {
            if (!('comment' in response.body)) throw new Error("missing field comment");
        })

        //set the value of ID
        id = response.body.comment.id
    })


    it('GET /comment/:id', async () => {
        const response = await supertest(httpServer)
        .get(`/api/v1/comment/${id}`)
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
    })

    it('EDIT /comment/:id', async () => {
        const commentUpdate = {
            "comment": "I changed my comment"
        }
        const response = await supertest(httpServer)
        .put(`/api/v1/comment/${id}`)
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })
        .send(commentUpdate)

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(id).toBe(response.body.comment.id)
    })

    it('DELETE /comment/:id', async () => {
        const response = await supertest(httpServer)
        .delete(`/api/v1/comment/${id}`)
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })
        expect(response.status).toBe(204)
    })
})
