/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignupProps {
  setAuth: Function;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { token } = req.cookies;

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function signup({ setAuth }: SignupProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  type FormInputs = {
    name: string;
    email: string;
    phone: string;
    password: string;
  };

  const formSubmit: SubmitHandler<FormInputs> = async (formData) => {
    type ResData = {
      status: string;
      message: string;
      data: any;
    };

    await axios
      .post("/api/signup", formData)
      .then((res) => {
        if (res.data.status === "error") {
          alert(res.data.message);
          return;
        }
        alert(res.data.message);
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={handleSubmit(formSubmit)}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            defaultValue="Jane doe"
                            {...register("name", {
                              required: true,
                            })}
                          />
                          {errors.name?.type === "required" && (
                            <span className="text-left text-danger">
                              Please enter your full name.
                            </span>
                          )}
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your Full Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            defaultValue="janedoe01@example.com"
                            {...register("email", {
                              required: true,
                            })}
                          />
                          {errors.email?.type === "required" && (
                            <span className="text-left text-danger">
                              Please enter your email address.
                            </span>
                          )}
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-mobile fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example4cd"
                            className="form-control"
                            defaultValue="+91 9874563210"
                            {...register("phone", {
                              required: true,
                            })}
                          />
                          {errors.phone?.type === "required" && (
                            <span className="text-left text-danger">
                              Please enter your phone number.
                            </span>
                          )}
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Your Phone Number
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            defaultValue="password01"
                            {...register("password", {
                              required: true,
                            })}
                          />
                          {errors.password?.type === "required" && (
                            <span className="text-left text-danger">
                              Enter a strong password.
                            </span>
                          )}
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Strong Password
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Sign up
                        </button>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <small>
                          {"Alreaedy have An Account? "}
                          <Link href="/login">
                            <a>Login</a>
                          </Link>
                        </small>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="/signup-art.png"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
