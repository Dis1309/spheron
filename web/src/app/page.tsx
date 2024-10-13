"use client";

import Image from "next/image";
import HeroBgImage from "@/public/bg.svg";
import SparkleImage from "@/public/sparkle.svg";
import ShinyButton from "@/components/ShinyButton";
import Navbar from "@/components/Navbar";
import GridImage from "@/public/grid.svg";
import Lines from "@/public/lines.svg";
import Pattern from "@/public/pattern-2.svg";
import Mountain from "@/public/mountain.svg";
import One from "@/public/1.svg";
import Two from "@/public/2.svg";
import Three from "@/public/3.svg";
import Four from "@/public/4.svg";
import { FileText, GitBranch, Wallet, Database } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sparkleRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mintRef = useRef<HTMLDivElement>(null);
  const mergeRef = useRef<HTMLDivElement>(null);
  const moneyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const refs = [heading1Ref, heading2Ref, paragraphRef];

    gsap.fromTo(
      container.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power4" }
    );

    refs.forEach((ref, index) => {
      gsap.fromTo(
        ref.current,
        { y: "100%" },
        {
          y: 0,
          duration: 1.5,
          delay: 0.075 * index,
          ease: "power4.out",
        }
      );
    });

    gsap.fromTo(
      sparkleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 0.6, ease: "power4" }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power4" }
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
          pin: true,
        },
      })
      .fromTo(
        mergeRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, duration: 1, scale: 1, ease: "power4" }
      )
      .fromTo(
        mintRef.current,
        {
          scale: 0,
          x: 420,
          y: 270,
        },
        {
          scale: 1,
          x: 0,
          y: 0,
        }
      )
      .fromTo(
        moneyRef.current,
        {
          scale: 0,
          x: -420,
          y: -270,
        },
        {
          scale: 1,
          x: 0,
          y: 0,
        }
      );
  }, []);

  return (
    <>
      <div ref={container} className="relative min-h-screen w-full">
        <Navbar />
        <Image
          src={HeroBgImage}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute z-20 inset-0 flex items-center justify-center h-full w-full">
          <div className="flex flex-col items-center justify-center gap-y-5 relative">
            <Image
              src={SparkleImage}
              alt="Sparkle"
              width={80}
              height={80}
              ref={sparkleRef}
              className="-scale-x-100 absolute -top-3 -left-14"
            />
            <div className="">
              <div className="hero-heading leading-[1.4]">
                <h1 className="hero-text" ref={heading1Ref}>
                  Rewarding Collaborative
                </h1>
              </div>
              <div className="hero-heading">
                <h1 className="hero-text" ref={heading2Ref}>
                  Innovation with NFTs.
                </h1>
              </div>
            </div>
            <div className="overflow-hidden">
              <p
                ref={paragraphRef}
                className="text-white text-center text-lg max-w-screen-sm"
              >
                Transform your contributions into crypto by solving real-world
                problems, powered by blockchain and Move language.
              </p>
            </div>
            <Link href="/login">
              <ShinyButton ref={buttonRef}>Get Started</ShinyButton>
            </Link>
          </div>
        </div>
        <div className="h-[100px] bg-gradient-to-b from-transparent to-black absolute bottom-0 left-0 right-0" />
      </div>
      <div className="min-h-screen my-20" ref={aboutRef} id="about">
        <div className="w-full flex flex-col items-center relative min-h-screen">
          <div ref={mintRef} className="absolute top-28 left-48">
            <h2 className="text-black text-center text-[10.2rem] tracking-tight font-bold max-w-screen-lg leading-[1.1] font-secondary relative">
              <div className="bg-zinc-100 rounded-[2rem] absolute z-[-1] -top-10 -left-10 -right-10 -bottom-10" />
              Move
            </h2>
          </div>
          <div
            ref={mergeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <h2 className="text-black text-center text-[10.2rem] tracking-tight font-bold max-w-screen-lg font-secondary leading-[1.3] relative">
              <div className="bg-zinc-100 rounded-[2rem] absolute z-[-1] -top-8 -left-10 -right-10 -bottom-8 " />
              NFT!
            </h2>
          </div>
          <div ref={moneyRef} className="absolute bottom-20 right-24">
            <h2 className="text-black text-center text-[10.2rem] tracking-tight font-bold max-w-screen-lg leading-[1.3] font-secondary relative z-10">
              <div className="bg-zinc-100 rounded-[2rem] p-10 absolute z-[-1] -top-10 -left-10 -right-10 -bottom-10" />
              Aptos
            </h2>
          </div>
        </div>
        <div className="my-40 w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-x-6">
            <div className="p-5 w-[40%] h-[600px] border-[0.2px] border-white/40 overflow-hidden rounded-3xl flex flex-col items-start justify-between relative">
              <Image
                src={GridImage}
                alt="grid"
                fill
                className="object-cover -z-[1] brightness-105"
              />
              <Image
                src={One}
                alt="one"
                width={40}
                height={40}
                className="object-cover"
              />
              <div className="flex flex-col gap-y-3">
                <FileText className="h-7 w-7 text-white" />
                <h2 className="text-3xl font-secondary text-white">
                  Task NFTs
                </h2>
                <p className="text-white">
                  Project owners can submit their tasks with comprehensive
                  details, including specific requirements, payment amounts, and
                  deadlines. Each task is stored as a non-fungible token (NFT)
                  to ensure transparency and immutability.
                </p>
              </div>
            </div>
            <div className="w-[60%] flex flex-col h-[600px] gap-y-6">
              <div className="h-[300px] flex items-center gap-x-6">
                <div className="w-full h-[300px] border-[0.5px] border-white/40 overflow-hidden rounded-3xl p-5 flex flex-col items-start justify-between gap-y-3 relative">
                  <Image
                    src={Pattern}
                    alt="pattern"
                    fill
                    className="object-cover -z-[1] brightness-75"
                  />
                  <Image
                    src={Two}
                    alt="two"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <div className="flex flex-col gap-y-3">
                    <Database className="h-7 w-7 text-white" />
                    <h2 className="text-3xl font-secondary text-white">
                      Immutable Data
                    </h2>
                    <p className="text-white">
                      Projects and tasks are stored as NFTs, ensuring
                      transparent, immutable data that’s accessible to all
                      participants.
                    </p>
                  </div>
                </div>
                <div className="w-full h-[300px] border-[0.5px] border-white/40 overflow-hidden rounded-3xl p-5 flex flex-col items-start justify-between gap-y-3 relative">
                  <Image
                    src={Lines}
                    alt="lines"
                    fill
                    className="object-cover -z-[1] brightness-50"
                  />
                  <Image
                    src={Three}
                    alt="three"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <div className="flex flex-col gap-y-3">
                    <Wallet className="h-7 w-7 text-white" />
                    <h2 className="text-3xl font-secondary text-white">
                      MetaMask Payouts
                    </h2>
                    <p className="text-white max-w-xl">
                      Payments are distributed to contributors based on their
                      work. Funds are seamlessly transferred to MetaMask
                      wallets.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full h-[300px] border-[0.5px] border-white/40  overflow-hidden rounded-3xl p-5 flex flex-col items-start justify-between gap-y-3 relative">
                <Image
                  src={Mountain}
                  alt="mountain"
                  fill
                  className="object-cover -z-[1] brightness-75"
                />
                <Image
                  src={Four}
                  alt="four"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <div className="flex flex-col gap-y-3">
                  <GitBranch className="h-7 w-7 text-white" />
                  <h2 className="text-3xl font-secondary text-white">
                    GitHub Sync
                  </h2>
                  <p className="text-white max-w-xl">
                    Contributors resolve issues and submit code directly via
                    GitHub. Seamless integration ensures smooth collaboration
                    and code merging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
