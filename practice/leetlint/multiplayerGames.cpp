#include <iostream>
#include <algorithm>
#include <vector>
#include <cassert>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    long long count = 0;
    vector<int> A({666, 2000000, 2000000, 2000001});
    assert(A.size() > 1);
    sort(A.begin(), A.end());
    size_t lastMin = 0;
    int threshould = 0;
    while (true) {
        if (A[lastMin] <= threshould) {
            cout << "Min is now 0:\n\t"
                 << "Someone is satisfied and becomes permanent referee.\n";
            int maxRemained = *max_element(A.begin() + lastMin + 1, A.end()) - threshould;
            cout << "\tMax remained: " << maxRemained << endl;
            count += maxRemained;
            break;
        }
        // Count min values
        while (lastMin + 1 < A.size() && A[lastMin] == A[lastMin + 1]) lastMin++;
        size_t minCount = lastMin + 1;
        cout << "Min: " << A[lastMin] - threshould << " (x " << minCount << ")\n";
        if (minCount < A.size()) cout << "\tSecond smallest: " << A[minCount] - threshould << endl;
        if (minCount == 1) {
            int rounds = A[1] - A[0];
            count += rounds;
            A[0] += rounds;
            threshould += rounds;
            cout << "\t+ " << rounds << " rounds with referee 0\n";
        } else {
            // minCount >= 2
            int m = A[lastMin] - threshould, remainder = m % (minCount - 1);
            if (minCount == A.size()) {
                // All same values
                int sweeps = m / (minCount - 1);
                int rounds1 = sweeps * minCount, rounds2 = ((remainder) ? (remainder + 1) : 0);
                cout << "\tAll " << minCount << " remaining values are " << m
                     << "\n\tAfter " << sweeps << " sweeps, i.e. " << rounds1 << " rounds,\n"
                     << "\tAll will become " << remainder << endl;
                if (rounds2)
                    cout << "\tThen " << rounds2 << " more rounds are required to zero everything\n";
                count += rounds1 + rounds2;
                break;
            } else {
                // Larger values exist
                int diff = A[minCount] - A[lastMin];
                // [m, ..., m, m + diff, ...]
                if (m < minCount - 1) {
                    // After m rounds, the first minCount elements will be
                    // [0] * (minCount - m) + [1] * m
                    // The remaining elements will be decremented by m, but still >= 1
                    // requiring another max(A) - m rounds
                    count += *max_element(A.begin() + minCount, A.end()) - threshould;
                    break;
                } else {
                    // sweeps = Number of traversal of min elements until
                    // the min values are less than minCount - 1, or minCount increases
                    int sweeps = min((int)(m / (minCount - 1)), diff);
                    int rounds = sweeps * minCount;
                    count += rounds;
                    threshould += rounds;

                    // After each sweep, the difference between the smallest and second
                    // smallest values drops by 1
                    A[lastMin] += sweeps;
                    cout << "\t+ " << rounds << " rounds\n";
                }
            }
        }
    }
    cout << endl
         << count << " games are required to make everybody happy!" << endl;
    return 0;
}
