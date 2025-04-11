import Balloon from "./components/Balloon";

const App = () => {
  return (
    <div className="App">
      <h1>Forces</h1>
      <div className="canvas-grid">
        <div className="canvas-container">
          <p>Helium Balloo</p>
          <Balloon />
        </div>
      </div>
    </div>
  );
};

export default App;
