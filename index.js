const onLoad = () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  context.canvas.width = window.innerWidth
  context.canvas.height = window.innerHeight

  class Node {
  
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    key() {
      return `${this.x}_${this.y}`
    }
  }

  const size = 2

  const screenWidth = Math.floor(window.innerWidth / size)
  const screenHeight = Math.floor(window.innerHeight / size)

  const baseX = Math.floor(screenWidth / 2)
  const baseY = Math.floor(screenHeight / 2)
  
 const rPentomino = [
    new Node(baseX, baseY),
    new Node(baseX, baseY + 1),
    new Node(baseX + 1, baseY + 1),
    new Node(baseX - 1, baseY),
    new Node(baseX, baseY - 1)
  ]

  const acorn = [
    new Node(baseX, baseY),
    new Node(baseX - 2, baseY - 1),
    new Node(baseX - 2, baseY + 1),
    new Node(baseX - 3, baseY - 1),
    new Node(baseX + 1, baseY - 1),
    new Node(baseX + 2, baseY - 1),
    new Node(baseX + 3, baseY - 1),
  ]

  let nodes = acorn
  let cycles = -1

  const isNegative = n => (1 / n) < 0

  const processCoord = (x, y, neighborMap) => {
    const key = `${x}_${y}`
    let val = neighborMap.get(key)
    if (!val) {
      val = 0
    }
    neighborMap.set(key, isNegative(val) ? val - 1 : val + 1)
  }

  const nextStep = () => {
    const newList = []
    const neighborMap = new Map()
    nodes.forEach(node => neighborMap.set(node.key(), -100))
    for (const node of nodes) {
      processCoord(node.x, node.y + 1, neighborMap)
      processCoord(node.x + 1, node.y + 1, neighborMap)
      processCoord(node.x + 1, node.y, neighborMap)
      processCoord(node.x + 1, node.y - 1, neighborMap)
      processCoord(node.x, node.y - 1, neighborMap)
      processCoord(node.x - 1, node.y - 1, neighborMap)
      processCoord(node.x - 1, node.y, neighborMap)
      processCoord(node.x - 1, node.y + 1, neighborMap)
    }
    for (const key of neighborMap.keys()) {
      const parts = key.split('_')
      const x = parseInt(parts[0], 10)
      const y = parseInt(parts[1], 10)
      let val = neighborMap.get(key)
      const isAlive = isNegative(val)
      if (isAlive) {
        val += 100
      }
      const neighbors = isAlive ? -val : val
      if (
        neighbors === 3 ||
        (isAlive && neighbors === 2)
      ) {
        newList.push(new Node(x, y))
      }
    }
    nodes = newList
  }
  
  const nextCycle = () => {
    cycles++
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.font = '16px arial'
    context.fillText(`Cycle #${cycles}`, 20, 40)
    for (const node of nodes) {
      context.fillStyle = 'rgb(0,0,0)'
      context.fillRect(node.x * size, node.y * size, size, size)
      // context.fillStyle = 'rgb(255,0,0)'
      // context.font = '15px arial'
      // context.fillText(node.key(), node.x * size + 10, node.y * size + 30)
    }
    context.stroke()
    nextStep()
  }
  
  nextCycle()
 setInterval(nextCycle, 10)
}
