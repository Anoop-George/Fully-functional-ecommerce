import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

function TabPanel() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ marginTop: 0, backgroundColor: "#233454" }}
    >
      <Grid item xs={3} sm={3}>
        <div className="dropdown">
          <button className="dropbtn">Shirt</button>
          <div className="dropdown-content">
            <Link to="/ProductsFilter:Belt">Belt</Link>
            <Link to="/ProductsFilter:Shirt">Shirt</Link>
          </div>
        </div>
      </Grid>
      <Grid item xs={3} sm={3}>
        <div className="dropdown">
          <button className="dropbtn">Watch</button>
          <div className="dropdown-content">
            <Link to="/ProductsFilter:Watch">Watch</Link>
            <Link to="/ProductsFilter:bag">Bag</Link>
          </div>
        </div>
      </Grid>
      <Grid item xs={3} sm={3}>
        <div className="dropdown">
          <button className="dropbtn">Shoe</button>
          <div className="dropdown-content">
            <Link to="/ProductsFilter:Shoe">Shoe</Link>
            <Link to="/ProductsFilter:Ladies Shoe">Ladies Shoe</Link>
          </div>
        </div>
      </Grid>
      <Grid item xs={3} sm={3}>
        <div className="dropdown">
          <button className="dropbtn">Ladies</button>
          <div className="dropdown-content">
            <Link to="/ProductsFilter:Ladies Shoe">Shoe</Link>
            <Link to="/ProductsFilter:Belt">Belts</Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default TabPanel;
