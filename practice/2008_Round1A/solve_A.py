import numpy as np
T = int(input())


def find_min(case, n, v1, v2):
    minimum = np.dot(sorted(v1), sorted(v2, reverse=True))
    # for i in range(n - 1):
    #     # keep v1 and permutate v2

    #     # update minimum
    #     minimum = min(minimum, np.dot(v1, v2))

    print('Case #{}: {}'.format(case, minimum))


for case in range(1, T + 1):
    n = int(input())
    v1 = np.array([int(x) for x in input().split(' ')])
    v2 = np.array([int(x) for x in input().split(' ')])
    find_min(case, n, v1, v2)
