#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, ab[2];
    cin >> n >> ab[0] >> ab[1];
    int smaller = min(ab[0], ab[1]);

    vector<int> vi(n);
    for (int i = 0; i < n; ++i) {
        cin >> vi[i];
    }

    int cost = 0;
    for (int i = 0; i < n / 2; ++i) {
        if (vi[i] != vi[n - 1 - i]) {
            if (vi[i] != 2 && vi[n - 1 - i] != 2) {
                cout << -1 << endl;
                return 0;
            }
            if (vi[i] == 2) {
                cost += ab[vi[n - i - 1]];
                continue;
            }
            cost += ab[vi[i]];
            continue;
        }
        if (vi[i] == 2) {
            cost += 2 * smaller;
            continue;
        }
    }
    if ((n & 1) && vi[n / 2] == 2) { // odd
        cost += smaller;
    }
    cout << cost << endl;

    return 0;
}
