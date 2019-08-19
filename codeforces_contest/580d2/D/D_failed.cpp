#include <iostream>
#include <algorithm>
#include <climits>
#include <vector>
#include <queue>
#include <tuple>
#include <unordered_map>
#include <unordered_set>

#define endl '\n'

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<long long> a(n);
    for (long long& x : a) {
        cin >> x;
    }
    // log2(1e5) = 16.6
    vector<unordered_set<int>> adjList(17);
    for (long long x : a) {
        vector<int> bitsSet;
        for (int bits = 0; bits < 17; ++bits) {
            long long mask = 1LL;
            mask <<= bits;
            if (mask & x) {
                bitsSet.push_back(bits);
            }
        }
        for (size_t i = 0; i < bitsSet.size(); ++i) {
            for (size_t j = i + 1; j < bitsSet.size(); ++j) {
                int a = bitsSet[i], b = bitsSet[j];
                adjList[a].insert(b);
                adjList[b].insert(a);
            }
        }
    }

    int shortestCycle = INT_MAX;
    /********************
     * Failed - shortest cycle length cannot be found by BFS or DFS:
     * https://stackoverflow.com/questions/20847463/finding-length-of-shortest-cycle-in-undirected-graph
     * Pair-wise brute force: https://codeforces.com/blog/entry/69158
    *********************/
    unordered_map<int, int> visitedAtDepth;
    for (int i = 0; i < 17; ++i) {
        if (visitedAtDepth.count(i)) continue;
        int depth = 0;
        queue<pair<int, int>> q;  // node, depthIncrement
        q.emplace(i, 1);
        while (!q.empty()) {
            int current, depthIncrement;
            tie(current, depthIncrement) = q.front();
            q.pop();
            auto search = visitedAtDepth.find(current);
            if (search != visitedAtDepth.end()) {
                int cycleLen = depth - search->second;
                if (cycleLen > 2) {
                    shortestCycle = min(shortestCycle, cycleLen);
                }
            } else {
                visitedAtDepth[current] = depth;
                for (int j : adjList[current]) {
                    q.emplace(j, 0);
                }
            }
            if (depthIncrement) {
                depth += depthIncrement;
                q.back().second = depthIncrement;
            }
        }
    }

    cout << (shortestCycle == INT_MAX ? -1 : shortestCycle) << endl;

    return 0;
}
