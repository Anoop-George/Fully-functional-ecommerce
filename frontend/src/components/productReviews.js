import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

function ProductReviews(props) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const productid = parseInt(props.match.params.id.substring(1), 10);
  const [url, setUrl] = useState(`api/CommentList/${productid}`);

  useEffect(() => {
    axios.get(url).then((res) => {
     
      setNext(res.data.next);
      setPrev(res.data.previous);
      setData(res.data.results);
    });
  }, [url]);
  return (
    <div>
     
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={10}>
          <Typography variant='h6'>User Reviews </Typography>
          {data.length < 1 ? (
            <Typography style={{ margin: 5, padding: 5 }}>
              No User Reviews yet{" "}
            </Typography>
          ) : null}
        </Grid>
        {data.map((item) => {
          return (
            <Grid item xs={12} sm={10} key={item.author}>
              <Paper elevation={2} style={{ margin: 2, padding: 3 }}>
                <Typography variant="body1">{item.comment}</Typography>
                <Typography variant="body2">
                  Author ID: {item.author}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
        {data.length>0?(<Grid item xs={12} sm={10}>
          <Button
            style={{ margin: 4 }}
            onClick={() => setUrl(prev)}
            variant="contained"
            color="secondary"
          >
            Prev{" "}
          </Button>
          <Button
            style={{ margin: 4 }}
            onClick={() => setUrl(next)}
            variant="contained"
            color="primary"
          >
            next{" "}
          </Button>
        </Grid>):null}
        
      </Grid>
    </div>
  );
}

export default ProductReviews;
