n = int(input())
# Total sum = n * (n + 1) / 2
if n < 3:
    print('No')
elif n & 1:  # odd
    # Total sum = ((n + 1) / 2) * n
    # = ((1) + (n - 1)) + (n - 1) / 2 * n = n + (n - 1) / 2 * n,
    # where n - 1 > 1, i.e. n > 2
    print('Yes')
    print(2, 1, n - 1)
    print(n - 2, *range(2, n - 1), n)
else:  # even
    # Total sum = (n / 2) * (n + 1) = (n / 2 - 1) * (n + 1) + (n + 1)
    # where n / 2 - 1 > 0, i.e. n >= 4
    print('Yes')
    print(2, 1, n)
    print(n - 2, *range(2, n))
