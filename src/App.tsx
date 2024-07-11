import { useEffect, useState } from "react";
import cleanHTMLString from "./contexts/article/adapter/adaptHtmlString.adapter";
import ArticleComponent from "./components/articleComponent";
import { Article } from "./contexts/article/domain/Article";
import { savePointsFilterAction, saveCommsFilterAction } from "./storage";
import { LoadArticles } from "./contexts/article/infrastructure/loadArticle.application";
import adaptArticleToObject from "./contexts/article/adapter/articleAdapter.adapter";

function App() {
  const [commFilterClick, setCommFilterClicks] = useState<number>(0);
  const [pointsFilterClick, setPointsFilterClick] = useState<number>(0);
  const [titles, setTitles] = useState<string[]>();
  const [articles, setArticles] = useState<string[] | null>();
  const [articlesArray, setArticlesArray] = useState<Article[]>([]);
  const [filteredArray, setFilteredArray] = useState<Article[]>([]);
  const [commentsFilterOn, setCommentsFilter] = useState<boolean>(false);
  const [pointsFilterOn, setPointsFilter] = useState<boolean>(false);

  function resetFilters() {
    setCommentsFilter(false);
    setPointsFilter(false);
  }

  function commsFilter() {
    let articlesWithNum: Article[] = articlesArray.map((a) => {
      if (a.title === undefined) {
        return {
          ...a,
          titleWordsCount: 0,
        };
      }
      setCommFilterClicks(commFilterClick + 1);
      const words = a.title.split(" ");
      const numberOfWords = words.reduce((acc, curr) => {
        const reg = new RegExp(`\\W{${curr.length}}`, "gm");
        if (reg.test(curr)) {
          return acc;
        }
        return acc + 1;
      }, 0);

      return {
        ...a,
        titleWordsCount: numberOfWords,
      };
    });

    articlesWithNum = articlesWithNum
      .filter((ar) => (ar.titleWordsCount ? ar.titleWordsCount : 0) > 5)
      .sort((a, b) => (b?.comments ?? 0) - (a?.comments ?? 0));
    setCommentsFilter(!commentsFilterOn);
    setFilteredArray(articlesWithNum);
  }

  function pointsFilter() {
    let articlesWithNum: Article[] = articlesArray.map((a) => {
      if (a.title === undefined) {
        return {
          ...a,
          titleWordsCount: 0,
        };
      }
      setPointsFilterClick(pointsFilterClick + 1);
      const words = a.title.split(" ");
      const numberOfWords = words.reduce((acc, curr) => {
        const reg = new RegExp(`\\W{${curr.length}}`, "gm");
        if (reg.test(curr)) {
          return acc;
        }
        return acc + 1;
      }, 0);

      return {
        ...a,
        titleWordsCount: numberOfWords,
      };
    });

    articlesWithNum = articlesWithNum
      .filter((ar) => (ar.titleWordsCount ? ar.titleWordsCount : 0) <= 5)
      .sort((a, b) => (b?.points ?? 0) - (a?.points ?? 0));
    setPointsFilter(!pointsFilterOn);
    setFilteredArray(articlesWithNum);
  }

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
        const article = adaptArticleToObject(titles, i);
        arr.push(article);
      }
      setArticlesArray(arr);
    }
  }, [articles]);

  useEffect(() => {
    savePointsFilterAction(pointsFilterClick);
    saveCommsFilterAction(commFilterClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commFilterClick, pointsFilterClick]);

  return (
    <main className="w-4/5 m-auto">
      <div
        className="mt-20 mb-10"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="btn btn-lg btn-active btn-primary mx-2"
          onClick={() => pointsFilter()}
        >
          Order by points
        </button>

        <button
          className="btn btn-lg btn-active btn-secondary mx-2"
          onClick={() => commsFilter()}
        >
          Order by comments
        </button>
        <button
          className="btn btn-lg btn-warning mx-2"
          onClick={() => resetFilters()}
        >
          Reset filters
        </button>
      </div>
      <div className="grid grid-cols-3 auto-cols-2fr">
        {commentsFilterOn || pointsFilterOn
          ? filteredArray?.map((article) =>
              article.title ? (
                <ArticleComponent article={article} key={article.id} />
              ) : null
            )
          : articlesArray?.map((article) =>
              article.title ? (
                <ArticleComponent key={article.id} article={article} />
              ) : null
            )}
      </div>
    </main>
  );
}

export default App;
