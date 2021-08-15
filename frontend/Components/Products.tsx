/* eslint-disable @next/next/no-img-element */
interface ProductsProps {
  products: Object[];
}
export default function Products({ products }: ProductsProps) {
  return (
    <div>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
          {products &&
            products.map((p: any, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm p-3">
                  <img
                    src={p.image ?? "/cover-3.jpg"}
                    alt=""
                    style={{ height: "250px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-text">{p.name}</h5>
                    <p className="card-text text-muted">{p.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <h4 className="text-success">${p.price}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
