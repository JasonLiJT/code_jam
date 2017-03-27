n = int(input())
line = sorted([int(x) for x in input().split(' ')])

diff = []
for i in range(n - 1):
    diff.append(line[i + 1] - line[i])

diff.sort()
y = diff[0]
count = 0
for x in diff:
    if x == y:
        count += 1

print(y, count)
