#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool comp_first (const pair<int, int> & a, const pair<int, int> & b) {
    return a.first < b.first;
}

int main() {
    int T;
    cin >> T;
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        int C, J;
        cin >> C >> J;
        std::vector< pair <int, int> > vc, vj;
        for (int i = 0; i < C; ++i) {
            pair<int, int> tmp;
            cin >> tmp.first >> tmp.second;
            vc.push_back(tmp);
        }
        for (int i = 0; i < J; ++i) {
            pair<int, int> tmp;
            cin >> tmp.first >> tmp.second;
            vj.push_back(tmp);
        }
        sort(vc.begin(), vc.end(), comp_first);
        sort(vj.begin(), vj.end(), comp_first);
        int changes = 0;
        char prev = 'j';
        if (vc.size() + vj.size() == 1) {
            changes += 2;
        } else if (vc.size() + vj.size () == 2) {
            if (vc.size() == 2) {
                if (vc[1].second - vc[0].first <= 12 * 60 || vc[1].first - vc[0].second >= 12*60) {
                    changes += 2;
                } else {
                    changes += 4;
                }
            } else if (vj.size() == 2) {
                if (vj[1].second - vj[0].first <= 12 * 60 || vj[1].first - vj[0].second >= 12*60) {
                    changes += 2;
                } else {
                    changes += 4;
                }
            } else {
                changes += 2;
            }
        }
        // if (vc[0].first < vj[0].first) {
        //     prev = 'c';
        // }
        // while (!vc.empty() || !vj.empty()) {
        //     if (vc.empty()) {
        //         vj.erase(vj.begin());
        //         if (prev == 'c') changes++;
        //         prev = 'j';
        //     } else if (vj.empty()) {
        //         vc.erase(vc.begin());
        //         if (prev == 'j') changes++;
        //         prev = 'c';
        //     } else {
        //         if (vc[0].first <= vj[0].first) {
        //             vc.erase(vc.begin());
        //             if (prev == 'j') changes++;
        //             prev = 'c';
        //         } else {
        //             vj.erase(vj.begin());
        //             if (prev == 'c') changes++;
        //             prev = 'j';
        //         }
        //     }
        // }
        cout << "Case #" << test_case << ": " << changes << endl;
        
    }
}