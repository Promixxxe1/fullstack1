import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="text-gray-600 w-full md:w-2/3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
            cupiditate ut quam, modi sapiente, vel ipsam ea atque sed, sequi
            magni esse distinctio delectus labore repellat repellendus fugit
            reprehenderit incidunt.
          </p>
        </div>

        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="">
          <p className="uppercase text-xl font-medium mb-5">Get in touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+234-904-609-2530</li>
            <li>iheanachopromise068@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="">
        <hr />
        <p className="text-sm py-5 text-center">
          Copyright 2026 @forever.com. All Right Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;