
import CreateArticle from "./components/CreateArticle";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manage News Articles</h1>
        <CreateArticle />
      </div>
      {/* <ArticleList/> */}
    </main>
  );
}
//test push
