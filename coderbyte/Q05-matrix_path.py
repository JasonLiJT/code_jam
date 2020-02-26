from collections import deque


def MatrixPath(strArr):

  mat = strArr
  r_max = len(strArr) - 1
  c_max = len(strArr[0]) - 1

  def neighbours(r, c):
    return [
      (r + a, c + b)
      for a, b in [
        (0, 1),
        (1, 0),
        (0, -1),
        (-1, 0)
      ]
      if (0 <= r+a <= r_max) and (0 <= c+b <= c_max)
    ]

  visited = set()
  zeros_next_to_visited = set()
  q = deque()
  q.append((0, 0))

  # BFS
  while q:
    r, c = q.popleft()
    # print('visiting:', r, c, mat[r][c])
    visited.add((r, c))
    for r1, c1 in neighbours(r, c):
      if (r1, c1) in visited or (r1, c1) in zeros_next_to_visited:
        continue
      if mat[r1][c1] == '1':
        q.append((r1, c1))
      else:
        zeros_next_to_visited.add((r1, c1))

  if (r_max, c_max) in visited:
    return 'true'
  
  # Try continuing from one of the zeros
  visited_backup = set(visited)
  zero_successful_count = 0
  for zero_coord in zeros_next_to_visited:
    q.append(zero_coord)
    visited = set(visited_backup)
    # print('Visiting zero from:', zero_coord)
    while q:
      r, c = q.popleft()
      # print('visiting:', r, c, mat[r][c])
      visited.add((r, c))
      for r1, c1 in neighbours(r, c):
        if (r1, c1) in visited or (r1, c1) in zeros_next_to_visited:
          continue
        if mat[r1][c1] == '1':
          q.append((r1, c1))
    if (r_max, c_max) in visited:
      # print('Success!', zero_coord)
      zero_successful_count += 1
  
  if zero_successful_count:
    return zero_successful_count

  return 'not possible'

# keep this function call here 
print(MatrixPath(input()))