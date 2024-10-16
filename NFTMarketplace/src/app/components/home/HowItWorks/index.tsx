import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <section className="flex justify-between flex-wrap max-md:flex-col items-center">
      <div className="md:w-2/5 flex flex-col gap-5 items-start justify-center max-md:text-center max-md:items-center mb-5">
        <h2 className="text-5xl" data-aos="fade-right" data-aos-once>
          How it Works
        </h2>
        <p className="text-white/50" data-aos="fade-right" data-aos-delay="120" data-aos-once>
          Start trading and selling digital projects as NFTs on our marketplace.
          Our platform makes it easy to set up, buy, and sell NFTs, giving you a secure and transparent way to manage digital assets.
        </p>
        <Link href="/nfts">
          <button className="px-7 py-2 rounded-sm bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-80">
            Learn More
          </button>
        </Link>
      </div>
      <div className="md:w-3/5 flex flex-col gap-5" data-aos="fade-left" data-aos-once>
        <div className="flex gap-5 max-md:flex-col items-center">
          <div className="rounded-sm p-px bg-gradient-to-r from-indigo-500 via-pink-500">
            <div className="bg-[#110229] rounded-[calc(0.125rem-1px)] p-5 hover:bg-opacity-80 flex flex-col gap-5">
              <span className="rounded grid place-items-center p-4 bg-white/10 w-16">
                <Image
                  src={"/images/icon1.png"}
                  alt="icon1"
                  width={200}
                  height={200}
                  quality={100}
                />
              </span>
              <Link href="/nfts/sell">
                <button className="text-2xl text-white px-7 py-2 rounded-sm bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-80">
                  Set up Your Wallet
                </button>
              </Link>
              <p className="text-white/70">
                Connect your digital wallet to our platform to start trading and managing your NFT projects seamlessly.
              </p>
            </div>
          </div>
          <div className="rounded-sm p-px bg-gradient-to-r from-indigo-500 via-pink-500">
            <div className="bg-[#110229] rounded-[calc(0.125rem-1px)] p-5 hover:bg-opacity-80 flex flex-col gap-5">
              <span className="rounded grid place-items-center p-4 bg-white/10 w-16">
                <Image
                  src={"/images/icon2.png"}
                  alt="icon2"
                  width={200}
                  height={200}
                  quality={100}
                />
              </span>
              <Link href="/nfts">
                <button className="text-2xl text-white px-7 py-2 rounded-sm bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-80">
                  Buy Your Collection
                </button>
              </Link>
              <p className="text-white/70">
                Explore and purchase exclusive NFT projects from our collection. Find the perfect digital assets to add to your portfolio.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 max-md:flex-col items-center">
          <div className="rounded-sm p-px bg-gradient-to-r from-indigo-500 via-pink-500">
            <div className="bg-[#110229] rounded-[calc(0.125rem-1px)] p-5 hover:bg-opacity-80 flex flex-col gap-5">
              <span className="rounded grid place-items-center p-4 bg-white/10 w-16">
                <Image
                  src={"/images/icon3.png"}
                  alt="icon3"
                  width={200}
                  height={200}
                  quality={100}
                />
              </span>
              <Link href="/nfts/sell">
                <button className="text-2xl text-white px-7 py-2 rounded-sm bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-80">
                  Sell Your NFTs
                </button>
              </Link>
              <p className="text-white/70">
                List your projects as NFTs and start earning by selling your digital assets to a global audience.
              </p>
            </div>
          </div>
          <div className="rounded-sm p-px bg-gradient-to-r from-indigo-500 via-pink-500">
            <div className="bg-[#110229] rounded-[calc(0.125rem-1px)] p-5 hover:bg-opacity-80 flex flex-col gap-5">
              <span className="rounded grid place-items-center p-4 bg-white/10 w-16">
                <Image
                  src={"/images/icon4.png"}
                  alt="icon4"
                  width={200}
                  height={200}
                  quality={100}
                />
              </span>
              <Link href="/nfts/sell">
                <button className="text-2xl text-white px-7 py-2 rounded-sm bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-80">
                  Add Your NFTs
                </button>
              </Link>
              <p className="text-white/70">
                Upload and mint your projects into NFTs, making them available for trade and sale in our marketplace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
