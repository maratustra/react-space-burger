import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="white"
      ariaLabel="rotating-lines-loading"
      animationDuration="0.75"
      width="30"
      height="30"
      visible={true}
    />
  );
};

export default Loader;