import laptop from "../assets/images/leptop.jpg"
const TwoBox = () => {
  return (
    <div className="two_box">
      <div className="container-fluid">
        <div className="row d_flex">
          <div className="col-md-6">
            <div className="two_box_img">
              <figure><img src={laptop} alt="#" /></figure>
            </div>
          </div>
          <div className="col-md-6">
            <div className="two_box_img">
              <h2><span className="offer">15% </span>Offer everyday</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority
                have suffered alteration in some form, by injected humour, or randomised words
                which dont look even slightly believable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoBox;
