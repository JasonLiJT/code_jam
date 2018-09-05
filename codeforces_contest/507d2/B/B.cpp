#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    cin >> n >> k;
    int longest = 2 * k + 1, shortest = k + 1;

    int l = 0;
    vector<int> vi;

    if (n < shortest) {
        l = 1;
        vi.push_back(1);
    }else if (n % longest >= shortest) {
        // Can do x * longest + 1
        l = n / longest + 1;
        for (int i = 0; i < l - 1; ++i) {
            vi.push_back(k + 1 + i *(2 * k + 1));
        }
        vi.push_back(n - n % longest + 1 + k);
    } else if (n % longest == 0) {
        l = n / longest;
        for (int i = 0; i < l; ++i) {
            vi.push_back(k + 1 + i *(2 * k + 1));
        }
    } else {
        // (k + 1), x * (2k + 1), rest
        vi.push_back(1);
        int x = (n - (k + 1)) / (2 * k + 1), rest = (n - (k + 1)) % (2 * k + 1);
        for (int i = 0; i < x; ++i) {
            vi.push_back(2 * k + 2 + i *(2 * k + 1));
        }
        vi.push_back(n - rest + 1 + k);
        l = 1 + x + 1;
    }
    cout << l << '\n';
    for (int i = 0; i < vi.size() - 1; ++i) {
        cout << vi[i] << " ";
    }
    if (!vi.empty()) {
        cout << *vi.rbegin();
    }
    cout << endl;

    return 0;
}
