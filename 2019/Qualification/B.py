T = int(input())

for case in range(1, T + 1):
    input()  # N is useless
    path = ''.join(['E' if step == 'S' else 'S' for step in input()])
    print('Case #{}: {}'.format(case, path))
