import React from "react";

const NotFound = () => {
  return (
    <div className="not-found">
      <p className="emoji">😢 </p>
      <p className="headingS no-definition space-block-300">
        No Definitions Found
      </p>
      <p>
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead
      </p>
    </div>
  );
};

export default NotFound;
