import request from "supertest";
import allRoutes from "../src/app";
import config from "../src/appConfig/index";

describe("GET /api", () => {


   let app: any  = null;

   beforeAll(() => {
     app = new allRoutes(config.PORT).app;
   });

    it("should return 200 OK", () => {
        return request(app).get("/ping", (err, res) => {
            expect(200);
        });
    });
});