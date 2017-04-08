from random import randint
T = 1
L = 1000
print(T)
for i in range(T):
    s = ''
    # length = randint(2, L)
    length = L
    for j in range(length):
        s += '+' if randint(0, 1) == 1 else '-'
    print(s, randint(2, length))
