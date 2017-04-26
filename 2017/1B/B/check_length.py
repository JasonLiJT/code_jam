with open('B-large-practice.in') as fin:
    n = int(fin.readline())
    with open('large-practice.out') as fout:
        for i in range(n):
            N = int(fin.readline().split()[0])
            outline = fout.readline().split()[-1]
            if outline == 'IMPOSSIBLE':
                continue
            if len(outline) != N:
                print('Line', i + 1, 'error!')
                print('Length:', N)
                print(repr(outline))
