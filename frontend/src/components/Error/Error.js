import React from "react";
import "./Error.css";

function Error() {
  return (
    <div className="errorpage">
      <form>
        <h2>404</h2>
        <h3>Page not Found</h3>
        <p>
          The page you are looking for doesn't exist or an other error occured.
          <br /> Please go back!
        </p>
      </form>
    </div>
  );
}

export default Error;
