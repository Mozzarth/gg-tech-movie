export class MovieAlreadyExistsError extends Error {
  constructor(movie: string) {
    super(`The movie '${movie}' already exists.`);
  }
}
