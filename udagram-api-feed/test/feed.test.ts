import app from "../src/app";
import request from "supertest";


beforeAll(async () => {
  console.log("Jest starting!");
});

afterAll(async () => {
  console.log("Jest ending!");
});

// describe("Test root path", () => {
//   test("should return 200 OK", () => {
//     return request(app).get("/api/v0/").expect(200);
//   });
// });

describe("Test get all feed items", () => {
  test("200 - feeds", () => {
    const expectedStatusCode = 200;
    const expectedResponse = {
      count: 0,
      rows: [] as string[],
    };
    return request(app)
      .get("/api/v0/feed")
      .then((response) => {
        expect(response.statusCode).toBe(expectedStatusCode);
        expect(response.body).toStrictEqual(expectedResponse);
      });
  });
});

describe("test only", () => {
  test("", () => {
    expect(2 + 2).toBe(4);
  });
});

// describe("Test get a feed resource", () => {
//   it("should return 200 OK", async () => {
//     await request(app).get("/feed/api/v0/feed/1").expect(200);
//   }
//   );
// }

// describe("Test create feed with metadata", () => {
//   it("should return 201 OK", async () => {
//     await request(app).post("/feed/api/v0/feed").expect(201);
//   }
//   );
// }

// describe("Test get a signed url to put a new item in the bucket", () => {
//   it("should return 201 OK", async () => {
//     await request(app).get("/feed/api/v0/feed/signed-url/1").expect(201);
//   }
//   );
// }
