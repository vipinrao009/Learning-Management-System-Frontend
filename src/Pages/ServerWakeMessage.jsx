import { useEffect, useState } from "react";

export default function ServerWakeMessage({ apiUrl }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sirf tab dikhao agar sessionStorage me warmup ka record nahi hai
    const alreadyWarmed = sessionStorage.getItem("serverWarmed");
    if (!alreadyWarmed) {
      setLoading(true);
      fetch(apiUrl)
        .then(() => {
          setLoading(false);
          sessionStorage.setItem("serverWarmed", "true");
        })
        .catch(() => setLoading(false));
    }
  }, [apiUrl]);

  if (!loading) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[10vh] text-center pt-2 pb-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-700 border-opacity-70 mb-2"></div>
      <h2 className="sm:text-xl md:text-2xl font-bold text-primary">
        ⚡Waking up the server...
      </h2>
      <p className="text-base text-gray-700 mt-2">
        This may take{" "}
        <span className="font-semibold text-red-600">30–60 seconds</span> on first load.  
        Thanks for waiting 😊
      </p>
    </div>
  );
}
