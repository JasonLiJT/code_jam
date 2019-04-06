def gcd(a, b):
    while b:
        a, b = b, a % b
    return a


T = int(input())

for case in range(1, T + 1):
    N, L = map(int, input().split())
    cipher = list(map(int, input().split()))
    # L >= 25 so gcd always possible
    messagePrime = [0] * (L + 1)
    duplicateEnd = 1  # cipher[:duplicateEnd] are duplicates
    while cipher[duplicateEnd - 1] == cipher[duplicateEnd]:
        # The plain text begins with ABA(BABA...) or AAA(AAA...)
        # Has to find the end of the pattern, i.e. ABA...C or AAA...AAB
        # which must exist since the plian text is a pangram
        duplicateEnd += 1
    messagePrime[duplicateEnd] = gcd(
        cipher[duplicateEnd], cipher[duplicateEnd - 1])
    for i in range(duplicateEnd, 0, -1):
        messagePrime[i - 1] = cipher[i - 1] // messagePrime[i]
    for i in range(duplicateEnd + 1, L + 1):
        messagePrime[i] = cipher[i - 1] // messagePrime[i - 1]
    asciiA = ord('A')
    decipherer = {prime: chr(asciiA + i)
                  for i, prime in enumerate(sorted(list(set(messagePrime))))}
    print('Case #{}: {}'.format(case, ''.join(
        [decipherer[prime] for prime in messagePrime])))
