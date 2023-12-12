export class MovieNotExistError extends Error {
  constructor(movie: string) {
    super(`The movie '${movie}' does not exist.`);
  }
}
