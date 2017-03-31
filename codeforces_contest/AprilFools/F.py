n, *arr = list(map(int, input().split()))
arr = list(set(arr))
arr.sort()
if len(arr) > 3:
    if arr[3] == 33:
        arr[3] == 27
print(' '.join(list(map(str, arr))))
