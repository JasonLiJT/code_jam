#include <iostream>
#include <algorithm>
#include <climits>
#include <vector>
#include <queue>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <functional>
#include <stdexcept>

#define endl '\n'

using namespace std;

typedef pair<int, int> pii;

int dijkstra(const vector<unordered_set<int>>& adjList, int i, int j) {
    unordered_set<int> enqued;
    priority_queue<pii, vector<pii>, greater<pii>> pq;  // Distance, node
    vector<int> dist(adjList.size(), INT_MAX - 1);      // -1 to prevent overflow
    dist[i] = 0;
    pq.emplace(0, i);
    enqued.insert(i);

    while (!pq.empty()) {
        int node = pq.top().second;
        pq.pop();
        for (int neighbour : adjList[node]) {
            if (enqued.count(neighbour) || dist[node] + 1 >= dist[neighbour]) {
                continue;
            }
            dist[neighbour] = dist[node] + 1;
            enqued.insert(neighbour);
            pq.emplace(dist[neighbour], neighbour);
        }
    }

    return dist[j];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    vector<long long> a;
    // log2(1e18) = 59.79
    int bitCount[60] = {0};
    for (int i = 0; i < n; ++i) {
        long long x;
        cin >> x;
        // Zeros must be filtered out, or the complexity may blow up
        if (x == 0) continue;
        a.push_back(x);
        long long mask = 1;
        for (int i = 0; i < 60; i++) {
            if (x & (mask << i)) {
                bitCount[i]++;
            }
        }
    }
    for (int i = 0; i < 60; i++) {
        if (bitCount[i] >= 3) {
            cout << 3 << endl;
            return 0;
        }
    }
    n = a.size();  // Non-zero inputs
    if (n > 60 * 2) {
        // If there are no three numbers setting any particular bit,
        // then each bit has at most two numbers setting it.
        throw std::range_error("Input must have exceeded 1E18!\n");
    }

    // Build adjacency list. Time and space complexity: time O(n^2)
    // Use indices as nodes, not the values, because there may be duplicates
    vector<unordered_set<int>> adjList(n);
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (!(a[i] & a[j])) continue;
            adjList[i].insert(j);
            adjList[j].insert(i);
        }
    }

    int shortestCycle = INT_MAX;
    // Method 1: Delete an edge and Dijkstra its vertices
    // for (int i = 0; i < n; i++) {
    //     for (int j = i + 1; j < n; j++) {
    //         if (!adjList[i].count(j)) continue;
    //         adjList[i].erase(j);
    //         adjList[j].erase(i);

    //         shortestCycle = min(shortestCycle, 1 + dijkstra(adjList, i, j));

    //         adjList[i].insert(j);
    //         adjList[j].insert(i);
    //     }
    // }

    // Method 2: proper BFS from each node, keeping track of depth and parents
    // https://webcourse.cs.technion.ac.il/234247/Winter2003-2004/ho/WCFiles/Girth.pdf
    for (int i = 0; i < n; ++i) {
        unordered_set<int> visited;
        vector<int> dist(n);
        queue<pii> q;  // node, parent
        q.emplace(i, i);
        visited.insert(i);
        while (!q.empty()) {
            auto [node, parent] = q.front();  // C++17
            q.pop();
            for (int neighbour : adjList[node]) {
                if (neighbour == parent) continue;
                if (visited.count(neighbour)) {
                    int cycle = dist[node] + dist[neighbour] + 1;
                    shortestCycle = min(shortestCycle, cycle);
                } else {
                    dist[neighbour] = dist[node] + 1;
                    q.emplace(neighbour, node);
                    visited.insert(neighbour);
                }
            }
        }
    }

    cout << (shortestCycle == INT_MAX ? -1 : shortestCycle) << endl;

    return 0;
}
