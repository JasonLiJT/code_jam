n = int(input())

d = {
    'a': '2',
    'b': '22',
    'c': '222',
    'd': '3',
    'e': '33',
    'f': '333',
    'g': '4',
    'h': '44',
    'i': '444',
    'j': '5',
    'k': '55',
    'l': '555',
    'm': '6',
    'n': '66',
    'o': '666',
    'p': '7',
    'q': '77',
    'r': '777',
    's': '7777',
    't': '8',
    'u': '88',
    'v': '888',
    'w': '9',
    'x': '99',
    'y': '999',
    'z': '9999',
    ' ': '0'
}


for cases in range(1, n + 1):
    # L = [s for s in input().split(' ')]

    message = input()
    if message == '':
        continue
    keypress = ''
    previous = ''
    for c in message:
        if previous != '':
            if d[previous][0] == d[c][0]:
                keypress += ' '
        keypress += d[c]
        previous = c

    print('Case #{}:'.format(cases), keypress)
