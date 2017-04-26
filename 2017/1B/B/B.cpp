#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

struct unicorns
{
    int num;
    string color;
    string first_group;
    unicorns() {
        num = 0;
        color = "";
        first_group = "";
    }
};

bool comp_num(const unicorns& a, const unicorns& b) {
    return a.num < b.num;
}

int main() {
    int T;
    cin >> T;
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        int N, R, O, Y, G, B, V;
        cin >> N >> R >> O >> Y >> G >> B >> V;

        cout << "Case #" << test_case << ": ";

        // transform the problem to Small: O = G = V = 0
        // Sort into C[0] <= C[1] <= C[2], Si = identifier
        unicorns C[3];

        if (O>0) {
            if (B == 0) {
                cout << "IMPOSSIBLE" << endl;
                continue;
            }
            if (N==O+B) {
                // only Orange and Blue
                if (O == B) {
                    C[1].num = O; C[1].color = "O";
                    C[2].num = B; C[2].color = "B";
                    // Control flow goes to output
                } else {
                    cout << "IMPOSSIBLE" << endl;
                    continue;
                }
            } else if (B > O) {
                // With other colors
                for (int i = 0; i < O; ++i)
                    C[0].first_group += "BO";
                C[0].first_group += "B";
                B -= O;
                O = 0;
                C[0].num = B; C[0].color = "B";

            } else {
                cout << "IMPOSSIBLE" << endl;
                continue;
            }
        }
        if (G>0) {
            if (R == 0) {
                cout << "IMPOSSIBLE" << endl;
                continue;
            }
            if (N==G+R) {
                // only Green and Red
                if (G == R) {
                    C[1].num = G; C[1].color = "G";
                    C[2].num = R; C[2].color = "R";
                    // Control flow goes to output
                } else {
                    cout << "IMPOSSIBLE" << endl;
                    continue;
                }
            } else if (R > G) {
                // With other colors
                for (int i = 0; i < G; ++i)
                    C[1].first_group += "RG";
                C[1].first_group += "R";
                R -= G;
                G = 0;
                C[1].num = R; C[1].color = "R";
            } else {
                cout << "IMPOSSIBLE" << endl;
                continue;
            }
        }
        if (V>0) {
            if (Y == 0) {
                cout << "IMPOSSIBLE" << endl;
                continue;
            }
            if (N==V+Y) {
                // only Violet and Yellow
                if (V == Y) {
                    C[1].num = V; C[1].color = "V";
                    C[2].num = Y; C[2].color = "Y";
                    // Control flow goes to output
                } else {
                    cout << "IMPOSSIBLE" << endl;
                    continue;
                }
            } else if (Y > V) {
                // With other colors
                for (int i = 0; i < V; ++i)
                    C[2].first_group += "YV";
                C[2].first_group += "Y";
                Y -= V;
                V = 0;
                C[2].num = Y; C[2].color = "Y";
            } else {
                cout << "IMPOSSIBLE" << endl;
                continue;
            }
        }

        // Small
        if (O == 0 && G == 0 && V == 0) {
            if (C[0].num == 0) {C[0].num = B; C[0].color = "B";}
            if (C[1].num == 0) {C[1].num = R; C[1].color = "R";}
            if (C[2].num == 0) {C[2].num = Y; C[2].color = "Y";}
        }

        // Other situations
        if (C[0].color.empty() && C[1].color.empty() && C[2].color.empty()
            && C[0].first_group.empty() && C[1].first_group.empty() && C[2].first_group.empty()) {
            cout << "IMPOSSIBLE" << endl;
            continue;
        }

        // Copy color to first_group if empty
        for (int i = 0; i < 3; ++i) {
            if (C[i].first_group.empty()) {
                C[i].first_group = C[i].color;
            }
        }

        sort(begin(C), end(C), comp_num);
        for (int i = 0; i < 3; ++i) {
            clog << C[i].num << "\t" << C[i].color << "\t" << C[i].first_group << endl;
        }

        string ans = "";
        if (C[0].num + C[1].num < C[2].num) {
            ans = "IMPOSSIBLE";
        } else {
            if (C[0].num + C[1].num > C[2].num) {
                int cut = C[0].num + C[1].num - C[2].num;
                for (int i = 0; i < cut; ++i) {
                    if (i == 0) {
                        ans += C[2].first_group + C[1].first_group + C[0].first_group;
                        for (int x = 0; x < 3; ++x) 
                            C[x].first_group = C[x].color;
                    } else {
                        ans += C[2].color + C[1].color + C[0].color;
                    }
                }
                C[2].num -= cut;
                C[1].num -= cut;
                C[0].num -= cut;
            }
            for (int i = 0; i < C[1].num; ++i) {
                if (i == 0) {
                    ans += C[2].first_group + C[1].first_group;
                    C[2].first_group = C[2].color;
                    C[1].first_group = C[1].color;
                } else {
                    ans += C[2].color + C[1].color;
                }
            }
            for (int i = 0; i < C[0].num; ++i) {
                if (i == 0) {
                    ans += C[2].first_group + C[0].first_group;
                    C[2].first_group = C[2].color;
                    C[0].first_group = C[0].color;
                } else {
                    ans += C[2].color + C[0].color;
                }
            }
        }
        cout << ans << endl;
        
    }
}