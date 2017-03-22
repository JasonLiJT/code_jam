n = int(input())
DEBUG = False


def letterTOnum(s):
    ans = 0
    for ch in s:
        ans *= 26
        ans += ord(ch) - ord('A') + 1
    return ans


def numTOletter(n):
    n = int(n)
    ans = ''

    while n > 0:
        ch = chr((n - 1) % 26 + ord('A'))
        ans += ch
        n = n // 26 - (1 if n % 26 == 0 else 0)
    return ans[::-1]


for i in range(n):
    line = input()
    a, b, c, d = '', '', '', ''
    state = 1
    is_RXCY = False
    for ch in line:
        if state % 2 == 1 and ch.isalpha():
            # from letter to next letter
            if state == 1:
                a += ch
            else:
                c += ch
        elif state % 2 == 1:
            # from letter to digit
            if state == 1:
                b += ch
            else:
                d += ch
            state += 1
        elif ch.isalpha():
            # from digit to letter
            is_RXCY = True
            c += ch
            state += 1
        else:
            # from digit to digit
            if state == 2:
                b += ch
            else:
                d += ch

    if is_RXCY:
        if DEBUG:
            print('is_RXCY:')
            print('R{}C{}'.format(b, d))
        print('{}{}'.format(numTOletter(d), b))
    else:
        if DEBUG:
            print("It's excel format")
            print(a, b)
        print('R{}C{}'.format(b, letterTOnum(a)))
