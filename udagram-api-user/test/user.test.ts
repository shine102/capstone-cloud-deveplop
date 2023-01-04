import startServer from "../src/server";
import request from "supertest";
import connectDb from "../src/connectdb";

const app = startServer();

beforeAll(async () => {
  console.log("Jest starting!");
  await connectDb();
});


describe("Test get user email", () => {
	test("", () => {
   	const expectedStatusCode = 200;
		return request(app)
					.get("/api/v0/users/nguyenngotunglam@gmail.com")
					.expect(expectedStatusCode)
					.then((response) => {
						expect(response.body.email.length).toBeGreaterThan(0)
					})
					.catch((err) => {
						console.log(err);
					});
	});
	}
);