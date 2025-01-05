"use client"
import { useEffect, useState } from 'react';
import HeroSection from './HomeComponents/hero';
import Products from './HomeComponents/TopProduct';
import { client } from '../sanity/lib/client';
import { Product } from './product';
import "react-toastify/dist/ReactToastify.css";
import CartIcon from '../app/Carticon/page'; // Import CartIcon
import { ToastContainer } from 'react-toastify';
import VipSection from './BelowTopproducts/page';
import MeetOurTeam from './HomeComponents/Meetourteam';
import CategorySection from './HomeComponents/Category';
import CustomerReviews from './HomeComponents/Review';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == 'product'] | order(_createdAt desc) { _id, name, description, price, image, rating }`;
      const fetchedProducts = await client.fetch(query);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
            <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HeroSection />
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product: Product) => (
          <Products key={product._id} product={product}/> 
        ))}
      </div>

      {/* Cart Icon */}
      <CartIcon />
      <VipSection/>
      <MeetOurTeam/>
      <CategorySection/>
      <CustomerReviews/>
    </div>
  );
}
