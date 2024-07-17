import { describe, expect } from "@jest/globals";
import { randomUUID } from "crypto";
import { User } from "../../domain/entities/user.entity";
import { IUserPort } from "../../domain/ports/user-port";
import { Service } from "../../domain/entities/service.entity";
import { UserAdapter } from "../user-adapter";

// Create a mock implementation of IUserPort
const mockUserRepository: IUserPort = {
  getById: jest.fn(),
  getUserServicesById: jest.fn(),
  getByUsername: jest.fn(),
  getByEmail: jest.fn(),
  save: jest.fn(),
};

describe("UserAdapter", () => {
  let userAdapter: UserAdapter;

  beforeEach(() => {
    userAdapter = new UserAdapter(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call getById on the user repository", async () => {
    const userId = randomUUID();
    const expectedUser = new User(
      userId,
      "John",
      "Doe",
      "john@example.com",
      "password",
      "Customer",
      [],
      null,
      new Date(),
    );
    (mockUserRepository.getById as jest.Mock).mockImplementation(() =>
      Promise.resolve(expectedUser),
    );

    const userAdapter = new UserAdapter(mockUserRepository);
    const result = await userAdapter.getById(userId);

    expect(mockUserRepository.getById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedUser);
  });

  test("should call getUserServicesById on the user repository", async () => {
    const userId = randomUUID();
    const expectedServices = [
      new Service(
        randomUUID(),
        "Service 1",
        "Description 1",
        0,
        "Category 1",
        "State 1",
        "City 1",
        userId,
        [],
        new Date(),
      ),
    ];
    (mockUserRepository.getUserServicesById as jest.Mock).mockResolvedValue(
      expectedServices,
    );

    const result = await userAdapter.getUserServicesById(userId);

    expect(mockUserRepository.getUserServicesById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedServices);
  });

  test("should call getByUsername on the user repository", async () => {
    const username = "john";
    const expectedUser = new User(
      randomUUID(),
      username,
      "Doe",
      "john@example.com",
      "password",
      "Customer",
      [],
      null,
      new Date(),
    );
    (mockUserRepository.getByUsername as jest.Mock).mockResolvedValue(
      expectedUser,
    );

    const result = await userAdapter.getByUsername(username);

    expect(mockUserRepository.getByUsername).toHaveBeenCalledWith(username);
    expect(result).toEqual(expectedUser);
  });

  test("should call getByEmail on the user repository", async () => {
    const email = "john@example.com";
    const expectedUser = new User(
      randomUUID(),
      "john",
      "Doe",
      email,
      "password",
      "Customer",
      [],
      null,
      new Date(),
    );
    (mockUserRepository.getByEmail as jest.Mock).mockResolvedValue(
      expectedUser,
    );

    const result = await userAdapter.getByEmail(email);

    expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual(expectedUser);
  });

  test("should call save on the user repository", async () => {
    const user = new User(
      randomUUID(),
      "john",
      "Doe",
      "john@example.com",
      "password",
      "Customer",
      [],
      null,
      new Date(),
    );
    (mockUserRepository.save as jest.Mock).mockResolvedValue(user);

    const userAdapter = new UserAdapter(mockUserRepository);
    const result = await userAdapter.save(user);

    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });
});
