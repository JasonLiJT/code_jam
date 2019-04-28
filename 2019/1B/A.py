T = int(input())

for case in range(1, T + 1):
    P, Q = map(int, input().split())
    half_planes = {'N': {}, 'S': {}, 'E': {}, 'W': {}}
    # (Direction, {cooridnate: multiplicity}). E.g. ('E', {3: 1, 10: 2]}) means
    # one x > 3 half plane and two x > 10 half planes

    for i in range(P):
        Xi, Yi, Di = input().split()
        border = int(Xi) if Di == 'E' or Di == 'W' else int(Yi)
        half_planes[Di][border] = half_planes[Di].get(border, 0) + 1

    NS_grid = {coordinate + 1: multiplicity
               for coordinate, multiplicity in half_planes['N'].items()}
    for coordinate, multiplicity in half_planes['S'].items():
        NS_grid[coordinate] = NS_grid.get(coordinate, 0) - multiplicity
    NS_grid = [(coordinate, multiplicity)
               for coordinate, multiplicity in NS_grid.items()]

    WE_grid = {coordinate + 1: multiplicity
               for coordinate, multiplicity in half_planes['E'].items()}
    for coordinate, multiplicity in half_planes['W'].items():
        WE_grid[coordinate] = WE_grid.get(coordinate, 0) - multiplicity
    WE_grid = [(coordinate, multiplicity)
               for coordinate, multiplicity in WE_grid.items()]
    # WE_grid = []
    # WE_grid.extend([(coordinate + 1, multiplicity)
    #                 for coordinate, multiplicity in half_planes['E'].items()])
    # WE_grid.extend([(coordinate, -multiplicity)
    #                 for coordinate, multiplicity in half_planes['W'].items()])
    NS_grid.sort()
    WE_grid.sort()

    if not WE_grid or WE_grid[0][0] != 0:
        WE_grid.insert(0, [0, 0])
    if not NS_grid or NS_grid[0][0] != 0:
        NS_grid.insert(0, [0, 0])

    best_coordinate = [0, 0]
    best_multiplicity = 0

    x_multiplicity = 0
    for x in range(len(WE_grid)):
        x_multiplicity += WE_grid[x][1]
        y_multiplicity = x_multiplicity
        for y in range(len(NS_grid)):
            y_multiplicity += NS_grid[y][1]
            if y_multiplicity > best_multiplicity:
                best_multiplicity = y_multiplicity
                best_coordinate = [WE_grid[x][0], NS_grid[y][0]]

    # print('Case #{}: {} {} {}'.format(case, WE_grid, NS_grid, best_coordinate))
    print('Case #{}: {} {}'.format(case, *best_coordinate))
