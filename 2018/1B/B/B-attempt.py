T = int(input())


def verify(M, N, sign):
    return sign[3] == M or sign[4] == N


def verifyRange(left, right, signs):
    MN = [[signs[left][3], signs[left][4]],
          [signs[left][3], signs[left + 1][4]],
          [signs[left + 1][3], signs[left][4]],
          [signs[left + 1][3], signs[left + 1][4]]]
    for M, N in MN:
        pairExist = True
        for i in range(left, right + 1):
            if not verify(M, N, signs[i]):
                pairExist = False
                break
        if pairExist:
            return True
    return False


def solveCase():
    S = int(input())
    signs = []  # 0:D, 1:A, 2:B, 3:M, 4:N
    for i in range(S):
        signs.append(list(map(int, input().split())))
    for sign in signs:
        sign.append(sign[0] + sign[1])  # D + A
        sign.append(sign[0] - sign[2])  # D - B

    if len(signs) == 1:
        return '1 1'
    if len(signs) == 2:
        return '2 1'
    left = 0
    right = 1
    maxLength = 2
    maxLengthCount = 0
    # Two pointers
    while right < S:  # right <= S-1
        if verifyRange(left, right, signs):
            if right - left + 1 == maxLength:
                maxLengthCount += 1
            elif right - left + 1 > maxLength:
                maxLengthCount = 1
            maxLength = max(maxLength, right - left + 1)
            print(left, right, 'True', maxLengthCount)
            right += 1
        else:
            left += 1
    print(signs)  # --------------
    return '{} {}'.format(maxLength, maxLengthCount)


for caseNum in range(1, T + 1):
    print('Case #{}: {}'.format(caseNum, solveCase()))
