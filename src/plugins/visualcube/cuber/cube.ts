import { GroupTable } from "./group";
import Cubelet from "./cubelet";
import { FACE, COLORS } from "./define";
import { Group, Euler } from "three";

export default class Cube extends Group {
  public dirty = true;
  public lock = false;
  public cubelets: Cubelet[] = [];
  public initials: Cubelet[] = [];
  public groups: GroupTable;
  public complete = false;
  public order: number;
  public callback: Function;

  constructor(order: number, callback: Function) {
    super();
    this.order = order;
    this.callback = callback;
    this.scale.set(3 / order, 3 / order, 3 / order);
    for (let i = 0; i < order * order * order; i++) {
      const cubelet = new Cubelet(order, i);
      this.cubelets.push(cubelet);
      this.initials.push(cubelet);
      this.add(cubelet);
    }
    this.groups = new GroupTable(this);
    this.matrixAutoUpdate = false;
    this.updateMatrix();
  }

  update() {
    const complete = [FACE.U, FACE.D, FACE.L, FACE.R, FACE.F, FACE.B].every(face => {
      const group = this.groups.get(FACE[face]);
      if (!group) {
        throw Error();
      }
      const color = this.cubelets[group.indices[0]].getColor(face);
      const same = group.indices.every(idx => {
        return color == this.cubelets[idx].getColor(face);
      });
      return same;
    });
    this.complete = complete;
    this.callback();
  }

  index(value: number) {
    return this.initials[value].index;
  }

  reset() {
    for (const cubelet of this.cubelets) {
      cubelet.setRotationFromEuler(new Euler(0, 0, 0));
      cubelet.index = cubelet.initial;
      cubelet.updateMatrix();
    }
    this.cubelets.sort((left, right) => {
      return left.index - right.index;
    });
  }

  stick(index: number, face: number, color: string) {
    const cubelet = this.initials[index];
    if (!cubelet) {
      throw Error("invalid cubelet index: " + index);
    }
    cubelet.stick(face, color);
    this.dirty = true;
  }

  strip(strip: { [face: string]: number[] | undefined }) {
    for (const face of [FACE.L, FACE.R, FACE.D, FACE.U, FACE.B, FACE.F]) {
      const key = FACE[face];
      const group = this.groups.get(FACE[face]);
      if (!group) {
        throw Error();
      }
      for (const index of group.indices) {
        this.initials[index].stick(face, "");
      }
      const indexes = strip[key];
      if (indexes == undefined) {
        continue;
      }
      for (const index of indexes) {
        const cubelet = this.initials[index];
        if (!cubelet) {
          throw Error("invalid cubelet index: " + index);
        }
        cubelet.stick(face, COLORS.BLACK);
      }
    }
    this.dirty = true;
  }

  //                +------------+
  //                | U1  U2  U3 |
  //                |            |
  //                | U4  U5  U6 |
  //                |            |
  //                | U7  U8  U9 |
  //   +------------+------------+------------+------------+
  //   | L1  L2  L3 | F1  F2  F3 | R1  R2  R3 | B1  B2  B3 |
  //   |            |            |            |            |
  //   | L4  L5  L6 | F4  F5  F6 | R4  R5  R6 | B4  B5  B6 |
  //   |            |            |            |            |
  //   | L7  L8  L9 | F7  F8  F9 | R7  R8  R9 | B7  B8  B9 |
  //   +------------+------------+------------+------------+
  //                | D1  D2  D3 |
  //                |            |
  //                | D4  D5  D6 |
  //                |            |
  //                | D7  D8  D9 |
  //                +------------+
  get state() {
    const result = [];
    for (const face of [FACE.U, FACE.R, FACE.F, FACE.D, FACE.L, FACE.B]) {
      const group = this.groups.get(FACE[face]);
      if (!group) {
        throw Error();
      }
      for (const i of group.indices) {
        result.push(this.cubelets[i].getColor(face));
      }
    }
    return result.join("");
  }
}
