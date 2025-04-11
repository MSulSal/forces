import Balloon from "./components/Balloon";
import Wind from "./components/Wind";

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
          <p>More mass, more weight</p>
          <Wind />
        </div>
      </div>
    </div>
  );
};

export default App;
