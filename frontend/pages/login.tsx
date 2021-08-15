/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type FromInputs = {
  email: string;
  password: string;
};

interface LoginProps {
  setAuthContext: Function;
}

const JWT_SECRET = `${process.env.NEXT_PUBLIC_JWT_SECRET}`;

export default function login({ setAuthContext }: LoginProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Form Submit
  const formSubmit: SubmitHandler<FromInputs> = async (formData) => {
    await axios
      .post("/api/login", formData)
      .then((res) => {
        if (res.data.status === "error") {
          alert(res.data.message);
          return;
        }
        alert(res.data.message);
        localStorage.setItem("token", res.data.data);
        const token: any = localStorage.getItem("token");

        try {
          // verify user
          const user = verify(token, JWT_SECRET);
          // set Auth
          setAuthContext(user);
          router.push("/");
        } catch (error) {
          console.log("Catch Error : ", error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="text-center form-center" style={{ minHeight: "100vh" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-5 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            {/* <!-- <h5 className="modal-title">Modal title</h5> --> */}
            <h2 className="fw-bold mb-0">Login for Access</h2>
            <button
              type="button"
              className="btn-close disabled"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form className="" onSubmit={handleSubmit(formSubmit)}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-4"
                  id="floatingInput"
                  placeholder="name@example.com"
                  defaultValue="janedoe1@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <span className="text-left text-danger">
                    Please enter your email.
                  </span>
                )}
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-4"
                  id="floatingPassword"
                  placeholder="Password"
                  defaultValue="password01"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-left text-danger">
                    Please enter your password.
                  </span>
                )}
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
                type="submit"
              >
                Login
              </button>
              <small className="text-muted">
                By clicking Login, you agree to the terms of use.
              </small>
              <small className="text-muted d-block">
                {"Didn't have Account "}
                <Link href="/signup">
                  <a>Create New</a>
                </Link>
              </small>
              <hr className="my-4" />
              <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
              <button
                className="w-100 py-2 mb-2 btn btn-outline-dark rounded-4"
                type="submit"
              >
                <i className="fab fa-twitter" aria-hidden="true"></i> Login with
                Twitter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
