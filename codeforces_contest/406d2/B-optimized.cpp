#include <iostream>
#include <cstdlib>

using namespace std;
#define endl '\n'

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    bool cancel = true;
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < m; ++i) {
        cancel = true;
        // int group[10000] = {0};
        bool occupied[20000 + 1] = {false};
        int k;
        cin >> k;
        for (int g = 0; g < k; ++g) {
            int tmp;
            cin >> tmp;
            // group[g] = tmp;
            occupied[10000 + tmp] = true;
            if (occupied[10000 + tmp] && occupied[10000 - tmp]) {
                cancel = false;
            }
        }
        if (cancel) break;
    }
    if (cancel){
        cout << "YES\n";
    }
    else{
        cout << "NO\n";
    }
}