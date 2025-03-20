const Testimonial = () => {
  return (
    <div className="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Testimonial</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div id="myCarousel" className="carousel slide testimonial_Carousel" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="carousel-caption">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="test_box">
                            <h3>Michl ro</h3>
                            <p>
                              <i className="padd_rightt0">
                                <img src="images/te1.png" alt="#" />
                              </i>
                              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
                              <i className="padd_leftt0">
                                <img src="images/te2.png" alt="#" />
                              </i>
                              <br />
                              form, by injected humour, or randomised words which dont look even slightly believable
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="carousel-caption">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="test_box">
                            <h3>Michl ro</h3>
                            <p>
                              <i className="padd_rightt0">
                                <img src="images/te1.png" alt="#" />
                              </i>
                              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
                              <i className="padd_leftt0">
                                <img src="images/te2.png" alt="#" />
                              </i>
                              <br />
                              form, by injected humour, or randomised words which dont look even slightly believable
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="carousel-caption">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="test_box">
                            <h3>Michl ro</h3>
                            <p>
                              <i className="padd_rightt0">
                                <img src="images/te1.png" alt="#" />
                              </i>
                              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
                              <i className="padd_leftt0">
                                <img src="images/te2.png" alt="#" />
                              </i>
                              <br />
                              form, by injected humour, or randomised words which dont look even slightly believable
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
