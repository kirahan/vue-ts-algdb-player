import Tweener from "./tweener";
import Twister from "./twister";
import Preferance from "./preferance";
import Controller from "./controller";
import Capture from "./capture";
import World from "./world";
import History from "./history";

const world = new World();
const tweener = new Tweener();
const twister = new Twister();
const history = new History();
const preferance = new Preferance();
const controller = new Controller();
const capture: Capture = new Capture();

export default { world, controller, preferance, history, twister, tweener, capture };
