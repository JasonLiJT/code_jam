def tidiness(s):
    previous = s[0]
    for i, d in enumerate(s):
        if previous > d:
            return i
        previous = d
    return -1  # Tidy


T = int(input())
for i in range(1, T + 1):
    N = input()
    L = len(N)
    while True:
        d = tidiness(N)
        if d == -1:
            break
        last_non_0 = min(d + 1, L - 1)
        while N[last_non_0] == '0' and last_non_0 < L - 1:
            last_non_0 += 1
        N = str(int(N[:last_non_0 + 1]) - 1) + N[last_non_0 + 1:]
    print("Case #{}: {}".format(i, N))
