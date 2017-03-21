C = int(input())


class Customer(object):
    """docstring for Customer"""

    def __init__(self, customer_data, customer_id):
        self.T = customer_data[0]
        self.customer_id = customer_id
        self.preferences = []
        for i in range(self.T):
            index, malted = customer_data[1 + 2 * i] - 1, customer_data[1 + 2 * i + 1]
            self.preferences.append((index, malted))

    def is_satisfied_and_Index(self, flavors):
        satisfied = False
        malted_index = -1
        for item in self.preferences:
            index, malted = item
            if flavors[index] == malted:
                satisfied = True
            if malted == 1:
                malted_index = index
        return satisfied, malted_index

    def is_possible(self, case, flavors):
        satisfied, malted_index = self.is_satisfied_and_Index(flavors)
        if not satisfied:
            # 3 situations
            # 1. only one malted preference: have to malt that one in flavours
            # 2. one malted and some unmalted preferences: have to malt the one
            # in flavours
            # 3. all unmalted preferences: impossible
            if malted_index == -1:  # situation 3
                # print('Impossible customer id:', self.customer_id)
                return False
            else:  # situation 1 and 2
                flavors[malted_index] = 1
        return True


def do_case(case, n, customers):
    # print('Now doing case', case)
    flavors = [0] * n
    possible = True
    while possible:
        # print('in the while loop')
        unsatisfied_customors = [
            customer for customer in customers if not customer.is_satisfied_and_Index(flavors)[0]]
        if not unsatisfied_customors:  # if the list is empty, then all satisfied
            break
        for customer in unsatisfied_customors:
            if not customer.is_possible(case, flavors):
                # print('false customor:', customer.customer_id)
                possible = False
                break
    # print('out the while loop, possible =', possible)
    if possible:
        print('Case #{}:'.format(case), *flavors)
    else:
        print('Case #{}:'.format(case), 'IMPOSSIBLE')


for case in range(1, C + 1):
    # One line containing the integer N, the number of milkshake flavors.
    n = int(input())

    # One line containing the integer M, the number of customers.
    M = int(input())

    customers = []

    for i in range(M):
        customers.append(Customer([int(x) for x in input().split(' ')], i))
        # index ranges from 1 to n

    do_case(case, n, customers)
