import request from "supertest";
import app from "@/app";
import { StatusCodes } from "http-status-codes";

describe("Echo Controller", () => {
  it("should echo the message", async () => {
    const message = "Hello, World!";
    const response = await request(app).post("/api/echo").send({ message });
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe(message);
  });

  it("should return bad request for empty message", async () => {
    const response = await request(app).post("/api/echo").send({});
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
