import { ArticleData, extractFromHtml } from '@extractus/article-extractor'

export class ScraperRepository{
    private url: string;
    constructor(){
        this.url = "http://news.ycombinator.com/"
    }

    async getArticles(): Promise<ArticleData | null> {
        const url = `http://localhost:8080/${this.url}`;
        try{
            // const article = await extract(url)
            const data = await fetch(url)
          
            const html = await data.text()
        
            const article = await extractFromHtml(html, url)

            if (!html ) return null; 
            
            return article
        }catch(err){
            console.error(err)
            throw new Error("Something went wrong.")
        }
    }
}