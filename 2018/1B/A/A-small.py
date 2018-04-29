T = int(input())


def round(N, p):
    return int(p / N * 100 + 0.5)


def roundedUp(N, p):
    return int(p / N * 200) % 2 == 1


def getSum(N, votes):
    return sum(map(lambda x: round(N, x[0]), votes))


def distToNextRoundedUp(N, p):
    i = 0
    while p <= N:
        if roundedUp(N, p):
            break
        p += 1
        i += 1
    return i


def solveCase():
    N, L = map(int, input().split())
    votes = list(map(int, input().split()))
    remaining = N - sum(votes)
    votes.extend([0] * remaining)
    votes = [[x, distToNextRoundedUp(N, x)] for x in votes]
    votes.sort(key=lambda x: x[1])
    for i, pair in enumerate(votes):
        if remaining < pair[1]:
            break
        votes[i][0] += pair[1]
        remaining -= pair[1]
    if remaining > 0:
        votes[0][0] += remaining
    return getSum(N, votes)


for caseNum in range(1, T + 1):
    print('Case #{}: {}'.format(caseNum, solveCase()))
