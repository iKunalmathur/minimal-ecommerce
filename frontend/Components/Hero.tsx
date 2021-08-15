/* eslint-disable @next/next/no-img-element */
export default function Hero() {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/cover-1.jpg"
            className="d-block w-100"
            alt=""
            style={{ maxHeight: "550px", objectFit: "cover" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Store Open</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/cover-2.jpg"
            className="d-block w-100"
            alt=""
            style={{ maxHeight: "550px", objectFit: "cover" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Sale</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/cover-3.jpg"
            className="d-block w-100"
            alt=""
            style={{ maxHeight: "550px", objectFit: "cover" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Full Fill Your Wish</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
