import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
  // database part
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id); // +id: string to number
    if (!movie) {
      throw new NotFoundException(`Movie(${id}) is not found`);
    }
    return movie;
  }
  deleteOne(id: string): void {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
