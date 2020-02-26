def FindIntersection(strArr):
  a, b = [set(map(int, s.split(','))) for s in strArr]
  intersect = a & b

  if not intersect:
    return 'false'

  return ','.join(map(str, sorted(intersect)))

print(FindIntersection(input()))