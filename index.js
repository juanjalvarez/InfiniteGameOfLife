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
  }

  const size = 10

  const screenWidth = window.innerWidth / size
  const screenHeight = window.innerHeight / size

  const baseX = screenWidth / 2
  const baseY = screenHeight / 2
  
  let nodes = [
    new Node(baseX, baseY),
    new Node(baseX, baseY + 1),
    new Node(baseX + 1, baseY + 1),
    new Node(baseX - 1, baseY),
    new Node(baseX, baseY - 1)
  ]
  let cycles = -1
  let invervalId

  const liveOrDie = (x, y) => {
    const neighbors = nodes.filter(n => [
        n.x - 1 === x && n.y === y,
        n.x + 1 === x && n.y === y,
        n.x === x && n.y - 1 === y,
        n.x === x && n.y + 1 === y
      ].indexOf(true) !== -1
    )
    if (neighbors.length === 2 || neighbors.length === 3) {
      return true
    }
    return false
  }

  const processCoord = (x, y, newList = []) => {
    const doesLive = liveOrDie(x, y)
    if (doesLive) {
      newList.push(new Node(x, y))
    }
  }

  const nextStep = () => {
    const newList = []
    for (const node of nodes) {
      processCoord(node.x, node.y, newList)
      processCoord(node.x + 1, node.y, newList)
      processCoord(node.x - 1, node.y, newList)
      processCoord(node.x, node.y + 1, newList)
      processCoord(node.x, node.y - 1, newList)
    }
    nodes = newList
  }
  
  const nextCycle = () => {
    cycles++
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.font = '20px arial'
    context.fillText(`Cycle #${cycles}`, 20, 40)
    for (const node of nodes) {
      context.fillRect(node.x * size, node.y * size, size, size)
    }
    context.stroke()
    nextStep()
    if (cycles === 45) {
      clearInterval(intervalId)
    }
  }
  
  nextCycle()
  intervalId = setInterval(nextCycle, 100)
}
