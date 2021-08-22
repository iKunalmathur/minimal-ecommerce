/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../Components/Layout";
import { useAuth } from "../../services/useAuth";

type Params = {
  params: {
    id: any;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const { id } = params;

  let item: any;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/items/${id}`
    );
    item = res.data;

    if (!item) {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      item,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/items`);

  const items = res.data;

  const paths = items.map((item: any) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface itemProps {
  item: any;
  setCartContext: Function;
}

export default function item({ item: i, setCartContext }: itemProps) {
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
      <div className="container mt-5 pt-5 h-100">
        <div className="w-75 mx-auto mt-5">
          <img className="w-100" src={i.image} alt="" />
        </div>
        <div>
          <p className="text-success fs-2">$ {i.price}</p>
          <h2>{i.title}</h2>
          <p className="text-muted">{i.description}</p>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => addItemToCart(i)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      ;
    </Layout>
  );
}
