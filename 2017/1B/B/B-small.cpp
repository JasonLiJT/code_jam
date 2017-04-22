#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

bool comp_first(const pair<int, string>& a, const pair<int, string>& b) {
    return a.first < b.first;
}

int main() {
    int T;
    cin >> T;
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        int N, R, O, Y, G, B, V;
        cin >> N >> R >> O >> Y >> G >> B >> V;
        // Small: O = G = V = 0
        // solve R, Y, B
        // Sort into C[0] <= C[1] <= C[2], Si = identifier
        pair<int, string> C[3];
        C[0].first = R; C[0].second = "R";
        C[1].first = Y; C[1].second = "Y";
        C[2].first = B; C[2].second = "B";
        sort(begin(C), end(C), comp_first);

        if (C[0].first + C[1].first < C[2].first) {
            cout << "Case #" << test_case << ": " << "IMPOSSIBLE" << endl;
        } else {
            string ans = "";
            if (C[0].first + C[1].first > C[2].first) {
                int cut = C[0].first + C[1].first - C[2].first;
                for (int i = 0; i < cut; ++i) {
                    ans += C[2].second + C[1].second + C[0].second;
                }
                C[1].first -= cut;
                C[0].first -= cut;
            }
            for (int i = 0; i < C[1].first; ++i) {
                ans += C[2].second + C[1].second;
            }
            for (int i = 0; i < C[0].first; ++i) {
                ans += C[2].second + C[0].second;
            }
            cout << "Case #" << test_case << ": " << ans << endl;
        }

        
    }
}