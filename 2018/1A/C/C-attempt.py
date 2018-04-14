from math import sqrt

T = int(input())


def solveCase():
    N, P = map(int, input().split())
    dimensions = []
    for i in range(N):
        dimensions.append(tuple(map(int, input().split())))
    maxP = 0.0
    for w, h in dimensions:
        maxP += 2 * w + 2 * h
    dimensions.sort(key=min)
    for w, h in dimensions:
        if maxP + min(w, h) > P:
            return maxP
        if maxP + 2 * sqrt(w * w + h * h) > P:
            return P
        maxP += 2 * sqrt(w * w + h * h)
    return min(maxP, P)


for caseNum in range(1, T + 1):
    print('Case #{}: {}'.format(caseNum, solveCase()))
