/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import logout from "../pages/logout";
import { CartContext } from "../pages/_app";
import { useAuth } from "../services/useAuth";

interface HeaderProps {
  setAuthContext?: Function;
}

export default function Header({}: HeaderProps) {
  const cartItemCount = useContext(CartContext).length;
  const { user: auth, logout } = useAuth();

  return (
    <>
      <Head>
        <title>Mini E-com</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm"
          // style={{ backgroundColor: "#15202b" }}
        >
          <div className="container" style={{ paddingBlock: "1em" }}>
            <Link href="/">
              <a className="navbar-brand fw-bold fs-3">
                <img
                  src="/favicon.png"
                  alt=""
                  width="36"
                  height="36"
                  className="d-inline-block align-text-top"
                />
                {" Mini E-com "}
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <Link href="/">
                    <a className="nav-link active" aria-current="page">
                      Home
                    </a>
                  </Link>
                </li> */}
              </ul>
              <div className="d-flex gap-2">
                {auth ? (
                  <>
                    <div className="dropdown">
                      <a
                        className="btn btn-outline-dark dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth.name}
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-light dropdown-menu-macos mx-0 border-0 shadow"
                        style={{ width: "220px" }}
                      >
                        <li>
                          <a className="dropdown-item active" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <Link href="/profile">
                            <a className="dropdown-item">Profile 👤</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/orders">
                            <a className="dropdown-item">Your Orders 🚚</a>
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => logout()}
                          >
                            Logout 🔥
                          </button>
                        </li>
                        {/* <li>
                          <Link href="/logout">
                            <a className="dropdown-item">Logout 🔥</a>
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                    <Link href="/cart">
                      <a className="btn btn-primary">🛒{cartItemCount}</a>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <a className="btn btn-outline-primary">Login</a>
                    </Link>
                    <Link href="/signup">
                      <a className="btn btn-primary">Sign up</a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
