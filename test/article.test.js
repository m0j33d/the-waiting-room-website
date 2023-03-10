import supertest from "supertest"
import httpServer from "../bin/www.js"

let token;
let id;

beforeAll((done) => {
  supertest(httpServer)
    .post("/api/v1/user/login")
    .send({
      password: "Password",
      email: "example@example.com",
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

afterAll(() => {
    httpServer.close()
 })

describe("Article Route", () => {
  it("GET /article", async () => {
    const response = await supertest(httpServer).get("/api/v1/article");
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.status).toBe(200);
  });

  it("CREATE /article", async () => {
    const article = {
      title: "Lorem Ipsum",
      summary: "Story of Lorem",
      article_body:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    };
    const response = await supertest(httpServer)
      .post("/api/v1/article")
      .set({
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      })
      .send(article);

    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.status).toBe(201);
    expect(response.body.type).toBe('success');
    expect(response.body.article.title).toBe(article.title);
  
    //set the value of ID
    id = response.body.article.id;
  });


  it("GET /article/:id", async () => {
    const response = await supertest(httpServer)
      .get(`/api/v1/article/${id}`)
      .set({
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      });

    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.status).toBe(200)
    expect(response.body.type).toBe('success');
  });

  it("EDIT /article/:id", async () => {
    const articleUpdate = {
      title: "New Lorem Title",
    };
    const response = await supertest(httpServer)
      .put(`/api/v1/article/${id}`)
      .set({
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      })
      .send(articleUpdate);

    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );

    expect(response.status).toBe(200);
    expect(response.body.type).toBe('success');
    expect(response.body.article.title).toBe(articleUpdate.title);
  });

  it("DELETE /article/:id", async () => {
    const response = await supertest(httpServer)
      .delete(`/api/v1/article/${id}`)
      .set({
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      });
    expect(response.status).toBe(204);
  });
});
