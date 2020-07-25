import React, { Suspense, lazy } from 'react';
import "../maincss.css";
import { Route, Switch } from "react-router-dom";
import PersistentDrawerLeft from "./appbar";
const LandingPage = lazy(() => import("./landingPage"));
const FooterComponent = lazy(() => import("./footer"));
const Productdetails = lazy(() => import("./productdetails"));
const CartDetails = lazy(() => import("./cart/cartDetails"));
const Payment = lazy(() => import("./cart/payment"));
const Orders = lazy(() => import("./cart/orders"));
const Addcomment = lazy(() => import("./cart/addcomment"));
const ProductReviews = lazy(() => import("./productReviews"));
const Polist = lazy(() => import("./backend/polist"));
const DetailsofPO = lazy(() => import("./backend/detailofPo"));
const Search = lazy(() => import("./folder1/Search"));
const ProfileDetails = lazy(() => import("./backend/profileDetails"));
const About = lazy(() => import("./folder1/about"));
const ProductMobile = lazy(() => import("./productMobile"));

function Routing() {
  return (
    <React.Fragment>
      <PersistentDrawerLeft />
      <Suspense fallback={<div style={{ margin: 20 }}>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/productDetails/:productid"
            component={Productdetails}
          />
          <Route exact path="/CartDetails" component={CartDetails} />
          <Route exact path="/Payment" component={Payment} />
          <Route exact path="/Orders" component={Orders} />
          <Route exact path="/Addcomment:id" component={Addcomment} />
          <Route exact path="/ProductReviews:id" component={ProductReviews} />
          <Route exact path="/Polist" component={Polist} />
          <Route exact path="/DetailsofPO:id" component={DetailsofPO} />
          <Route exact path="/Search:id" component={Search} />
          <Route exact path="/ProfileDetails:id" component={ProfileDetails} />
          <Route exact path="/About" component={About} />
          <Route exact path="/ProductsFilter:brand" component={ProductMobile} />
        </Switch>
        <FooterComponent />
      </Suspense>
    </React.Fragment>
  );
}

export default Routing;
