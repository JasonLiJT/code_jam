#include <iostream>

using namespace std;
#define endl '\n'

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    bool cancel = true;
    int n, m, group[10000] = {0};
    bool occupied[20000 + 1] = {false};
    cin >> n >> m;
    int g = 0;

    for (int i = 0; i < m; ++i) {
        cancel = true;
        for (int x = 0; x < 20000 + 1; ++x) {
            occupied[x] = 0;
        }
        g = 0;
        int k;
        cin >> k;
        for (g = 0; g < k; ++g) {
            cin >> group[g];
            occupied[10000 + (group[g])] = true;
        }

        for (int j = 0; j < g; ++j) {
            if (occupied[10000 + (group[j])] && occupied[10000 - (group[j])]) {
                cancel = false;
                break;
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