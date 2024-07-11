import { ScraperRepository } from "../repository/scraperRepository";

export class LoadArticles {
  private scraperRepository: ScraperRepository;

  constructor() {
    this.scraperRepository = new ScraperRepository();
  }

  async allArticles(): Promise<string | undefined> {
    const allArticles = await this.scraperRepository.getArticles();
    return allArticles?.content;
  }
}
