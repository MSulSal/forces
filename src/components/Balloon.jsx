import Sketch from "react-p5";

let mover, gravitySlider, windSliderx, windSlidery, gLabel, xLabel, yLabel;

class Mover {
  constructor(p5) {
    this.p5 = p5;
    this.width;
    this.position = p5.createVector(p5.width / 2, p5.height / 2);
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, 0);
    this.gravity = p5.createVector(0, 0);
    this.wind = p5.createVector(0, 0);
    this.buoyancy = 0.1;
  }

  step() {
    let dt = this.p5.deltaTime / 1000;
    this.gravity = this.p5.createVector(0, gravitySlider.value());
    this.wind = this.p5.createVector(windSliderx.value(), -windSlidery.value());
    this.acceleration = this.p5
      .createVector()
      .add(this.gravity)
      .add(this.wind)
      .add(this.p5.createVector(0, -this.buoyancy))
      .mult(dt);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  show() {
    this.p5.noStroke();
    this.p5.fill(100);
    this.p5.rect(this.position.x - 2.5, this.position.y + 20, 5, 100);
    this.p5.fill(255, 0, 0);
    this.p5.ellipse(this.position.x, this.position.y, 50, 70);
    gLabel.html("G: (" + gravitySlider.value() + ")");
    xLabel.html("Horizontal Wind: (" + windSliderx.value() + ")");
    yLabel.html("Vertical WInd: (" + windSlidery.value() + ")");
  }

  checkEdges() {
    const loss = 0.5;
    if (this.position.x > this.p5.width) {
      this.position.x = this.p5.width - 48;
      this.velocity.x *= -1 * loss;
    }
    if (this.position.x < 0) {
      this.position.x = 48;
      this.velocity.x *= -1 * loss;
    }

    if (this.position.y > this.p5.height) {
      this.position.y = this.p5.height - 48;
      this.velocity.y *= -1 * loss;
    } else if (this.position.y < 0) {
      this.position.y = 48;
      this.velocity.y *= -1 * loss;
    }
  }
}

const Balloon = () => {
  const setup = (p5, canvasParentRef) => {
    p5.background(255);
    const width = canvasParentRef.offsetWidth;
    const height = width * 0.5;
    p5.createCanvas(width, height).parent(canvasParentRef);
    gLabel = p5.createDiv("G: (" + 10 + ")").parent(canvasParentRef);
    gravitySlider = p5.createSlider(0, 100, 10, 0.1).parent(canvasParentRef);
    xLabel = p5
      .createDiv("Horizontal Wind: (" + 0 + ")")
      .parent(canvasParentRef);
    windSliderx = p5.createSlider(0, 100, 0, 0.1).parent(canvasParentRef);
    yLabel = p5.createDiv("Vertical Wind: (" + 0 + ")").parent(canvasParentRef);
    windSlidery = p5.createSlider(0, 100, 10, 0.1).parent(canvasParentRef);
    mover = new Mover(p5);
  };

  const draw = (p5) => {
    p5.clear();
    mover.step();
    mover.checkEdges();
    mover.show();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Balloon;
