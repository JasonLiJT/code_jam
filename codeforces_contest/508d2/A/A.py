n, k = map(int, input().split())
s = input()
freq = [0] * k

for c in s:
    freq[ord(c) - ord('A')] += 1

print(min(freq) * k)
