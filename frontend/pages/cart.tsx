/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../Components/Layout";
import { server } from "../config";
import { postData } from "../services/handleApi";
import { AuthContext, CartContext } from "./_app";

type Inputs = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
};

interface CartProps {
  setCartContext: Function;
}

export default function cart({ setCartContext }: CartProps) {
  const auth = useContext(AuthContext);
  const cartItems = useContext(CartContext);
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quntity, setQuntity] = useState<number>(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Form Submit
  const onSubmit: SubmitHandler<Inputs> = async (customer) => {
    customer.id = 19;

    // create order for each items

    let orders: Object[] = [];

    cartItems.forEach((i: any) => {
      orders.push({
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        itemName: i.name,
        itemPrice: i.price,
        itemId: i.id,
      });
    });

    console.log("Orders : ", orders);
  };

  function removeCartItem(id: number) {
    setCartContext(cartItems.filter((item: any) => item.id !== id));
  }

  useEffect(() => {
    if (!auth) {
      router.push("/login");
      return;
    }

    setTotalPrice(
      cartItems.reduce((sum: number, i: any) => {
        return Math.round(sum + i.price);
      }, 0)
    );
  }, [cartItems, auth, router]);

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
                        <h6 className="my-0">{i.name}</h6>
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
                      defaultValue={"John Doe"}
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
                      defaultValue={"+91 9876543210"}
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
                      defaultValue={"johndoe@example.com"}
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
                      defaultValue={"1234 Main test St"}
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
