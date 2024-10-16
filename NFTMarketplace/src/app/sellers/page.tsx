import React from "react";
import SellerCard from "../../components/SellerCard";  // Import SellerCard

// Sellers Page Component
export default function SellersPage() {
  const sellers = [
    { name: "Samantha Hayes", imageSrc: "/images/fakeUser2.png", artworks: "350 artworks" },
    { name: "Liam Johnson", imageSrc: "/images/fakeUser1.png", artworks: "420 artworks" },
    { name: "Olivia Carter", imageSrc: "/images/fakeUser3.png", artworks: "280 artworks" },
    { name: "Ethan Smith", imageSrc: "/images/fakeUser1.png", artworks: "390 artworks" },
    { name: "Amelia Rose", imageSrc: "/images/fakeUser3.png", artworks: "450 artworks" },
    { name: "James Blake", imageSrc: "/images/fakeUser2.png", artworks: "320 artworks" },
    { name: "Noah Anderson", imageSrc: "/images/fakeUser1.png", artworks: "370 artworks" },
    { name: "Mia Brooks", imageSrc: "/images/fakeUser3.png", artworks: "410 artworks" },
    { name: "Charlotte Lee", imageSrc: "/images/fakeUser2.png", artworks: "290 artworks" },
    { name: "Elijah Turner", imageSrc: "/images/fakeUser1.png", artworks: "380 artworks" },
    { name: "Sophia White", imageSrc: "/images/fakeUser3.png", artworks: "360 artworks" },
    { name: "Benjamin Scott", imageSrc: "/images/fakeUser2.png", artworks: "340 artworks" },
    { name: "Isabella Green", imageSrc: "/images/fakeUser1.png", artworks: "300 artworks" },
    { name: "Lucas Wright", imageSrc: "/images/fakeUser3.png", artworks: "330 artworks" },
    { name: "Harper Adams", imageSrc: "/images/fakeUser2.png", artworks: "310 artworks" },
  ];

  return (
    <section className="flex flex-col gap-5 p-10">
      <h1 className="text-5xl mb-8">All Sellers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller, index) => (
          <SellerCard
            key={index}
            name={seller.name}
            imageSrc={seller.imageSrc}
            artworksCount={seller.artworks}
          />
        ))}
      </div>
    </section>
  );
}
