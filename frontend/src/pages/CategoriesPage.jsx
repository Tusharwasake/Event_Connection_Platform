import React, { useState, useEffect } from "react";

const categories = ["music", "nightlife", "gaming", "technology", "charity", "arts", "environments"];

const CategoriesPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = {};
        for (const category of categories) {
          const response = await fetch(
            `https://two447-event-connection-platform-2.onrender.com/user/filter?name=${category}`
          );
          const categoryData = await response.json();
          results[category] = categoryData;
        }
        setData(results);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-500 text-white p-6 text-center">
        <h1 className="text-4xl font-bold">Explore Event Categories</h1>
        <p className="text-lg mt-2">Find events from various categories!</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 capitalize">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data[category]?.length > 0 ? (
                data[category].map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={event.image || "https://via.placeholder.com/400"}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{event.name}</h3>
                      <p className="text-gray-700 mt-2">
                        {event.description || "No description available."}
                      </p>
                      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No events found for {category}.</p>
              )}
            </div>
          </section>
        ))}
      </main>

      <footer className="bg-blue-500 text-white py-4 text-center">
        <p>&copy; 2025 Event Connection Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CategoriesPage;














const gridproblem(i,j,currentSum){
  if(i == M-1 && j == N-1 ){
    return currentSum
  }
  
}


