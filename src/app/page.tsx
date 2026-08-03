import Homepage from "@/components/homepage/Homepage";

import { getHomepage } from "@/sanity/loaders/homepage";

export default async function Home() {
  const homepage = await getHomepage();

  return <Homepage {...homepage} />;
}