n, k = [int(x) for x in input().split(' ')]
steps = [int(x) for x in input().split(' ')]
steps.reverse()
circle = list(range(n))

index = 0
for i in range(len(steps)):
    index = (index + steps.pop()) % len(circle)
    print(circle[index] + 1, end=' ')
    del circle[index]
