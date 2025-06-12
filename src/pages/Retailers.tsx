import React, { useEffect, useState } from 'react';
import { fetchRetailers } from '../services/api';

const Retailers: React.FC = () => {
  const [retailers, setRetailers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRetailers = async () => {
      setLoading(true);
      try {
        const data = await fetchRetailers();
        setRetailers(data);
      } catch (err) {
        setError('Failed to fetch retailers');
      } finally {
        setLoading(false);
      }
    };

    loadRetailers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!retailers.length) return <p>No retailers available.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Authorized Retailers</h1>
      <p>Connect with trusted watch retailers.</p>
      <ul className="mt-4">
        {retailers.map(retailer => (
          <li key={retailer.id} className="mb-2">
            <strong>{retailer.name}</strong> - {retailer.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Retailers; 