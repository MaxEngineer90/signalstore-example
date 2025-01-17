export class Configuration {
  #baseUrl: string;

  constructor(baseurl: string) {
    this.#baseUrl = baseurl;
  }

  get baseUrl() {
    return this.#baseUrl;
  }
}
