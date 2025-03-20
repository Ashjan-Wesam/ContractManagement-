import imgContact from "../assets/images/mane_img.jpg"

const Contact = () => {
  return (
    <div id="contact" className="request">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Request a Call back</h2>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor <br /> incididunt ut labore et dolore magna
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="black_bg">
              <div className="row">
                <div className="col-md-7">
                  <form className="main_form">
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          className="contactus"
                          placeholder="Nmae"
                          type="text"
                          name="Nmae"
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="contactus"
                          placeholder="Phone number"
                          type="text"
                          name="Phone number"
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="contactus"
                          placeholder="Email"
                          type="text"
                          name="Email"
                        />
                      </div>
                      <div className="col-md-12">
                        <textarea
                          className="textarea"
                          placeholder="Message"
                          type="text"
                          name="Message"
                        >
                          Message
                        </textarea>
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
