n = int(input())
arrA = list(map(int, input().split()))
arrB = list(map(int, input().split()))
arrA.sort()
arrB.sort()
scoreDiff = 0
aPlaying = True
while(len(arrA) != 0 or len(arrB) != 0):
    if len(arrA) == 0:
        if aPlaying:
            arrB.pop()
        else:
            scoreDiff -= arrB[-1]
            arrB.pop()
    elif len(arrB) == 0:
        if aPlaying:
            scoreDiff += arrA[-1]
            arrA.pop()
        else:
            arrA.pop()
    else:
        maxA = arrA[-1]
        maxB = arrB[-1]
        if aPlaying:
            if maxA > maxB:
                scoreDiff += maxA
                arrA.pop()
            else:
                arrB.pop()
        else:
            if maxA > maxB:
                arrA.pop()
            else:
                scoreDiff -= maxB
                arrB.pop()
    aPlaying = not aPlaying
print(scoreDiff)
