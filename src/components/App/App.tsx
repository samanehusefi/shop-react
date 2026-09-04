import Amazing from "../Home/Amazing/Amazing";
import CircleBadge from "../Home/CircleBadge/CircleBadge";
import Slider from "../Home/Slider/Slider";
import Header from "../Layout/Header/Header";

const App = () => {
  return (
    <div className="w-full  h-screen mx-auto">
      <>
        <Header />
        <Slider />
        <CircleBadge />
        <Amazing />
      </>
    </div>
  );
};

export default App;
