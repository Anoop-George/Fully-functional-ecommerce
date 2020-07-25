import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

function ProductMobile(props) {
  const brand = props.match.params.brand.substring(1);
  const [url, setUrl] = useState(null);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [showfilter, setShowfilter] = useState(false);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1000);
  const [delivery, setdelivery] = useState(false);

  useEffect(() => {
    setUrl(`api/products/${brand}`);
  }, [brand]);

  useEffect(() => {
    if (url != null) {
      const fetchdata = async () => {
        try {
          const results = await axios.get(url);
          setData(results.data.results);
          setLoading(false);
          setNext(results.data.next);
          setPrev(results.data.previous);
        } catch {
          setError(true);
        }
      };
      fetchdata();
    }
  }, [url]);

  const submitfilter = () => {
    setUrl(`api/FilteredPro/${brand}/${max}/${min}/${delivery}/`);
  };

  return (
    <Grid
      spacing={2}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      {/* filter starts */}
      <Grid item xs={11} sm={12}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => setShowfilter(true)}
          style={{ margin: 4 }}
        >
          Filter
        </Button>
        {data.length < 1 ? (
          <Typography style={{ margin: 20 }}>
            It takes long time to fetch data or try different search
          </Typography>
        ) : null}
        {showfilter ? (
          <Paper
            variant="outlined"
            square
            elevation={3}
            style={{ margin: 5, padding: 6 }}
          >
            <TextField
              type="number"
              size="small"
              id="outlined-basic"
              label="min price "
              variant="outlined"
              style={{ margin: 4 }}
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />

            <TextField
              type="number"
              size="small"
              id="outlined-basic"
              label="max price"
              variant="outlined"
              style={{ margin: 4 }}
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
            <Typography>Cash on delivery</Typography>
            <Switch
              checked={delivery}
              onChange={() => setdelivery(!delivery)}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
              style={{ margin: 4, float: "right" }}
            />
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => submitfilter()}
              style={{ marginLeft: 64 }}
            >
              submit
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => setShowfilter(false)}
              style={{ marginLeft: 9 }}
            >
              close
            </Button>
          </Paper>
        ) : null}
      </Grid>
      {/* filter ends */}
      {loading ? (
        <Typography style={{ color: "darkblue", margin: 20 }} variant="body1">
          Loading...
        </Typography>
      ) : null}
      {error ? (
        <Typography style={{ color: "red", margin: 20 }} variant="body1">
          Something went wrong
        </Typography>
      ) : null}
      {data.map((item) => {
        return (
          <Grid item xs={12} sm={3} key={item.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={{ pathname: `/productDetails/:${item.id}` }}
            >
              <Card>
                <img
                  src={item.photo}
                  style={{
                    width: "50%",
                    height: "auto",
                    maxHeight: 250,
                    mazWidth: 250,
                  }}
                />
                <CardContent>
                  <Typography style={{ color: "darkblue" }} variant="body1">
                    {item.name}
                  </Typography>
                  <Typography style={{ color: "blue" }} variant="body2">
                    Brand: {item.brand}
                  </Typography>

                  <Typography
                    style={{ float: "right", color: "#b0a627" }}
                    variant="caption"
                  >
                    Price : {item.price} USD
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        );
      })}
      <Grid item xs={8} sm={7}>
        {prev != null ? (
          <Button
            onClick={() => setUrl(prev)}
            size="small"
            variant="contained"
            color="secondary"
          >
            prev
          </Button>
        ) : null}
        {next != null ? (
          <Button
            onClick={() => setUrl(next)}
            size="small"
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
}
export default ProductMobile;
