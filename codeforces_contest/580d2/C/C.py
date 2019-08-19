# 1, 2, ..., 2N
# 2N sum of N numbers, each number appears N times:
# Total sum is (2N + 1) * N^2
# Each sum differ by at most one
# The average of each sum is a = (2N + 1) * N / 2
# If N is even, then all sum has to be a, which is impossible, because numbers
# a1-aN must have the same average as numbers a2-a(N+1), which means a1 == a(N+1)
# If N is odd, then there has to be N sums of floor(a) and N sums of ceil(a)
N = int(input())
if N & 1 == 0:  # even
    print('NO')
else:
    print("YES")
    circle = [None] * (2 * N)
    i = 0  # Index
    for j in range(1, N + 1):
        circle[i] = 2 * j - 1
        circle[(i+N) % (2*N)] = 2 * j
        i = (i + N + 1) % (2 * N)
    print(' '.join(map(str, circle)))
