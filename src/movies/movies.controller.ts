import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }
  @Get("/:id")
  getOne(@Param("id") id: string): Movie {
    return this.movieService.getOne(id);
  }
  @Post()
  create(@Body() movie) {
    return this.movieService.createMovie(movie);
  }
  @Delete("/:id")
  delete(@Param("id") id: string) {
    return this.movieService.deleteOne(id);
  }
  // @Put() // update all resource
  @Patch("/:id") // update only one movie
  patch(@Param("id") id: string, @Body() updateData) {
    return this.movieService.update(id, updateData);
  }
}
