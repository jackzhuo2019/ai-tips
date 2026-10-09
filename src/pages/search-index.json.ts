import { getCollection } from "astro:content";
import { BASE } from "../consts";

export async function GET() {
  const tips = await getCollection("tips", (t) => !t.data.draft);
  const data = tips
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date))
    .map((tip) => ({
      title: tip.data.title,
      description: tip.data.description,
      tags: tip.data.tags,
      category: tip.data.category,
      url: `${BASE}tips/${tip.id}/`,
    }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
