import Sketch from "react-p5";

let movers = [];
let count = 0;
let gravitySlider, gravityLabel;

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
    this.velocity.add(this.acceleration.copy().mult(dt));
    this.position.add(this.velocity.copy().mult(dt));
    this.acceleration.mult(0);
    this.massLabel.html("particle " + this.index + " mass: " + this.mass);
  }

  show() {
    this.p5.stroke(50, 50);
    if (count < 100) {
      this.p5.stroke(50, count);
      this.p5.fill(175, count);
      count += 10;
    } else {
      this.p5.stroke(50);
      this.p5.fill(175);
      count = 0;
    }
    this.p5.circle(this.position.x, this.position.y, this.mass * 16);
  }

  checkEdges() {
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    } else {
      let forceMag = this.mass / this.position.y;
      let force = this.p5.createVector(0, 1).mult(forceMag);
      this.applyForce(force);
    }

    if (this.position.y > this.p5.height) {
      this.position.y = this.p5.height;
      this.velocity.y *= -1;
    } else {
      let forceMag = this.mass / (this.p5.height - this.position.y);
      let force = this.p5.createVector(0, -1).mult(forceMag);
      this.applyForce(force);
    }

    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    } else {
      let forceMag = this.mass / this.position.x;
      let force = this.p5.createVector(1, 0).mult(forceMag);
      this.applyForce(force);
    }

    if (this.position.x > this.p5.width) {
      this.position.x = this.p5.width;
      this.velocity.x *= -1;
    } else {
      let forceMag = this.mass / (this.p5.width - this.position.x);
      let force = this.p5.createVector(-1, 0).mult(forceMag);
      this.applyForce(force);
    }
  }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass));
  }
}

const Repel = () => {
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
    gravitySlider = p5.createSlider(0, 50, 10, 1);
    gravityLabel = p5.createDiv("gravity: " + gravitySlider.value());
    gravityLabel.parent(p5.canvas.parentElement);
    gravitySlider.parent(p5.canvas.parentElement);
  };

  const draw = (p5) => {
    gravityLabel.html("gravity: " + gravitySlider.value());
    let gravity = p5.createVector(0, gravitySlider.value());
    for (let mover of movers) {
      mover.applyForce(gravity);
      if (
        p5.mouseIsPressed &&
        p5.mouseX > 0 &&
        p5.mouseX < p5.width &&
        p5.mouseY > 0 &&
        p5.mouseY < p5.height
      ) {
        let wind = p5.createVector(100, 0);
        mover.applyForce(wind);
      }
      mover.checkEdges();
      mover.update();
      mover.show();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Repel;
