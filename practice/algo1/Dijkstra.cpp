#include <iostream>
#include <string>
#include <sstream>
#include <algorithm>
#include <vector>
#include <queue>
#include <functional>
#include <cassert>

#define endl '\n'
using namespace std;

typedef pair<int, int> pii;
constexpr int INF = 1000000;  // Specified by the problem

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    vector<vector<pii>> adjList;  // 1-based
    adjList.emplace_back();       // Index 0 is dummy
    for (string line; getline(cin, line);) {
        adjList.emplace_back();
        stringstream ss(line);
        int start, end, weight;
        ss >> start;
        assert(start == adjList.size() - 1);
        while (ss >> end) {
            ss.get();  // Skip comma
            ss >> weight;
            adjList[start].emplace_back(end, weight);
        }
    }

    vector<int> distances(adjList.size(), INF);
    vector<int> visited(adjList.size());
    priority_queue<pii, vector<pii>, greater<pii>> minPQ;
    minPQ.emplace(0, 1);  // Distance 0, node 1
    while (!minPQ.empty()) {
        int currentDist = minPQ.top().first, currentNode = minPQ.top().second;
        minPQ.pop();
        if (visited[currentNode]) {
            continue;
        }
        visited[currentNode] = 1;
        distances[currentNode] = currentDist;
        for (const pii& p : adjList[currentNode]) {
            int nextNode = p.first, edgeWeight = p.second;
            if (visited[nextNode]) {
                continue;
            }
            int nextDist = currentDist + edgeWeight;
            if (distances[nextNode] > nextDist) {
                // Push the shorter nextDist to the min heap.
                // Even if distances[nextNode] != INF,
                // i.e. distances[nextNode] is already in the min heap,
                // nextDist will be extracted first with nextNode marked visited,
                // effectively deleting / updating the previous distance
                minPQ.emplace(nextDist, nextNode);
            }
        }
    }

    cout << "Shortest path distances:\n";
    for (size_t i = 1; i < distances.size(); ++i) {
        cout << i << ": " << distances[i] << endl;
    }
    cout << endl;

    constexpr int targets[10] = {7, 37, 59, 82, 99, 115, 133, 165, 188, 197};
    cout << "Answer:\n";
    cout << distances[targets[0]];
    for (size_t i = 1; i < 10; ++i) {
        cout << "," << distances[targets[i]];
    }
    cout << endl;

    return 0;
}
