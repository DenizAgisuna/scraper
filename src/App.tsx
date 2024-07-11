import { useEffect, useState } from "react";
import "./App.css";
import { LoadArticles } from "./loadArticle.application";
interface Article {
  id: number;
  title: string;
  points?: number;
  comments?: number;
}
function cleanHTMLString(input: string[]): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const trs: string[] = [];
  const as = doc.querySelectorAll("tr");
  const reg =
    / [a-z]{2,2} \w{1,} \d{1,} [a-z]{1,} [a-z]{1,} {2}\| hide \||\d{1,} [a-z]{1,} [a-z]{1,} \| hide |More/gm;
  as.forEach((a) => {
    trs.push(a.innerText.replace(reg, ""));
  });
  for (let i = 0; i < trs.length; i++) {
    trs[i] === "" ? trs.splice(i, 1) : null;
    trs[i] = trs[i].trim();
    trs[i] = trs[i].replace("discuss", "");
  }
  return trs;
}
function App() {
  const [articles, setArticles] = useState<string[] | null>();
  const [titles, setTitles] = useState<string[]>();
  const [articlesArray, setArticlesArray] = useState<Article[]>([]);
  // const [commentsFilter, setCommentsFilter] = useState<boolean>(false)
  // const [commentsFilter, setPointsFilter] = useState<boolean>(false)

  useEffect(() => {
    const loadArticles = new LoadArticles();
    loadArticles.allArticles().then((articlesData) => {
      const cleanData = `${articlesData}`.split("</tr>");
      const titlesArr: string[] = [];
      cleanData.forEach((e) => {
        titlesArr.push(e);
      });

      setTitles(cleanHTMLString(titlesArr));
      setArticles(cleanData);
    });
  }, []);

  useEffect(() => {
    if (titles) {
      const arr = [];
      for (let i = 1; i < titles?.length; i += 2) {
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
        arr.push(article);
        console.log(parseInt(titles[i].split(" ")[2])); //points
      }
      setArticlesArray(arr);
      console.log(articlesArray);
    }
  }, [articles]);
  return (
    <>
      {articlesArray?.map((article) =>
        article.title ? (
          <>
            <h2>{`${article.id}${article.title}`}</h2>
            <span>points: {`${article.points}`}</span>
            <br />
            <span>comments: {`${article.comments}`}</span>

          </>
        ) : (
          ""
        )
      )}
    </>
  );
}

export default App;
