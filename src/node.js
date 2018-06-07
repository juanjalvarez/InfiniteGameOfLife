
export default class Node {
  
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  key = () => `${this.x}_${this.y}`

  apply = (x, y) => new Node(this.x + x, this.y + y)

  forEachNeighbor = cb => {
    cb(this.x, this.y + 1)
    cb(this.x + 1, this.y + 1)
    cb(this.x + 1, this.y)
    cb(this.x + 1, this.y - 1)
    cb(this.x, this.y - 1)
    cb(this.x - 1, this.y - 1)
    cb(this.x - 1, this.y)
    cb(this.x - 1, this.y + 1)
  }

  static applySet = (set = [], x, y) => set.map(n => n.apply(x, y))
}
