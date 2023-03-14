import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return <div className={classes.spinner}></div>;

  // return (
  //   <div className={classes.loaderContainer}>
  //     <div className="spinner"></div>
  //   </div>
  // );
};

export default LoadingSpinner;
