import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../services/api';
import { setUser } from '../store/slices/userSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUser();
        dispatch(setUser(data));
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data. Please try again later.');
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile; 