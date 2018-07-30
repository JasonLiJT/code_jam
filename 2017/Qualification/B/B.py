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
        firstNon0 = min(d, L - 1)
        while N[firstNon0] == '0' and firstNon0 < L - 1:
            firstNon0 += 1
        N = str(int(N[:firstNon0 + 1]) - 1) + N[firstNon0 + 1:]
    print("Case #{}: {}".format(i, N))
