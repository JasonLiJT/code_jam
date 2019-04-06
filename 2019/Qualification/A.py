T = int(input())

for case in range(1, T + 1):
    N = input()
    first4 = N.index('4')
    A = ''.join([d if d != '4' else '2' for d in N])
    B = ''.join(['2' if d == '4' else '0' for d in N[first4:]])
    print('Case #{}: {} {}'.format(case, A, B))
