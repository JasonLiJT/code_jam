digits = [int(d) for d in input()]
remainder = sum(digits) % 3


def output(digits):
    while len(digits) > 0:
        if digits[0] == 0 and len(digits) > 1:
            del digits[0]
        else:
            break
    if len(digits) == 0:
        print(-1)
    else:
        print(''.join([str(c) for c in digits]))


if remainder == 0:
    output(digits)
elif remainder == 1:
    length = len(digits)
    for i, d in enumerate(digits):
        if d % 3 == 1:
            del digits[i]
            break
    if i != length - 1:
        output(digits)
    else:
        count = 0
        mod2_index = []
        for i, d in enumerate(digits):
            if d % 3 == 2:
                count += 1
                mod2_index.append(i)
                if count == 2:
                    break
        if count == 2:
            del digits[mod2_index[0]]
            del digits[mod2_index[1] - 1]
            output(digits)
        else:
            print(-1)
elif remainder == 2:
    length = len(digits)
    for i, d in enumerate(digits):
        if d % 3 == 2:
            del digits[i]
            break
    if i != length - 1:
        output(digits)
    else:
        count = 0
        mod1_index = []
        for i, d in enumerate(digits):
            if d % 3 == 1:
                count += 1
                mod1_index.append(i)
                if count == 2:
                    break
        if count == 2:
            del digits[mod1_index[0]]
            del digits[mod1_index[1] - 1]
            output(digits)
        else:
            print(-1)
