import { useState } from "react";
import aboutImg from "../assets/images/about_img.png";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div id="about" className="about">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>About Pcoint</h2>
              <span>
                Ensure a seamless experience with our reliable and high-quality electronic rentals, tailored to meet your needs.
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className={`about_box ${showMore ? "expanded" : ""}`}>
              {!showMore ? (
                <figure>
                  <img src={aboutImg} alt="About" />
                </figure>
              ) : (
                <p className="white-text">
                 At Pcoint, we believe in providing access to the latest technology without the burden of ownership. Our mission is to bridge the gap between affordability and functionality by offering a wide range of high-quality electronic devices for rent. Whether you're a student needing a laptop for your studies, a business professional looking for a temporary work setup, or a gamer wanting to test the latest console, we have you covered.
                  <br />
                  Our rental service is designed to be seamless, ensuring that you can get the devices you need with minimal hassle. We offer flexible rental plans, allowing you to choose short-term or long-term options that best fit your needs. No need to worry about maintenance or upgrades—our team ensures that every device is in top condition before it reaches you. Plus, our customer support is available to assist you every step of the way.                  <br />
                  Technology is constantly evolving, and buying new devices can be expensive. With Pcoint, you get access to the latest models without the commitment of purchasing. Whether it’s laptops, tablets, gaming consoles, projectors, or accessories, our inventory is stocked with premium brands and the latest innovations.<br/>
                  In addition to rentals, we offer delivery and setup services, so you don’t have to worry about the logistics. Our goal is to make technology accessible, convenient, and stress-free. We also have a buyout option for those who fall in love with a device and decide to keep it.<bt />
                  By choosing Pcoint, you’re not just renting electronics—you’re investing in convenience, flexibility, and top-notch service. Let us help you stay ahead in the digital world without breaking the bank. Rent smarter, work better, play harder—only with Pcoint.
                                  </p>
              )}
              <button className="read_more" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .expanded .white-text {
            color: white;
          }
          .about_box {
            text-align: center;
          }
          .about_box img {
            max-width: 100%;
            height: auto;
          }
          .read_more {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            cursor: pointer;
            margin-top: 10px;
            border-radius: 5px;
          }
          .read_more:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default About;
