import { Server, Response } from "miragejs";
import mockResponse from "./mock";

export function makeServer({ environment = "development" } = {}) {
  let mockData = mockResponse;
  const server = new Server({
    environment,

    routes() {
      this.namespace = "api";

      this.get("/form-builder", () => {
        return new Response(200, {}, mockData);
      });

      this.get("/form", (schema, request) => {
        if (request.queryParams.uuid === mockData.checklist.form.uuid)
          return new Response(200, {}, mockData);
        else return new Response(404, {}, { message: "Not Found" });
      });

      this.post(
        "/form",
        (schema, request) => {
          mockData = JSON.parse(request.requestBody);
          return new Response(
            200,
            {},
            {
              success: true,
              message: `Successfully added to ${mockResponse.checklist.checklist_title} checklist`,
            }
          );
        },
        { timing: 3000 }
      );

      this.post(
        "/questionnaire",
        (schema, request) => {
          mockData = JSON.parse(request.requestBody);
          return new Response(
            200,
            {},
            {
              success: true,
              message: `Successfully added to ${mockResponse.checklist.checklist_title} checklist`,
            }
          );
        },
        { timing: 3000 }
      );
    },
  });

  return server;
}
