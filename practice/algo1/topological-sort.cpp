#include <iostream>
#include <algorithm>
#include <vector>
#include <map>
#include <queue>
#include <functional>

using namespace std;

vector<int> topologicalSortBFS(const map<int, vector<int>>& adj) {
    // Easy to verify DAG and get the topological sort at the same time; no recursion
    vector<int> ans;
    queue<int> nextVertices;
    map<int, int> incomingEdgeCount;

    // Count incoming edges for each node
    for (const auto& p : adj) {
        int vertex = p.first;
        const vector<int>& outgoingEdges = p.second;
        if (!incomingEdgeCount.count(vertex)) {
            incomingEdgeCount[vertex] = 0;
        }
        for (int to : outgoingEdges) {
            incomingEdgeCount[to]++;
        }
    }

    // Push source nodes to the queue
    for (const auto& p : incomingEdgeCount) {
        if (p.second == 0) {
            nextVertices.push(p.first);
        }
    }

    while (!nextVertices.empty()) {
        ans.push_back(nextVertices.front());
        nextVertices.pop();
        for (int vertex : adj.at(ans.back())) {
            incomingEdgeCount[vertex]--;
            if (incomingEdgeCount[vertex] == 0) {
                nextVertices.push(vertex);
            }
        }
    }

    if (ans.size() == adj.size()) {
        return ans;
    }
    return vector<int>();
}

vector<int> topologicalSortDFS(const map<int, vector<int>>& adj) {
    // Difficult to verify DAG, need extra bookkeeping to detect cycles (e.g. bool inPath[]); can't avoid recursion
    if (adj.empty()) {
        return vector<int>();
    }
    vector<int> ans(adj.size());
    map<int, bool> explored;
    for (const auto& p : adj) {
        explored[p.first] = false;
    }
    int order = adj.size() - 1;

    function<void(int)> DFS = [&](int current) {
        explored[current] = true;
        for (int vertex : adj.at(current)) {
            if (!explored[vertex]) {
                DFS(vertex);
            }
        }
        ans[order--] = current;
    };

    for (const auto& p : adj) {
        if (!explored[p.first]) {
            DFS(p.first);
        }
    }

    return ans;
}

int main() {
    map<int, vector<int>> adj;
    adj[0] = vector<int>({1, 2, 3});
    adj[1] = vector<int>({5});
    adj[2] = vector<int>({6});
    adj[3] = vector<int>({4});
    adj[4] = vector<int>();
    adj[5] = vector<int>({3});
    adj[6] = vector<int>();

    // No loop
    for (const auto& p : adj) {
        cout << p.first << ": ";
        for (int i : p.second) {
            cout << i << " ";
        }
        cout << endl;
    }

    cout << "BFS topological sort: ";
    for (int i : topologicalSortBFS(adj)) {
        cout << i << " ";
    }
    cout << endl;

    cout << "DFS topological sort: ";
    for (int i : topologicalSortDFS(adj)) {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}
