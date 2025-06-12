import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatches } from '../services/api';
import { setWatches } from '../store/slices/watchSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const watches = useSelector((state: any) => state.watches.items);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadWatches = async () => {
      try {
        const data = await fetchWatches();
        dispatch(setWatches(data));
        setLoading(false);
      } catch (err) {
        setError('Failed to load watches. Please try again later.');
        setLoading(false);
      }
    };

    loadWatches();
  }, [dispatch]);

  const filteredWatches = watches.filter((watch: any) =>
    watch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Watches</h1>
      <input
        type="text"
        placeholder="Search watches..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWatches.map((watch: any) => (
          <div key={watch.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{watch.name}</h2>
            <p className="text-gray-600">{watch.brand}</p>
            <p className="text-gray-800">${watch.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search; 