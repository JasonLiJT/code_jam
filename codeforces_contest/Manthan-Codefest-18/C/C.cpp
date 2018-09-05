#include <iostream>
#include <algorithm>
#include <string>

#define endl '\n'

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    string a, b;

    cin >> n >> a >> b;

    int count = 0;

    for (int i = 0; i < n - 1; ++i) {
        if (a[i] != b[i] && a[i+1] != b[i+1] && a[i] != a[i+1]) {
            swap(a[i], a[i + 1]);
            i++;
            count++;
        }
    }

    for (int i = 0; i < n; ++i) {
        count += (int) (a[i] != b[i]);
    }

    cout << count << endl;

    return 0;
}
