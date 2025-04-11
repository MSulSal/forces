import Balloon from "./components/Balloon";
import Aristotle from "./components/Aristotle";

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
          <Aristotle />
        </div>
      </div>
    </div>
  );
};

export default App;
