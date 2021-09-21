import React from "react";
import { Link } from "react-router-dom";
import "./kitechen.css";
import { connect } from "react-redux";
import Sliderproduct from "../Carousel/sliderproduct";
import { addToCart } from "../../../../actions/productActions";
import ItemCard from "../ItemCard";
import { offerItems, essentialGrocery } from "../../../../properties";
const Kitchenitem = (props) => {
  return (
    <div className="content-top" style={{ marginTop: "5rem" }}>
      <div className="container ">
        <div className="spec ">
          <h3>Special Offers</h3>
          <div className="ser-t">
            <b />
            <span>
              <i />
            </span>
            <b className="line" />
          </div>
        </div>

        <div className="tab-pane active text-style" id="tab1">
          <div className=" con-w3l">
            {offerItems.map((product) => (
              <ItemCard
                props={props}
                targetModal={product.targetModal}
                imageUrl={product.imageUrl}
                itemName={product.name}
                itemWeight={product.itemWeight}
                labelPrice={product.labelPrice}
                itemPrice={product.price}
                isOffer={product.isOffer}
              />
            ))}
            <div className="clearfix" />
          </div>
        </div>

        {/*content*/}
        <div className="content-mid">
          <div className="container">
            <div className="col-md-4 m-w3ls">
              <div className="col-md1 ">
                <Link to="/">
                  <img
                    src="images/co1.jpg"
                    className="img-responsive img"
                    alt=""
                  />
                  <div className="big-sa">
                    <h6>New Collections</h6>
                    <h3>
                      Season<span>ing </span>
                    </h3>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority{" "}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-4 m-w3ls1">
              <div className="col-md ">
                <Link to="/">
                  <img
                    src="images/co.jpg"
                    className="img-responsive img"
                    alt=""
                  />
                  <div className="big-sale">
                    <div className="big-sale1">
                      <h3>
                        Big <span>Sale</span>
                      </h3>
                      <p>It is a long established fact that a reader </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-4 m-w3ls">
              <div className="col-md2 ">
                <Link to="/">
                  <img
                    src="images/co2.jpg"
                    className="img-responsive img1"
                    alt=""
                  />
                  <div className="big-sale2">
                    <h3>
                      Cooking <span>Oil</span>
                    </h3>
                    <p>It is a long established fact that a reader </p>
                  </div>
                </Link>
              </div>
              <div className="col-md3 ">
                <Link to="/">
                  <img
                    src="images/co3.jpg"
                    className="img-responsive img1"
                    alt=""
                  />
                  <div className="big-sale3">
                    <h3>
                      Vegeta<span>bles</span>
                    </h3>
                    <p>It is a long established fact that a reader </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        {/*content*/}

        {/*content*/}
        <div className="product">
          <div className="container">
            <div className="spec ">
              <h3>Essential Grocery</h3>
              <div className="ser-t">
                <b />
                <span>
                  <i />
                </span>
                <b className="line" />
              </div>
            </div>
            <div className=" con-w3l">
              {essentialGrocery.map((product) => (
                <ItemCard
                  props={props}
                  targetModal={product.targetModal}
                  imageUrl={product.imageUrl}
                  itemName={product.name}
                  itemWeight={product.itemWeight}
                  labelPrice={product.labelPrice}
                  itemPrice={product.price}
                  isOffer={product.isOffer}
                />
              ))}
              <div className="clearfix" />
            </div>
          </div>
        </div>

        {/* another slider  */}
        <div
          className="tab-pane active text-style"
          id="tab1"
          style={{ paddingBottom: "3rem" }}
        >
          <div className="spec ">
            <h3>Best Offers View</h3>
            <div className="ser-t">
              <b />
              <span>
                <i />
              </span>
              <b className="line" />
            </div>
          </div>
          <div className="slick-slider slick-initialized slider-bk" dir="ltr">
            <Sliderproduct state={props} />
            <div className="clearfix" />
          </div>
        </div>
        {/* End slider */}
      </div>
    </div>
  );
};

export default connect(null, { addToCart })(Kitchenitem);
