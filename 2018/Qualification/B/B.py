def solve_case():
    N = int(input())
    arr = list(map(int, input().split()))
    even_ind = sorted([num for ind, num in enumerate(arr) if ind % 2 == 0])
    odd_ind = sorted([num for ind, num in enumerate(arr) if ind % 2 == 1])
    for i in range(N - 1):
        if i % 2 == 0:
            if even_ind[i // 2] > odd_ind[i // 2]:
                return i
        else:
            if odd_ind[i // 2] > even_ind[i // 2 + 1]:
                return i
    return 'OK'


T = int(input())

for case in range(1, T + 1):
    ans = solve_case()
    print('Case #{}: {}'.format(case, ans))
