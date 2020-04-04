import Tweener from "./tweener";
import Twister from "./twister";
import Preferance from "./preferance";
import Controller from "./controller";
// import Capture from "./capture";
import World from "./world";
import History from "./history";

export class Cuber {
  _context: Cuber
  world: World;
  tweener: Tweener;
  twister: Twister;
  history: History;
  preferance: Preferance;
  controller: Controller;
  // capture: Capture;

  constructor() {
    this.world = new World(this);
    this.tweener = new Tweener();
    this.twister = new Twister(this);
    this.history = new History(this);
    this.preferance = new Preferance(this);
    this.controller = new Controller(this);
    // this.capture = new Capture();
    this._context = this
  }
}

let cuber = new Cuber();
export default cuber;
