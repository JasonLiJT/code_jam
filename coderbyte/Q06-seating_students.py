def SeatingStudents(arr):
  N = int(arr[0])
  occupied = set(arr[1:])

  def count_desk(i):
    if i in occupied:
      return 0

    count = 0
  
    if i & 1:  # odd
      neighbours = [i-2, i+1, i+2]
    else:  # even
      neighbours = [i-2, i-1, i+2]
    
    for j in neighbours:
      if 1 <= j <= N:
        if j not in occupied:
          count += 1
    
    return count

  ans = 0
  for i in range(1, N+1):
    ans += count_desk(i)
  
  ans = ans // 2  # Counted each pair twice

  return ans

# keep this function call here 
print(SeatingStudents(input()))