import React, { useRef } from "react";
import ShinyButton from "../ShinyButton";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = ({}) => {
  const nav = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      nav.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power4" }
    );
  }, []);
  return (
    <header
      ref={nav}
      className="h-16 flex items-center fixed top-0 left-0 right-0 z-[1000] backdrop-blur border-b-[1px] border-white/10"
    >
      <nav className="container mx-auto h-full flex items-center justify-between relative z-[20]">
        <span className="text-2xl font-bold text-white">
          <Image src={Logo} alt="logo" width={30} height={30} />
        </span>
        <div className="flex items-center gap-x-5">
          <a
            href="#about"
            className="text-white hover:text-zinc-200 transition"
          >
            About us
          </a>
          <Link href="/login">
            <ShinyButton className="py-2 px-4">Get Started</ShinyButton>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
