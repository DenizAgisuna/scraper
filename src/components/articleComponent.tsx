import { Article } from "../contexts/article/domain/Article";
interface Props {
  article: Article;
}

function ArticleComponent({ article }: Props) {
  return (
    <>
      <div className="card bg-neutral text-neutral-content  m-5">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{`${article.id}.${article.title}`}</h2>
          <div className="card-actions justify-end mt-auto">
            <div className="grid grid-cols-2">
              <button className="btn mx-1">
                 <span className="text">Points</span>
                <div className="badge badge-primary"> {`${article.points}`}</div>
              </button>
              <button className="btn mx-1">
               <span className="text">Comments</span>
                <div className="badge badge-secondary">{`${article.comments}`}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleComponent;
