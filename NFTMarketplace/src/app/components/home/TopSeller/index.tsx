import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function TopSeller() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-5xl" data-aos="fade-right" data-aos-once>
          Top Seller
        </h2>
        <Link
         data-aos="fade-left" data-aos-once
          href={"/"}
          className="flex gap-2 items-center hover:text-pink-500 transition">
          View All <FaArrowRight />
        </Link>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-5 flex-wrap max-md:flex-col items-center">
          <div className="px-7 py-5 flex gap-2 items-center rounded-sm bg-gradient-to-r from-indigo-500/80 to-pink-500/80 w-full max-w-sm">
            <Image
              src={"/images/fakeUser2.png"}
              alt="fakeUser"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-1">
              <span className="text-2xl">Samantha Hayes</span>
              <span className="text-white/80">350 artworks</span>
            </div>
          </div>
          <div className="px-7 py-5 flex gap-2 items-center rounded-sm bg-gradient-to-r from-indigo-500/80 to-pink-500/80 w-full max-w-sm">
            <Image
              src={"/images/fakeUser1.png"}
              alt="fakeUser"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-1">
              <span className="text-2xl">Liam Johnson</span>
              <span className="text-white/80">420 artworks</span>
            </div>
          </div>
          <div className="px-7 py-5 flex gap-2 items-center rounded-sm bg-gradient-to-r from-indigo-500/80 to-pink-500/80 w-full max-w-sm">
            <Image
              src={"/images/fakeUser3.png"}
              alt="fakeUser"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-1">
              <span className="text-2xl">Olivia Carter</span>
              <span className="text-white/80">280 artworks</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5 md:ml-5 flex-wrap max-md:flex-col items-center">
          <div className="px-7 py-5 flex gap-2 items-center rounded-sm bg-gradient-to-r from-indigo-500/80 to-pink-500/80 w-full max-w-sm">
            <Image
              src={"/images/fakeUser1.png"}
              alt="fakeUser"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-1">
              <span className="text-2xl">Ethan Smith</span>
              <span className="text-white/80">390 artworks</span>
            </div>
          </div>
          <div className="px-7 py-5 flex gap-2 items-center rounded-sm bg-gradient-to-r from-indigo-500/80 to-pink-500/80 w-full max-w-sm">
            <Image
              src={"/images/fakeUser3.png"}
              alt="fakeUser"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-1">
              <span className="text-2xl">Amelia Rose</span>
              <span className="text-white/80">450 artworks</span>
            </div>
          </div>
          <div className="px-7 py-5 flex gap-2 items-center rounded-sm bg-gradient-to-r from-indigo-500/80 to-pink-500/80 w-full max-w-sm">
            <Image
              src={"/images/fakeUser2.png"}
              alt="fakeUser"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-1">
              <span className="text-2xl">James Blake</span>
              <span className="text-white/80">320 artworks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
