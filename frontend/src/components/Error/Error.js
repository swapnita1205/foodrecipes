import { Button } from "@material-ui/core";
import React from "react";
import "./Error.css";

function Error() {
  return (
    <div className="errorpage">
      <form className="form">
        <h2 className="h1">404</h2>
        <h3>Page not Found</h3>
        <p>
          The page you are looking for doesn't exist or an other error occured.
        </p>
        <Button className="button" color="primary" variant="contained">
          Please go back
        </Button>
      </form>
    </div>
  );
}

export default Error;
