import imgContact from "../assets/images/mane_img.jpg";
import React, { useRef } from "react";
import * as emailjs from "@emailjs/browser";
import Swal from "sweetalert2"; 

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_55lp8lt", "template_a2jnec4", form.current, {
        publicKey: "BRs0kbe3r9Y6oaM0A",
      })
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Message Sent Successfully!",
            confirmButtonColor: "#3085d6",
          });
          form.current.reset();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to send message. Please try again.",
            confirmButtonColor: "#d33",
          });
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div id="contact" className="request">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Request a Call Back</h2>
              <span>
                Need assistance? Our team is here to help! Request a call, and
                we’ll get back to you as soon as possible.
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="black_bg">
              <div className="row">
                <div className="col-md-7">
                  <form className="main_form" ref={form} onSubmit={sendEmail}>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          className="contactus"
                          placeholder="Name"
                          type="text"
                          name="user_name"
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="contactus"
                          placeholder="Phone Number"
                          type="text"
                          name="user_phone"
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="contactus"
                          placeholder="Email"
                          type="text"
                          name="user_email"
                        />
                      </div>
                      <div className="col-md-12">
                        <textarea
                          className="textarea"
                          placeholder="Message"
                          name="user_message"
                        ></textarea>
                      </div>
                      <div className="col-sm-12">
                        <button className="send_btn">Send</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-5">
                  <div className="mane_img">
                    <figure>
                      <img src={imgContact} alt="#" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
