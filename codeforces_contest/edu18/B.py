n, k = [int(x) for x in input().split(' ')]
steps = [int(x) for x in input().split(' ')]
circle = list(range(n))


def next_index(i, steps, circle):
    length = len(circle)
    return (i + steps[0]) % length


index = 0
while len(steps) > 0:
    # print(index, steps, circle)
    index = next_index(index, steps, circle)
    print(circle[index] + 1, end=' ')
    del circle[index]
    del steps[0]
