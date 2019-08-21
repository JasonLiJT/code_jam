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
    // log2(1e18) = 59.79
    vector<unordered_set<int>> adjList(60);
    for (long long x : a) {
        vector<int> bitsSet;
        for (int bits = 0; bits < 60; ++bits) {
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
     * Failed - two mistakes.
     * Mistake 1: shortest cycle length cannot be found by a single BFS or DFS:
     * https://stackoverflow.com/questions/20847463/finding-length-of-shortest-cycle-in-undirected-graph
     * Pair-wise brute force: https://codeforces.com/blog/entry/69158
     * Mistake 2: wrong problem abstraction. Each bit cannot be abstracted as a node.
     * Counter-example: 0b111 along will make three interconnected nodes.
     ********************/
    unordered_map<int, int> visitedAtDepth;
    for (int i = 0; i < 60; ++i) {
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
