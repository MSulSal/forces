import Sketch from "react-p5";

let movers = [];
let count = 0;

class Mover {
  constructor(index, p5, parent, massSlider, x, y) {
    this.index = index;
    this.p5 = p5;
    this.massSlider = massSlider;
    this.mass = massSlider.value();
    this.position = p5.createVector(x, y);
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, 1);
    this.massLabel = p5.createDiv("particle " + index + " mass: " + this.mass);
    this.massLabel.parent(parent);
    this.massSlider.parent(parent);
  }

  update() {
    this.mass = this.massSlider.value();
    let dt = this.p5.deltaTime / 1000;
    this.velocity.add(this.acceleration.mult(dt));
    this.position.add(this.velocity.mult(dt));
    this.acceleration.mult(0);
    this.massLabel.html("particle " + this.index + " mass: " + this.mass);
  }

  show() {
    this.p5.stroke(50);
    this.p5.fill(175);
    this.p5.circle(this.position.x, this.position.y, this.mass * 16);
  }

  checkEdges() {
    const loss = 0.5;
    if (this.position.x > this.p5.width) {
      this.velocity.x *= -1 * loss;
    }
    if (this.position.x < 0) {
      this.velocity.x *= -1 * loss;
    }

    if (this.position.y > this.p5.height) {
      this.velocity.y *= -1 * loss;
    } else if (this.position.y < 0) {
      this.velocity.y *= -1 * loss;
    }
  }

  applyForce(force) {
    this.acceleration.add(force.copy().div(this.mass));
  }
}

const Inertial = () => {
  const setup = (p5, canvasParentRef) => {
    const size = 2;
    p5.background(255);
    const width = canvasParentRef.offsetWidth;
    const height = width * 0.5;
    p5.createCanvas(width, height).parent(canvasParentRef);
    for (let i = 0; i < size; i++) {
      movers[i] = new Mover(
        i + 1,
        p5,
        canvasParentRef,
        p5.createSlider(1, p5.width / (4 * 16), 1, 0.5),
        p5.width / 4 + (i * p5.width) / 2,
        30
      );
    }
  };

  const draw = (p5) => {
    p5.clear();
    let gravity = p5.createVector(0, 1000);
    for (let mover of movers) {
      mover.applyForce(gravity);
      if (p5.mouseIsPressed) {
        let wind = p5.createVector(100, 0);
        mover.applyForce(wind);
      }
      mover.update();
      mover.checkEdges();
      mover.show();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Inertial;
