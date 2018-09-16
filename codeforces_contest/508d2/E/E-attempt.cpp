#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<int> edges[6] = {};
    int nodes[4] = {};
    for (int i = 0; i < n; ++i) {
        int color1, color2, value;
        cin >> color1 >> value >> color2;
        if (color1 == color2) {
            nodes[color1 - 1] += value;
        } else if ((color1 == 1 && color2 == 2) || (color2 == 1 && color1 == 2)) {
            edges[0].push_back(value);
        } else if ((color1 == 2 && color2 == 4) || (color2 == 2 && color1 == 4)) {
            edges[1].push_back(value);
        } else if ((color1 == 3 && color2 == 4) || (color2 == 3 && color1 == 4)) {
            edges[2].push_back(value);
        } else if ((color1 == 1 && color2 == 3) || (color2 == 1 && color1 == 3)) {
            edges[3].push_back(value);
        } else if ((color1 == 1 && color2 == 4) || (color2 == 1 && color1 == 4)) {
            edges[4].push_back(value);
        } else if ((color1 == 2 && color2 == 3) || (color2 == 2 && color1 == 3)) {
            edges[5].push_back(value);
        } else {
            cout << "Input colors not within [1, 4]!" << endl;
            exit(1);
        }
    }

    for (int i = 0; i < 6; ++i) {
        if (!edges[i].empty()) {
            if (edges[i].size() > 1) {
                /* code */
            }
        }
    }

    return 0;
}
