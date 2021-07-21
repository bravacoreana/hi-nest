import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    /*
    // 여기에 적어줌으로써 반복하지 않아도 됨
    service.create({
      title: "test movie",
      genres: ["test genre"],
      year: 2000,
    });
    */
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne()", () => {
    it("should return a movie", () => {
      service.create({
        title: "test movie",
        genres: ["test genre"],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual("Movie(999) is not found");
      }
    });
  });

  describe("deleteOne()", () => {
    it("deletes a movie", () => {
      service.create({
        title: "test movie",
        genres: ["test genre"],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it("should return a 404", () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "test movie",
        genres: ["test genre"],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title: "test movie",
        genres: ["test genre"],
        year: 2000,
      });
      service.update(1, { title: "updated test" });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("updated test");
    });
    it("should return a notFoundException", () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
