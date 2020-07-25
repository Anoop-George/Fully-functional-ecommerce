
  const userloginstatus = (state={loggedin:false}, action) => {
    switch (action.type) {
      case "USERLOGINCHECK": {
        return { loggedin: action.payload };
      }
      default:
        return state;
    }
  };
  
  export default userloginstatus;
  