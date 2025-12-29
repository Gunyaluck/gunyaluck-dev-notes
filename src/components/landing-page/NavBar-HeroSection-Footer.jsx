/* NavBar*/
import logo from "../../assets/logo/logo.svg";

export function NavBar() {
  return (
    <nav className="w-full h-[48px] bg-brown-100 border-b border-brown-300 flex items-center justify-between lg:h-[80px] lg:flex lg:items-center">
      <div className="w-full bg-brown-100 rounded-lg px-6 flex items-center justify-between lg:h-[80px] lg:px-30 lg:py-4">
        {/* Logo Section */}
        <div className="w-[24px] h-[24px] flex items-center gap-1 lg:w-[44px] lg:h-[44px]">
          <img src={logo} alt="Logo" className="w-full h-full" />
        </div>

        {/* Hamburger Menu */}
        <button
          className="w-[18px] h-[12px] flex flex-col items-center justify-between cursor-pointer lg:hidden"
          aria-label="Open menu"
        >
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
        </button>

        {/* login and signup Buttons */}
        <div className="hidden lg:w-[276px] lg:h-[48px] lg:flex items-center gap-2">
          <button className="w-[127px] h-[48px] px-6 py-3 border border-brown-400 rounded-[999px] body-1-brown-600 hover:bg-brown-600 transition-colors hover:text-white cursor-pointer">
            Log in
          </button>
          <button className="w-[141px] h-[48px] px-10 py-3 bg-brown-600 rounded-[999px] body-1-white hover:bg-brown-200 transition-colors hover:text-brown-600 cursor-pointer">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

/* HeroSection */
function HeroTitle() {
  return (
    <div className="w-full h-[184px] text-center flex flex-col items-center justify-center gap-4 lg:w-[347px] lg:h-[276px] lg:text-right lg:items-end">
      <h1 className="text-headline-2">
        Stay <br className="hidden lg:block" /> Informed,
        <br className="hidden lg:block" /> Stay Inspired
      </h1>
      <p className="body-1">
        Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
        Inspiration and Information.
      </p>
    </div>
  );
}

import heroImage from "../../assets/images/herosection-pic.jpg";  

function HeroImage() {
  return (
    <div className="w-full h-[470px] flex justify-center items-center lg:w-[386px] lg:h-[529px]">
      <div className="w-[343px] h-[470px] lg:w-[386px] lg:h-[529px]">
        <img
          src={heroImage}
          alt="Author with cat in autumn forest"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function AuthorCard() {
  return (
    <div className="w-full h-[284px] flex justify-center items-center">
      <div className="w-[347px] h-[284px] flex flex-col justify-center items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <p className="body-3">-Author</p>
          <h2 className="text-headline-3">Thompson P.</h2>
        </div>
        <div className="w-full">
          <p className="body-1">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
            <br />
            <br />
            When I'm not writing, I spend time volunteering at my local animal
            shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="w-full h-[1098px] py-10 px-4 flex flex-col items-center justify-center lg:w-[1200px] lg:h-[529px] lg:mx-30 lg:my-15 lg:px-0 lg:py-0">
      {/* Mobile View */}
      <div className="flex flex-col gap-10 lg:hidden">
        <HeroTitle />
        <HeroImage />
        <AuthorCard />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:w-[1200px] lg:h-[529px] lg:grid lg:grid-cols-3 lg:flex-row lg:items-center">
        <HeroTitle />
        <div className="flex flex-row gap-15 items-center">
          <HeroImage />
          <AuthorCard />
        </div>
      </div>
    </section>
  );
}

/* Footer */
import { Linkedin, Github, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full h-[152px] bg-brown-200 lg:h-[144px]">
      <div className="w-full h-[48px] px-4 py-10 flex flex-col items-center justify-around gap-6 lg:h-[80px] lg:px-30 lg:py-15 lg:flex-row lg:justify-between lg:items-center">
        {/* Left Section - Get in touch & Social Icons */}
        <div className="w-[226px] h-[24px] flex items-center gap-6">
          <p className="body-1-brown-500">Get in touch</p>
          <div className="flex items-center gap-3">
            {/* LinkedIn Icon*/}
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-brown-500 flex items-center justify-center hover:bg-brown-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            {/* GitHub Icon */}
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-brown-500 flex items-center justify-center hover:bg-brown-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-white" />
            </a>
            {/* Google Icon */}
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-brown-500 flex items-center justify-center hover:bg-brown-500 transition-colors"
              aria-label="Google"
            >
              <Globe className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Right Section - Home page link */}
        <a
          href="#"
          className="body-1-brown-600 underline hover:text-brown-500 transition-colors"
        >
          Home page
        </a>
      </div>
    </footer>
  );
}
