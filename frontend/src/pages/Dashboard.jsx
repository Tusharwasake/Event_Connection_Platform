import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
// import './Dashboard.css';
import { Link } from 'react-scroll';
// import ExploreCard from './ExploreBundle';
// import ExploreDiscount from './ExploreDiscount';

const Dashboard = () => {
  const [searched, setsearched] = useState("");
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState("Loading"); 
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  // Function to filter products by category
  const filterByCategory = (category) => {
    const filtered = products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Function to search the products
  const handleSearch = (query) => {
    const searchedData = query.toLowerCase();
    setsearched(query);
    const filteredBySearch = products.filter((product) =>
      product.name.toLowerCase().includes(searchedData)
    );
    setFilteredProducts(filteredBySearch);
    setCurrentPage(1);
  };

  // Fetching data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://mitmart-4276b-default-rtdb.firebaseio.com/Mitmart.json'
      );
      const productsData = Object.values(response.data);
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.log("Some error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to filter products by price range
  const filterByPriceRange = (e) => {
    setMinPrice(e.target.value);
    const filteredByPrice = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filteredByPrice);
    setCurrentPage(1);
  };

  // Function to filter products by brand
  const filterByBrand = (brand) => {
    const filtered = products.filter((product) => product.brand === brand);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Open the details popup
  const viewAllDetails = (card) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
    setShowFilter(false);
  };

  // Pagination calculations
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="button-container">
        <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
        <input
          id="search"
          type="text"
          value={searched}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for Products and More"
          className="search"
        />
      </div>

      <div className="just_style">
        <p>
          Your favorite products,<br /> just a click away! <br />
          <Link className="click_me" to="products">
            Click me
          </Link>
        </p>
        <div>
          <ExploreCard />
          <ExploreDiscount />
        </div>
      </div>

      <div className="container" id="products">
        {/* Rendering product cards here */}
        {currentProducts.map((item, id) => (
          <div key={id} className="card" onClick={() => viewAllDetails(item)}>
            <img
              src={item.image}
              alt="Image is Not Available"
              className="card-image"
            />
            <div className="card-content">
              <h3>{item.name}</h3>
              <h4>
                <ul>{item.brand}</ul>
              </h4>
              <p>{item.description}</p>
              <p>
                <span className="card-price">${item.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(filteredProducts.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
        >
          Next
        </button>
      </div>

      {/* Filtering */}
      {showFilter && (
        <div className="popup">
          <div className="span">Filter</div>
          <div className="nav_filter">
            <p>Brands</p>
            <div className="brands">
              <button id="brand" onClick={() => filterByBrand('TimeKeeper')}>
                TimeKeeper
              </button>
              <button id="brand" onClick={() => filterByBrand('TechGiant')}>
                TechGiant
              </button>
              <button id="brand" onClick={() => filterByBrand('StyleCo')}>
                StyleCo
              </button>
              <button id="brand" onClick={() => filterByBrand('AudioTech')}>
                AudioTech
              </button>
              <button id="brand" onClick={() => filterByBrand('SportFit')}>
                SportFit
              </button>
              <button id="brand" onClick={() => fetchData()}>Reset</button>
            </div>
            <p>Filter by Price</p>
            <div className="priceSet">
              <span>${minPrice} </span> <span>${maxPrice}</span>
            </div>
            <input
              type="range"
              value={minPrice}
              onChange={(e) => filterByPriceRange(e)}
            />
            <p>Categories</p>
            <button id="category" onClick={() => filterByCategory('Electronics')}>
              Show Electronics
            </button>
            <button id="category" onClick={() => filterByCategory('Accessories')}>
              Show Accessories
            </button>
            <button id="category" onClick={() => filterByCategory('Watches')}>
              Show Watches
            </button>
            <button id="category" onClick={() => filterByCategory('Clothes')}>
              Show Clothes
            </button>
            <button id="category" onClick={() => setFilteredProducts(products)}>
              Reset
            </button>
          </div>
          <button className="close-btn" onClick={() => setShowFilter(false)}>
            Close
          </button>
        </div>
      )}

      {/* Details Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
              ❌
            </button>
            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              className="popup-image"
            />
            <div id="buydetails" style={{ background: 'white' }}>
              <h1 style={{ background: 'white' }}>{selectedCard.name}</h1>
              <h4 style={{ background: 'white' }}>
                Rating :{selectedCard.rating}
              </h4>
              <h3 style={{ background: 'white' }}>Brand: {selectedCard.brand}</h3>
              <p style={{ background: 'white' }}>{selectedCard.description}</p>
              <p style={{ background: 'white' }}>Price: ${selectedCard.price}</p>
              <button className="buyNow">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
