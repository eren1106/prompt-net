import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const Loader: React.FC = () => {
    return loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null;
  };

  return { loading, setLoading, Loader };
};

export default useLoading;