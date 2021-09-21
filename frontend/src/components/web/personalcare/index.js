import React, { Component } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../home/ItemCard";
import { personalCareItems } from "../../../properties";
import { connect } from "react-redux";
import { addToCart } from "../../../../src/actions/productActions";
const Care = (props) => {
  return (
    <div>
      {/**/}
      {/* Carousel
      ================================================== */}
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to={0} className="active" />
          <li data-target="#myCarousel" data-slide-to={1} />
          <li data-target="#myCarousel" data-slide-to={2} />
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <Link href="/">
              <img
                className="first-slide"
                src="images/ba1.jpg"
                alt="First slide"
              />
            </Link>
          </div>
          <div className="item">
            <Link href="/">
              <img
                className="second-slide "
                src="images/ba.jpg"
                alt="Second slide"
              />
            </Link>
          </div>
          <div className="item">
            <Link href="/">
              <img
                className="third-slide "
                src="images/ba2.jpg"
                alt="Third slide"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* /.carousel */}
      {/*content*/}
      <div className="kic-top ">
        <div className="container ">
          <div className="kic ">
            <h3>Popular Categories</h3>
          </div>
          <div className="col-md-4 kic-top1">
            <Link href="/">
              <img src="images/ki3.jpg" className="img-responsive" alt="" />
            </Link>
            <h6>Natural Cream</h6>
            <p>Nam libero tempore</p>
          </div>
          <div className="col-md-4 kic-top1">
            <Link href="/">
              <img src="images/ki4.jpg" className="img-responsive" alt="" />
            </Link>
            <h6>Shaving Kit</h6>
            <p>Nam libero tempore</p>
          </div>
          <div className="col-md-4 kic-top1">
            <Link href="/">
              <img src="images/ki5.jpg" className="img-responsive" alt="" />
            </Link>
            <h6>Makeup Kit</h6>
            <p>Nam libero tempore</p>
          </div>
        </div>
      </div>
      {/*content*/}
      <div className="product">
        <div className="container">
          <div className="spec ">
            <h3>Products</h3>
            <div className="ser-t">
              <b />
              <span>
                <i />
              </span>
              <b className="line" />
            </div>
          </div>
          <div className=" con-w3l agileinf">
            {personalCareItems.map((product) => (
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
    </div>
  );
};

export default connect(null, { addToCart })(Care);
