digits = [int(d) for d in input()]
remainder = sum(digits) % 3


def clip(digits):
    digits_copy = digits.copy()
    while len(digits_copy) > 0:
        if digits_copy[0] == 0 and len(digits_copy) > 1:
            del digits_copy[0]
        else:
            break
    if len(digits_copy) != 0:
        return ''.join([str(c) for c in digits_copy])


ans = None
if remainder == 0:
    ans = clip(digits)

elif remainder == 1:
    length = len(digits)
    broke = 0
    digits_del1 = digits.copy()
    digits_del2 = digits.copy()
    length1, length2 = None, None
    for i in range(length):
        if digits_del1[length - 1 - i] % 3 == 1:
            del digits_del1[length - 1 - i]
            broke += 1
            break
    if broke != 0:
        ans = clip(digits_del1)
        length1 = None if ans is None else len(ans)

    count = 0
    mod2_index = []
    for i in range(length):
        if digits[length - 1 - i] % 3 == 2:
            count += 1
            mod2_index.append(length - 1 - i)
            if count == 2:
                break
    if count == 2:
        del digits_del2[mod2_index[0]]
        del digits_del2[mod2_index[1]]
        ans2 = clip(digits_del2)
        length2 = None if ans2 is None else len(ans2)
        if length1 is None:
            if length2 is not None:
                ans = ans2
        elif length2 > length1:
            ans = ans2

elif remainder == 2:
    length = len(digits)
    broke = 0
    digits_del1 = digits.copy()
    digits_del2 = digits.copy()
    length1, length2 = None, None
    for i in range(length):
        if digits_del1[length - 1 - i] % 3 == 2:
            del digits_del1[length - 1 - i]
            broke += 1
            break
    if broke != 0:
        ans = clip(digits_del1)
        length1 = None if ans is None else len(ans)

    count = 0
    mod2_index = []
    for i in range(length):
        if digits[length - 1 - i] % 3 == 1:
            count += 1
            mod2_index.append(length - 1 - i)
            if count == 2:
                break
    if count == 2:
        del digits_del2[mod2_index[0]]
        del digits_del2[mod2_index[1]]
        ans2 = clip(digits_del2)
        length2 = None if ans2 is None else len(ans2)
        if length1 is None:
            if length2 is not None:
                ans = ans2
        elif length2 > length1:
            ans = ans2

if ans is None:
    print(-1)
else:
    print(ans)
