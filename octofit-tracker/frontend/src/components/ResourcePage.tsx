import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from '../api';

interface ResourcePageProps {
  resource: string;
  title: string;
}

function ResourcePage({ resource, title }: ResourcePageProps) {
  const [data, setData] = useState<unknown>(null);
  const [items, setItems] = useState<unknown[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(buildApiUrl(resource))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        setData(payload);
        setItems(normalizeApiResponse(payload));
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [resource]);

  return (
    <section className="resource-page">
      <h2>{title}</h2>

      <div className="resource-status">
        {loading && <p>Loading {resource}…</p>}
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      </div>

      {!loading && !error && (
        <>
          <div className="resource-meta">
            <p>
              Resource endpoint: <code>{buildApiUrl(resource)}</code>
            </p>
            <p>{items.length} item{items.length === 1 ? '' : 's'} returned.</p>
          </div>

          {items.length > 0 ? (
            <ul className="resource-list">
              {items.map((item, index) => (
                <li key={index} className="resource-card">
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results were returned from the API.</p>
          )}
        </>
      )}
    </section>
  );
}

export default ResourcePage;
