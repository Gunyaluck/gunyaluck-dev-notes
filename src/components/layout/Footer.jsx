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
