T = int(input())


def get_eq_sum(bit_count_list):
    return sum((1 << bit) * n for bit, n in enumerate(bit_count_list))


for t in range(1, T + 1):
    N, M = map(int, input().split())
    A = list(map(int, input().split()))

    # How many bits are sets for each bit of sum(Ai)
    bit_count = {0: 0}  # Avoid empty dict.keys()
    for Ai in A:
        for bit_pos, bit in enumerate(bin(Ai)[:1:-1]):
            if bit != '1':
                continue
            if bit_pos not in bit_count:
                bit_count[bit_pos] = 1
            else:
                bit_count[bit_pos] += 1

    bit_count_list = [0] * max(max(bit_count.keys()) + 1, len(bin(M)) - 2)
    for bit, n in bit_count.items():
        bit_count_list[bit] = n

    k = 0
    diffs = [0] * len(bit_count_list)  # Difference of sum if bit i is flipped
    # Greedily flip the bits to reduce the sum
    for bit in range(len(bit_count_list) - 1, -1, -1):
        n = bit_count_list[bit]
        diffs[bit] = (-n + N - n) * (1 << bit)

    for bit in range(len(bit_count_list) - 1, -1, -1):
        n = bit_count_list[bit]
        if n >= N - n or (get_eq_sum(bit_count_list) + diffs[bit] + sum(map(lambda x: min(x, 0), diffs[:bit]))) <= M:
            # Setting current bit of k
            k |= 1 << bit
            bit_count_list[bit] = N - n

    if get_eq_sum(bit_count_list) > M:
        k = -1

    print('Case #{}: {}'.format(t, k))
