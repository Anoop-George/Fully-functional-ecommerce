import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfileDetails(props) {
  const userid = parseInt(props.match.params.id.substring(1), 10);
  const [item, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`accounts/profiledetails/${userid}/`)
      .then((r) => setData(r.data));
  }, []);
  return (
    <div>
      <div>
        <h4>Name : {item.name}</h4>

        <p>Address : {item.address}</p>

        <p>Phone : {item.phone}</p>

        <p>Email : {item.emailid}</p>

        <p>Id: {item.id}</p>
      </div>
    </div>
  );
}

export default ProfileDetails;
