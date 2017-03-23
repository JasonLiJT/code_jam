#include <iostream>
#include <cstdlib>

using namespace std;
#define endl '\n'

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    bool cancel = true;
    int n, m, group[10000], occupied[10000] = {0};
    cin >> n >> m;
    int group_members = 0;

    for (int i = 0; i < m && !cancel; ++i) {
        cin >> group[0];
        for (int k = 0; k < group_members; ++k)
        {
            occupied[k] = 0;
        }
        group_members = 0;
        while (cin.get() == ' ') {
            ++group_members;
            cin >> group[group_members];
            ++occupied[abs(group[group_members])];
        }
        for (int j = 0; j < group_members; ++j) {
            if (occupied[abs(group[j])] == 2) {
                cancel = false;
                break;
            }
        }
    }
    if (cancel){
        cout << "YES\n";
    }
    else{
        cout << "NO\n";
    }
}