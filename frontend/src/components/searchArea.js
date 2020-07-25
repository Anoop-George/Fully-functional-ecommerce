import React from "react";
import TextField from "@material-ui/core/TextField";

function SearchArea() {
  return (
    <div>
      <TextField
        color="primary"
        size="small"
        id="outlined-basic-small"
        label="Search"
        variant="outlined"
      />
    </div>
  );
}

export default SearchArea;
