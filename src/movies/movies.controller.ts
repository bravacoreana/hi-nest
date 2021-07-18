import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller("movies")
export class MoviesController {
  @Get()
  getAll() {
    return "This will return all movies";
  }
  @Get("/:id")
  getOne(@Param("id") id: string) {
    return `this will return a movie with the id: ${id}`;
  }
  @Post()
  create() {
    return "this will create a movie";
  }
  @Delete("/:id")
  delete(@Param("id") id: string) {
    return `this will delete a movie with the id: ${id}`;
  }
  // @Put() // update all resource
  @Patch("/:id") // update only one movie
  patch(@Param("id") id: string) {
    return `this will update a movie with the id: ${id}`;
  }
}
