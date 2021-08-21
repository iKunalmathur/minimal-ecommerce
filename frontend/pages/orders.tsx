/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { GetServerSideProps } from "next";
import Layout from "../Components/Layout";

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

  let orders: any = [];

  try {
    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/orders`,
      {
        params: {
          token,
        },
      }
    );

    orders = res2.data;

    console.log(orders);

    if (orders.status === "error") {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.log(error);
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
        {orders.length ? (
          <div className="list-group">
            {orders.map((o: any, index: number) => (
              <div
                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                aria-current="true"
                key={index}
              >
                <img
                  src={o.item.image}
                  alt="twbs"
                  width="32"
                  height="32"
                  className="rounded-circle flex-shrink-0"
                  style={{ objectFit: "cover" }}
                />
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">{o.item.title}</h6>
                    <p className="mb-0 opacity-75">{o.item.description}</p>
                    <div className="d-flex gap-2">
                      <p className="fw-normal">
                        <span className="text-primary fw-bold">Order on:</span>{" "}
                        {o.createdAt}
                      </p>
                      <p className="fw-normal">
                        <span className="text-primary fw-bold">Price:</span> $
                        {o.itemPrice}/-
                      </p>
                      <p className="fw-normal">
                        <span className="text-primary fw-bold">
                          Payment Method:
                        </span>
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
        ) : (
          <div className="grid-center h-100 text-muted">
            <h1> No order found !! </h1>
          </div>
        )}
      </div>
    </Layout>
  );
}
