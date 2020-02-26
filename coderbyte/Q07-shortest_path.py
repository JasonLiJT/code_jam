from collections import defaultdict, deque
from queue import PriorityQueue

def ShortestPath(strArr):

  N = int(strArr[0])

  nodes = strArr[1:N+1]
  source, target = nodes[0], nodes[-1]

  edges = [s.split('-') for s in strArr[N+1:]]
  # print('edges:', edges)
  adjList = defaultdict(list)
  for a, b in edges:
    adjList[a].append(b)
    adjList[b].append(a)
  # print('adjList', adjList)

  # Dijkstra
  q = PriorityQueue()
  q.put((0, source))
  dist = {node: float('inf') for node in nodes}
  dist[source] = 0
  parent = {node: None for node in nodes}
  visited = set()

  while not q.empty():
    currentDist, currentNode = q.get()
    # print('Visiting:', currentNode)
    visited.add(currentNode)
    for neighbour in adjList[currentNode]:
      if neighbour in visited:
        continue
      
      # print('Putting:', currentNode)
      if dist[currentNode] + 1 < dist[neighbour]:
        # print('Pointing', neighbour, 'to', currentNode)
        dist[neighbour] = dist[currentNode] + 1
        parent[neighbour] = currentNode
      q.put((dist[neighbour], neighbour))
  
  # print('parent:', parent)
  # print('dist:', dist)

  if parent[target] is None:
    return -1

  ans = deque()
  currentNode = target
  while currentNode is not None:
    ans.appendleft(currentNode)
    currentNode = parent[currentNode]
  
  return '-'.join(list(ans))
      



# keep this function call here 
print(ShortestPath(input()))