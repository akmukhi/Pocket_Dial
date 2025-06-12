import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWatchDetails } from '../services/api';

const WatchDetails: React.FC = () => {
  const { watchId } = useParams<{ watchId: string }>();
  const [watch, setWatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWatchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchWatchDetails(watchId!);
        setWatch(data);
      } catch (err) {
        setError('Failed to fetch watch details');
      } finally {
        setLoading(false);
      }
    };

    loadWatchDetails();
  }, [watchId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!watch) return <p>No watch details available.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Watch Details</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{watch.name}</h2>
        <p className="text-gray-600">{watch.brand}</p>
        <p className="text-lg font-bold mt-2">{watch.price}</p>
        <p className="mt-2">{watch.description}</p>
      </div>
    </div>
  );
};

export default WatchDetails; 