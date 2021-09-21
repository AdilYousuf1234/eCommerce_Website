import React from "react";
import { Link } from "react-router-dom";

class ItemCard extends React.Component {
  render() {
    return (
      <div className="col-md-3 m-wthree" style={{ marginBottom: "2%" }}>
        <div className="col-m">
          <Link
            to="#"
            data-toggle="modal"
            data-target={this.props.targetModal}
            className="offer-img"
          >
            <img src={this.props.imageUrl} className="img-responsive" alt="" />
            {this.props.isOffer && (
              <div className="offer">
                <p>
                  <span>Offer</span>
                </p>
              </div>
            )}
          </Link>
          <div className="mid-1">
            <div className="women">
              <h6>
                <Link to="/product-details">{this.props.itemName}</Link>
                {this.props.itemWeight}
              </h6>
            </div>
            <div className="mid-2">
              <p>
                <label>${this.props.labelPrice}</label>
                <em className="item_price">${this.props.itemPrice}</em>
              </p>
              <div className="block">
                <div className="starbox small ghosting"> </div>
              </div>
              <div className="clearfix" />
            </div>
            <div className="add">
              <button
                className="btn btn-danger my-cart-btn my-cart-b"
                onClick={() =>
                  this.props.props.addToCart(
                    this.props.itemName.toLowerCase().replace(/ /g, "")
                  )
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;
