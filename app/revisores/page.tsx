import { getTotalArticles } from "./data";
import ReviewsPanel from "./components/reviews-panel";
import { SelectArticlesAnales } from "@/db/schema";


export default async function RevisoresPage() {
const articles = await getTotalArticles();
  return (
    <div>
      <ReviewsPanel articles={articles as SelectArticlesAnales[]} />
    </div>
  )
}