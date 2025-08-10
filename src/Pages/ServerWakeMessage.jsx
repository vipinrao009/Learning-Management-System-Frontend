import { useEffect, useState } from "react";

export default function ServerWakeMessage({ apiUrl }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [apiUrl]);

  if (!loading) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-70 mb-4"></div>
      <h2 className="sm:text-xl md:text-2xl font-bold text-primary">⚡Waking up the server...</h2>
      <p className="text-base text-gray-400 mt-2">
        This may take <span className="font-semibold">30–60 seconds</span> on first load.  
        Thanks for waiting 😊
      </p>
    </div>
  );
}
