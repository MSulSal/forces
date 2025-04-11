import Balloon from "./components/Balloon";
import Inertial from "./components/Inertial";

const App = () => {
  return (
    <div className="App">
      <h1>Forces</h1>
      <div className="canvas-grid">
        <div className="canvas-container">
          <p>Helium Balloon</p>
          <Balloon />
        </div>
        <div className="canvas-container">
          <p>Inertial Gravitational Acceleration</p>
          <Inertial />
        </div>
      </div>
    </div>
  );
};

export default App;
