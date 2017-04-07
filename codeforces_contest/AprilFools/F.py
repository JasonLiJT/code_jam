import time
t = time.time()
n, *arr = list(map(int, input().split()))
arr.sort()

while time.time() - t < 1.3:
    pass
print(' '.join(list(map(str, arr))))
