import React from "react";
import classes from "./Loader.module.css";

function Loader() {

  
  return (
    <div className={classes.loader}>
      <div className={classes.circles}>
        <span className={classes.one}></span>
        <span className={classes.two}></span>
        <span className={classes.three}></span>
      </div>
      <div className={classes.pacman}>
        <span className={classes.top}></span>
        <span className={classes.bottom}></span>
        <span className={classes.left}></span>
        <div className={classes.eye}></div>
      </div>
    </div>
  );
}

export default Loader;
