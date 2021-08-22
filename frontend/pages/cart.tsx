/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../Components/Layout";
import { useAuth } from "../services/useAuth";
import { CartContext } from "./_app";

type Inputs = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
};

interface CartProps {
  setCartContext: Function;
  user: any;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let user: any = {};

  try {
    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/user`,
      {
        params: {
          token,
        },
      }
    );

    user = res2.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      user,
    },
  };
};

export default function cart({ setCartContext, user }: CartProps) {
  const cartItems = useContext(CartContext);
  const router = useRouter();
  const token = Cookies.get("token");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quntity, setQuntity] = useState<number>(cartItems.length);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Form Submit
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    // create order for each items

    let orders: Object[] = [];

    cartItems.forEach((i: any) => {
      orders.push({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPhone: formData.phone,
        userAddress: formData.address,
        itemTitle: i.title,
        itemPrice: i.price,
        itemId: i.id,
      });
    });

    let config: Object = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/orders`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: orders,
    };

    try {
      const res = await axios(config);
      if (res.data.status === "error") {
        alert(res.data.message);
        return;
      }
      // success
      alert(res.data.message);
      // set cart to empty
      setCartContext([]);
    } catch (error) {
      console.log(error);
    }
  };

  function removeCartItem(id: number) {
    const changedCart = cartItems.filter((item: any) => item.id !== id);
    setCartContext(changedCart);
    setQuntity(changedCart.length);
  }

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce((sum: number, i: any) => {
        return Math.round(sum + i.price);
      }, 0)
    );
  }, [cartItems, router, user]);

  return (
    <Layout>
      <div className="container">
        <main className="pt-5 mt-5">
          <div className="py-5 text-center">
            {/* <img className="d-block mx-auto mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
            <h2>Checkout form</h2>
            <p className="lead">Fill Your Details And Place Order</p>
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">{quntity}</span>
              </h4>
              <ul className="list-group mb-3">
                {cartItems &&
                  cartItems.map((i: any, index: number) => (
                    <li
                      className="list-group-item d-flex justify-content-between lh-sm"
                      key={index}
                    >
                      <div>
                        <h6 className="my-0">{i.title}</h6>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault;
                            removeCartItem(i.id);
                          }}
                          className="link-danger"
                        >
                          <small>Remove Item</small>
                        </a>
                      </div>
                      <span className="text-muted">${i.price}</span>
                    </li>
                  ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${totalPrice}</strong>
                </li>
              </ul>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form
                className="needs-validation was-validated"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                      readOnly
                      value={user.name}
                      {...register("name", { required: true })}
                    />
                    {errors.name?.type === "required" &&
                      "Please enter your name."}
                    <div className="invalid-feedback">
                      Please enter your name.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="+91 98XXXXXXXX"
                      required
                      value={user.phone}
                      {...register("phone", { required: true })}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid phone for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-muted"></span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      required
                      placeholder="you@example.com"
                      readOnly
                      value={user.email}
                      {...register("email", { required: true })}
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
                      value={user.address}
                      {...register("address", { required: true })}
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                    readOnly
                    checked={true}
                  />
                  <label className="form-check-label" htmlFor="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="save-info"
                    readOnly
                    checked={true}
                  />
                  <label className="form-check-label" htmlFor="save-info">
                    Cash On Delivery
                  </label>
                </div>

                <hr className="my-4" />

                <button
                  className={`w-100 btn btn-lg ${
                    orderPlaced ? "btn-success" : "btn-primary"
                  }`}
                  type="submit"
                  disabled={cartItems.length === 0 ? true : false}
                >
                  {orderPlaced ? "Order Placed ✔" : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
