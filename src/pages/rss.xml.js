import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const tips = await getCollection("tips", (t) => !t.data.draft);
  const sorted = tips.sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sorted.map((tip) => ({
      title: tip.data.title,
      description: tip.data.description,
      pubDate: tip.data.date,
      link: `/tips/${tip.id}/`,
      categories: [tip.data.category, ...tip.data.tags],
    })),
  });
}
