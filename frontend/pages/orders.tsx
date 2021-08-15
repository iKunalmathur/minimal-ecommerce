/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { GetStaticProps } from "next";
import Layout from "../Components/Layout";
import { server } from "../config";

export const getStaticProps: GetStaticProps = async (context) => {
  const orders: Object[] = [];

  if (!orders) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      orders,
    },
  };
};

interface OrdersProps {
  orders: any;
}

export default function orders({ orders }: OrdersProps) {
  return (
    <Layout>
      <br />
      <div className="container vh-100 pt-5 mt-5">
        <div className="list-group">
          {orders &&
            orders.map((o: any, index: number) => (
              <div
                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                aria-current="true"
                key={index}
              >
                <img
                  src="https://github.com/twbs.png"
                  alt="twbs"
                  width="32"
                  height="32"
                  className="rounded-circle flex-shrink-0"
                />
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">{o.product.name}</h6>
                    <p className="mb-0 opacity-75">{o.product.description}</p>
                    <div className="d-flex gap-2">
                      <p className="fw-normal">
                        <span className="text-primary fw-bold">Order on:</span>{" "}
                        {o.createdAt}
                      </p>
                      <p className="fw-normal">
                        <span className="text-primary fw-bold">Price:</span> $
                        {o.price}/-
                      </p>
                      <p className="fw-normal">
                        <span className="text-primary fw-bold">
                          Payment Method:
                        </span>{" "}
                        POD
                      </p>
                    </div>
                  </div>
                  <small className="opacity-50 text-nowrap">
                    Status: {o.deliverd ? "Deliverd ✔" : "Processing 📦"}
                  </small>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
