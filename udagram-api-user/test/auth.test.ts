import startServer from "../src/server";
import request from "supertest";
import connectDb from "../src/connectdb";

const app = startServer();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ndXllbm5nb3R1bmdsYW1AZ21haWwuY29tIiwiaWF0IjoxNjcyODE3MjgwfQ.30XPEAsfwJBxTw135RvjparneD1UtwMu853rL4GIcf8";

beforeAll(async () => {
  console.log("Jest starting!");
  await connectDb();
});

describe("Test verification", () => {
  test("should return 200 OK", () => {
    return request(app)
					.get("/api/v0/users/verification")
					.set("Authorization", `Bearer ${token}`)
					.expect(200);
  });
});

describe("Test login", () => {
	test("should return auth: true", () => {
		const expectedStatusCode = 200;

		return request(app)
					.post("/api/v0/users/auth/login")
					.send({
						email: "nguyenngotunglam@gmail.com",
						password: "abc123"
					})
					.expect(expectedStatusCode)
					.then((response) => {
						expect(response.body.auth === true)})
	})
});

describe("test register", () => {
	test("should return 200 OK", () => {
		const expectedStatusCode = 201;

		return request(app)
					.post("/api/v0/users/auth/")
					.send({
						email: "abc@test.com",
						password: "abc123"
					})
					.expect(expectedStatusCode)
					.then((response) => {
						expect(response.body.user.email).toStrictEqual("abc@test.com")}
					)
	})
});
