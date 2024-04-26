import { useState } from "react";
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

export default function Navbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "#home", label: "RÓLUNK" },
    { href: "#about-us", label: "SZOLGÁLTATÁSOK" },
    { href: "#products", label: "ÁRAINK" },
    { href: "#contact-us", label: "KAPCSOLAT" },
  ];
  return (
    <>
      <header className="sm:px-8 px-4 py-2 z-10 w-full ">
        <nav className="flex justify-between items-center max-container z-10">
          <a href="/" className="text-3xl font-bold">
            <img src={logo} alt="" />
          </a>
          <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-montserrat text-brown-500 font-thin leading-normal text-lg text-slate-gray"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        <button
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
                setIsMenuOpen(!isMenuOpen);
            }}
            tabIndex={0}
        >
            <FontAwesomeIcon className="fa-2x" icon={faBars} />
        </button>
        </nav>
      </header>
      {isMenuOpen && (
        <div>
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100 z-10">
            <button
                className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                }}
                tabIndex={0}
            >
                <FontAwesomeIcon className="fa-2x" icon={faClose} />
            </button>
            <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-montserrat leading-normal text-lg text-slate-gray"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}