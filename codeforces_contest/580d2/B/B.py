input()
arr = list(map(int, input().split()))

zeros = 0
closer_to_minus_ones = 0
dist = 0

for x in arr:
    if x == 0:
        zeros += 1
        dist += 1
    elif x > 0:
        dist += x - 1
    else:
        closer_to_minus_ones += 1
        dist += -1 - x

if closer_to_minus_ones & 1 and zeros == 0:  # Odd -1's
    print(dist + 2)
else:
    print(dist)
