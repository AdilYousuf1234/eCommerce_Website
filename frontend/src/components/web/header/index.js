import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Mobileheader from "../header/mobile-header";
import { connect } from "react-redux";
import { getCartNumbers } from "../../../actions/productActions";
import SearchAppBar from "./SearchAppBar";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  render() {
    const { width } = this.state;
    const isMobile = width <= 800;
    if (isMobile) {
      return (
        <div>
          <Mobileheader />
        </div>
      );
    } else {
      return (
        <div>
          {/* <Link to="#"><img src="images/download.png" className="img-head" alt="download" /></Link> */}
          {/* <SearchAppBar /> */}
          <Grid container className="header_info">
            <SearchAppBar props={this.props} />
          </Grid>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  cartProps: state.cartState,
});

export default connect(mapStateToProps, { getCartNumbers })(Header);
