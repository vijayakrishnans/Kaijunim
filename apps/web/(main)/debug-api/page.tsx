export default async function DebugApiPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const [healthRes, productsRes] = await Promise.all([
    fetch(`${base}/health`, { cache: "no-store" }),
    fetch(`${base}/products`, { cache: "no-store" }),
  ]);

  const health = await healthRes.json();
  const products = await productsRes.json();

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>API Smoke Test</h1>

      <h2 style={{ marginTop: 24 }}>/health</h2>
      <pre>{JSON.stringify(health, null, 2)}</pre>

      <h2 style={{ marginTop: 24 }}>/products</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  );
}
