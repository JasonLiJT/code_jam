def get_damage(P):
    strength = 1
    damage = 0
    for c in P:
        if c == 'C':
            strength *= 2
        elif c == 'S':
            damage += strength
        else:
            print('Wrong input!')
            raise ValueError
    return damage


def hack(P, lastCS):
    # Require P to contain 'CS'
    # Swap the last appearance of 'CS'
    # because that S has the highest weight
    return P[:lastCS] + 'SC' + P[lastCS + 2:]


def solve_case():
    min_hacks = 0
    D, P = input().split()
    D = int(D)

    if P.count('S') > D:
        return 'IMPOSSIBLE'
    while get_damage(P) > D:
        lastCS = P.rfind('CS')
        if lastCS == -1:
            # No swap can reduce damage
            return 'IMPOSSIBLE'
        P = hack(P, lastCS)
        min_hacks += 1
    return min_hacks


T = int(input())

for case in range(1, T + 1):
    ans = solve_case()
    print('Case #{}: {}'.format(case, ans))
