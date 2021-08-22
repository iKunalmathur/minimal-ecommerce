/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../Components/Layout";
import UserContext from "../context/UserContext";
import { useAuth } from "../services/useAuth";

export const getStaticProps: GetStaticProps = async (context) => {
  let items: Object[] = [];

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/items`);
    items = res.data;
    if (!items) {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      items,
    },
  };
};

interface HomeProps {
  items: Object[];
  setCartContext: Function;
}

export default function Home({ items, setCartContext }: HomeProps) {
  const { user } = useAuth();
  function addItemToCart(item: object) {
    if (!user) {
      alert("You must login before adding item to cart.");
      return;
    }
    setCartContext((items: any) => [...items, item]);
    console.log("Item added to cart");
  }

  return (
    <Layout>
      <br />
      <br />
      <div className="container mt-5 pt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
          {items.length &&
            items.map((i: any, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm p-3">
                  <img
                    src={i.image ?? "/cover-3.jpg"}
                    alt=""
                    style={{ height: "250px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-text">{i.title}</h5>
                    <p className="card-text text-muted">{i.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link href={`/items/${encodeURIComponent(i.id)}`}>
                          <a className="btn btn-sm btn-primary">View Product</a>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => addItemToCart(i)}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <h4 className="text-success">${i.price}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
