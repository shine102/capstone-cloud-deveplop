import startServer from "../src/server";
import request from "supertest";
import connectDb from "../src/connectdb";
import axios from "axios";

const fs = require('fs')

const app = startServer();


beforeAll(async () => {
  console.log("Jest starting!");
  await connectDb();
});

afterAll(async () => {
  console.log("Jest ending!");
});

describe("Test root path", () => {
  test("should return 200 OK", () => {
    return request(app).get("/api/v0/").expect(200);
  });
});

describe("Test get all feed items", () => {
  test("200 - feeds", () => {
    const expectedStatusCode = 200;
    const expectedResponse = {
      count: 0,
      rows: [] as string[],
    };
    return request(app)
      .get("/api/v0/feed")
      .expect(expectedStatusCode)
      .then((response) => {
        expect(response.body).toStrictEqual(expectedResponse);
      }
      );
  });
});

describe("create feed with metadata", () => {

  var url = "";

  beforeEach(async () => {
    await request(app)
    .get('/api/v0/feed/signed-url/xander0.jpg')
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      url = response.body.url;
    })

    const file = await fs.readFile('./xander0.jpg', async () => {
      await axios.put(url, file);
    });

  });

  it("should return 201 OK", async () => {
    await request(app)
    .post("/api/v0/feed")
    .set('Authorization', `Bearer ${token}`)
    .send({
      caption: "test caption",
      url: 'xander0.jpg'
    })
    .expect(201);
  }
  );
});

describe("Test get a feed resource", () => {
  it("should return 200 OK", async () => {
    await request(app).get("/feed/api/v0/feed/1").expect(200);
  }
  );
});