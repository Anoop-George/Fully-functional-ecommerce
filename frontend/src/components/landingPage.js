import React, { Suspense, lazy } from "react";
import Grid from "@material-ui/core/Grid";
const FeatureBanner = lazy(() => import("./featureBanners"));
const FeaturedProducts = lazy(() => import("./featureProducts"));
const FeatureBanner2 = lazy(() => import("./FeatureBanner2"));
const Carousal = lazy(() => import("./carousal"));

function LandingPage() {
  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        style={{ backgroundColor: "#f5f3f0" }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Grid item xs={12} sm={12}>
            <Carousal />
          </Grid>
          <div style={{ marginTop: 15 }}>
            <FeatureBanner />
          </div>
          <div>
            <FeaturedProducts />
          </div>
          <div>
            <FeatureBanner2 />
          </div>
        </Suspense>
      </Grid>
    </div>
  );
}

export default LandingPage;
