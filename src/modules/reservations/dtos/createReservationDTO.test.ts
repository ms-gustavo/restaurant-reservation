import "reflect-metadata";
import { validateDTO } from "../../../shared/middlewares/validateBody";
import { CreateReservationDTO } from "./createReservationDTO";
import { Request, Response, NextFunction } from "express";

describe("CreateReservationDTO Validation Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  const middleware = validateDTO(CreateReservationDTO);

  const baseRequestBody = {
    date: new Date(),
    hour: new Date(),
    client: "John Doe",
    email: "johndoe@example.com",
    reserveSize: 4,
  };

  function removeKeyFromBody(key: string) {
    const newBody = { ...mockRequest.body };
    delete newBody[key];
    mockRequest.body = newBody;
  }

  beforeEach(() => {
    jest.clearAllMocks();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = { body: { ...baseRequestBody } };
  });

  it("should pass validation with valid data", async () => {
    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it("should return a 400 error if Date is missing", async () => {
    removeKeyFromBody("date");

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "date",
          error: expect.stringContaining("A data é obrigatória"),
        }),
      ]),
    });
  });

  it("should return a 400 error if Hour is missing", async () => {
    removeKeyFromBody("hour");

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "hour",
          error: expect.stringContaining("O horário é obrigatório"),
        }),
      ]),
    });
  });

  it("should return a 400 error if Client is missing", async () => {
    removeKeyFromBody("client");

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "client",
          error: expect.stringContaining("O nome do cliente é obrigatório"),
        }),
      ]),
    });
  });

  it("should return a 400 error if Email is missing", async () => {
    removeKeyFromBody("email");

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "email",
          error: expect.stringContaining("O email é obrigatório"),
        }),
      ]),
    });
  });

  it("should return a 400 error if Email is invalid", async () => {
    mockRequest.body.email = "invalid-email";

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "email",
          error: expect.stringContaining(
            "O email precisa ser um endereço válido"
          ),
        }),
      ]),
    });
  });

  it("should return a 400 error if reserveSize is undefined", async () => {
    mockRequest.body.reserveSize = undefined;

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "reserveSize",
          error: expect.stringContaining("O número de pessoas é obrigatório"),
        }),
      ]),
    });
  });

  it("should return a 400 error if reserveSize is not a integer", async () => {
    mockRequest.body.reserveSize = 10.5;

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "reserveSize",
          error: expect.stringContaining(
            "O número de pessoas precisa ser um número inteiro"
          ),
        }),
      ]),
    });
  });

  it("should return a 400 error if reserveSize lower than 1", async () => {
    mockRequest.body.reserveSize = 0;

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "reserveSize",
          error: expect.stringContaining("O número mínimo de pessoas é 1"),
        }),
      ]),
    });
  });

  it("should return a 400 error if reserveSize greater than 20", async () => {
    mockRequest.body.reserveSize = 30;

    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Erro de validação dos dados",
      details: expect.arrayContaining([
        expect.objectContaining({
          field: "reserveSize",
          error: expect.stringContaining("O número máximo de pessoas é 20"),
        }),
      ]),
    });
  });
});
