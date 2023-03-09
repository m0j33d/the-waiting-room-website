const supertest = require("supertest")
const httpServer = require("../bin/www")


afterAll(() => {
    httpServer.close()
 })
 
describe("User Route", () => {
    it('POST /user/signup', async () => {
        const body = {
            "first_name": "Mojeed",
            "last_name": "Adeoye",
            "password": "Password",
            "email" : "example@example0.com"
          }

        const response = await supertest(httpServer).post("/api/v1/user/signup").send(body)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(201)
        expect(response.body.type).toBe('success')
    })

    it('POST /user/login', async () => {
        const blog = {
            "password": "Password",
            "email" : "example@example.com"
        }
        const response = await supertest(httpServer).post("/api/v1/user/login").send(blog)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.type).toBe('success')
        expect((response) => {
          if (!('token' in response.body)) throw new Error("missing field token");
        })

    })

})