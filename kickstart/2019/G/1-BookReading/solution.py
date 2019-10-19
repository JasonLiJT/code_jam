from collections import Counter

T = int(input())

for t in range(1, T + 1):
    N, M, Q = map(int, input().split())
    P = set(map(int, input().split()))
    R = Counter(map(int, input().split()))

    existingPages = set(range(1, N+1)) - P

    ans = 0
    for ri, n_ri in R.items():
        for mult in range(1, N // ri + 1):
            if ri * mult in existingPages:
                ans += n_ri

    print('Case #{}: {}'.format(t, ans))
