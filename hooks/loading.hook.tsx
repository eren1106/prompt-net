import Spinner from '@/components/custom/Spinner';
import React, { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const Loader: React.FC = () => {
    return loading ? <Spinner /> : null;
  };

  return { loading, setLoading, Loader };
};

export default useLoading;