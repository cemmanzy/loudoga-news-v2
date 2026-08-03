import type { Article } from "@/types/article";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import HorizontalArticleCard from "../cards/HorizontalArticleCard";

interface Props {
  title: string;
  articles: Article[];
}

export default function CategoryPage({
  title,
  articles,
}: Props) {
  return (
    <Container className="my-16">

      <SectionTitle>

        {title.charAt(0).toUpperCase() + title.slice(1)}

      </SectionTitle>

      <div className="space-y-6">

        {articles.map((article) => (

          <HorizontalArticleCard
            key={article._id}
            article={article}
          />

        ))}

      </div>

    </Container>
  );
}