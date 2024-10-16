import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import SellerCard from "./SellerCard";  // Importing reusable SellerCard component

export default function TopSeller() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-5xl" data-aos="fade-right" data-aos-once>
          Top Seller
        </h2>
        <Link
          data-aos="fade-left" data-aos-once
          href="/sellers" // Correct path for app folder structure
          className="flex gap-2 items-center hover:text-pink-500 transition"
        >
          View All <FaArrowRight />
        </Link>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-5 flex-wrap max-md:flex-col items-center">
          {/* Sample Top Sellers */}
          <SellerCard
            imageSrc="/images/fakeUser2.png"
            name="Samantha Hayes"
            artworksCount="350 artworks"
          />
          <SellerCard
            imageSrc="/images/fakeUser1.png"
            name="Liam Johnson"
            artworksCount="420 artworks"
          />
          <SellerCard
            imageSrc="/images/fakeUser3.png"
            name="Olivia Carter"
            artworksCount="280 artworks"
          />
        </div>
        <div className="flex gap-5 md:ml-5 flex-wrap max-md:flex-col items-center">
          {/* Additional Top Sellers */}
          <SellerCard
            imageSrc="/images/fakeUser1.png"
            name="Ethan Smith"
            artworksCount="390 artworks"
          />
          <SellerCard
            imageSrc="/images/fakeUser3.png"
            name="Amelia Rose"
            artworksCount="450 artworks"
          />
          <SellerCard
            imageSrc="/images/fakeUser2.png"
            name="James Blake"
            artworksCount="320 artworks"
          />
        </div>
      </div>
    </section>
  );
}
