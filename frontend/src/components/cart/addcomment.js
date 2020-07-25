import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
//import StarIcon from "@material-ui/icons/Star";
//import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { CSRF_TOKEN } from "../common/csrf_token";

function Addcomment(props) {
  const productid = parseInt(props.match.params.id.substring(1), 10);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [value, setValue] = useState(0);

  const uploadreview = () => {
    axios
      .post(
        `api/CommentCreate/${productid}/`,
        {
          comment: comment,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-CSRFTOKEN": CSRF_TOKEN,
          },
        }
      )
      .then((r) => {
        if (r.data.author) {
          setFeedback("Your review is recorded");
        } else {
          setFeedback(r.data);
        }
      });
  };
  //
  const addrating = () => {
    let rating = "";
    if (value < 2) {
      rating = "bad";
    } else if (value <= 3) {
      rating = "avarage";
    } else if (value > 3) {
      rating = "good";
    }
    axios
      .post(
        `/api/AddRemoveRatings/${productid}/${rating}/`,
        {},
        {
          headers: {
            "content-type": "application/json",
            "X-CSRFTOKEN": CSRF_TOKEN,
          },
        }
      )
      .then(() =>
        setFeedback(
          "Thanks, it will be recorded if product is delivered to you"
        )
      );
  };
  //
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={11} sm={7}>
          <Typography style={{ margin: 13, padding: 3 }}>
            Add Review and Rating only after purchased product delivery
          </Typography>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="outlined-basic"
            multiline
            fullWidth
            label="Add Review"
            variant="outlined"
          />
          <Button
            color="primary"
            variant="contained"
            style={{ margin: 3 }}
            size="small"
            onClick={() => uploadreview()}
          >
            Add Review
          </Button>
        </Grid>
        <Grid item xs={7} sm={7} style={{ margin: 6 }}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={async (e) => {
              await setValue(parseInt(e.target.value));
              addrating();
            }}
          />
         
        </Grid>
        <Grid item xs={7} sm={7} style={{ margin: 6 }}>
          {feedback ? (
            <div>
              <Typography variant="body1">{feedback}</Typography>
              <Button variant="outlined" onClick={() => setFeedback(null)}>
                dismiss
              </Button>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default Addcomment;
