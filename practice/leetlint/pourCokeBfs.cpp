#include <iostream>
#include <algorithm>
#include <unordered_set>
#include <tuple>
#include <queue>

using namespace std;

class Solution {
    int encode(int s, int n, int m) {
        return s * 10000 + n * 100 + m;
    }
public:
    /**
     * @param s: the volume of cola
     * @param n: the volume of the first cup
     * @param m: the volume of the second cup
     * @return: the minimum number of times to be inverted
     */
    int getMinTimes(int s, int n, int m) {
        if (s&1) return -1;
        int half = s / 2;
        // if (n == half) return 1;
        if (n > m) swap(n, m);
        // if (n <= 0) return -1;
        // // Now n < m
        // // Bottle holds n, cup n holds 0, cup m holds m
        // // In the end, the bottle and cup m must hold half
        // int diffm = m - half;  // > 0
        // if (diffm % n == 0) return 1 + 2 * diffm / n;
        
        queue<tuple<int, int, int>> bfsQ;
        unordered_set<int> enqued;
        bfsQ.emplace(s, 0, 0);
        enqued.insert(encode(s, 0, 0));
        int volumes[3] = {s, n, m};
        int depth = 0;
        while (!bfsQ.empty()) {
            size_t levelSize = bfsQ.size();
            while (levelSize--) {
                int cups[3];
                tie(cups[0], cups[1], cups[2]) = bfsQ.front();
                bfsQ.pop();
                if (cups[0] == half && cups[2] == half) return depth;

                for (size_t target = 0; target < 3; ++target) {
                    if (cups[target] < volumes[target]) {  // Pour into cup target
                        int gap = volumes[target] - cups[target];
                        for (size_t source = 0; source < 3; ++source) {
                            if (source != target && cups[source] > 0) {  // Cup source -> target
                                int vol = min(cups[source], gap);
                                int newVol[3];
                                newVol[target] = cups[target] + vol;
                                newVol[source] = cups[source] - vol;
                                for (size_t j = 0; j < 3; ++j) {
                                    if (j != source && j != target) {
                                        newVol[j] = cups[j];
                                    }
                                }
                                int code = encode(newVol[0], newVol[1], newVol[2]);
                                if (!enqued.count(code)) {
                                    bfsQ.emplace(newVol[0], newVol[1], newVol[2]);
                                    enqued.insert(code);
                                }
                            }
                        }
                    }
                }
            }
            depth++;
        }
        return -1;
    }
};


int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    Solution sol;
    cout << sol.getMinTimes(10, 7, 3) << endl;

    return 0;
}
