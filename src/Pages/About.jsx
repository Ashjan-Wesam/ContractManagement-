import aboutImg from "../assets/images/about_img.png";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>About Pcoint</h2>
              <span>
                d to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum gener
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="about_box ">
              <figure>
                <img src={aboutImg} alt="#" />
              </figure>
              <a className="read_more" href="#">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
