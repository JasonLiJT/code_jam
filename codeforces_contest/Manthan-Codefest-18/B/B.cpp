#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, s;
    cin >> n >> s;
    int mid = n / 2;
    vector<int> vi(n);
    for (int i = 0; i < n; ++i) {
        cin >> vi[i];
        vi[i] -= s;
    }

    sort(vi.begin(), vi.end());

    if (vi[mid] == 0) {
        cout << 0 << endl;
        return 0;
    }

    long long ans = 0;
    if (vi[mid] < 0) {
        for (int i = mid; i < n && vi[i] < 0; ++i) {
            ans -= vi[i];
        }
        cout << ans << endl;
        return 0;
    } else {
        for (int i = mid; i >= 0 && vi[i] > 0; --i) {
            ans += vi[i];
        }
        cout << ans << endl;
        return 0;
    }
    // for (int i: vi) {
    //     cout << i << endl;
    // }

    return -1;
}
