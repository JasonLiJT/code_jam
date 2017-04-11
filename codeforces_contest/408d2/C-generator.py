from random import randint
N = 300000
print(N)
for i in range(N):
    print(randint(-1, 1), end=' ')
print()
for i in range(N - 1):
    print(i + 1, i + 2)
