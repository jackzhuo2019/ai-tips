import { getCollection } from "astro:content";

export async function GET() {
  const tips = await getCollection("tips", (t) => !t.data.draft);
  const data = tips
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date))
    .map((tip) => ({
      title: tip.data.title,
      description: tip.data.description,
      tags: tip.data.tags,
      url: `/tips/${tip.id}/`,
    }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
