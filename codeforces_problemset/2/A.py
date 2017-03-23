n = int(input())
# 1 <= n <= 1000

players = {}
logs = []
for i in range(n):
    line = input().split(' ')
    name, score = line[0], int(line[1])

    if name in players:
        players[name] += score
    else:
        players[name] = score

    logs.append((name, players[name]))


HIGHSCORE = max(players.values())
CANDIDATES = set([x for x in players if players[x] == HIGHSCORE])

for i in range(n):
    name, score = logs[i]
    if name in CANDIDATES:
        if score >= HIGHSCORE:
            print(name)
            break
