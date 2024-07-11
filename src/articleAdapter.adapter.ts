import { Article } from "./Article";

export default function adaptArticleToObject(titles:string[], i:number) {
    const article: Article = {
        id: parseInt(titles[i - 1].split("      ")[0].replace(".", ""))
          ? parseInt(titles[i - 1].split("      ")[0].replace(".", ""))
          : -1,
        title: titles[i - 1].split("     ")[1],
        points: parseInt(titles[i].split(" ")[0])
          ? parseInt(titles[i].split(" ")[0])
          : 0,
        comments: parseInt(titles[i].split(" ")[2])
          ? parseInt(titles[i].split(" ")[2])
          : 0,
      };
      return article
}

