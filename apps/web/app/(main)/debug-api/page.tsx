export default async function DebugApiPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const [healthRes, productsRes] = await Promise.all([
    fetch(`${base}/health`, { cache: "no-store" }),
    fetch(`${base}/products`, { cache: "no-store" }),
  ]);

  const health = await healthRes.json();
  const products = await productsRes.json();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">API Smoke Test</h1>

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">/health</h2>
        <pre className="text-sm overflow-auto">{JSON.stringify(health, null, 2)}</pre>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">/products</h2>
        <pre className="text-sm overflow-auto">{JSON.stringify(products, null, 2)}</pre>
      </section>
    </main>
  );
}
