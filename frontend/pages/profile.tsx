import Link from "next/link";
import Layout from "../Components/Layout";

export default function profile() {
  return (
    <Layout>
      <div className="container vh-100">
        <main>
          <div className="py-5 text-left">
            {/* <img className="d-block mx-auto mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
            {/* <h2>View Or Update Your Profile</h2> */}
            {/* <p className="lead"></p> */}
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-first">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">John Doe</span>
                <div>
                  <Link href="/orders">
                    <a className="btn btn-primary btn-sm rounded-pill">
                      My order
                    </a>
                  </Link>
                </div>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Email</h6>
                    <small className="text-muted">you@example.com</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Phone no</h6>
                    <small className="text-muted">+91 98XXXXXXXX</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Address</h6>
                    <small className="text-muted">1234 Main St</small>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Update Profile</h4>
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your name.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="phone"
                      className="form-control"
                      id="phone"
                      placeholder="+91 98XXXXXXXX"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid phone for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
