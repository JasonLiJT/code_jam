#include <iostream>
#include <algorithm>
#include <vector>
#include <unordered_set>
#include <deque>

#define endl '\n'

using namespace std;


int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;

    vector< unordered_set<int> > adjList(n + 1); // 1 to n, 1 based, 0 unused
    for (int i = 0; i < n - 1; ++i) {
        int a, b;
        cin >> a >> b;
        adjList[a].insert(b);
        adjList[b].insert(a);
    }
    vector<int> bfsSequence(n);
    for (int i = 0; i < n; ++i) {
        cin >> bfsSequence[i];
    }

    // BFS test run
    if (bfsSequence[0] != 1) {
        cout << "NO" << endl;
        return 0;
    }
    deque<int> q;
    unordered_set<int> used;

    q.push_back(bfsSequence[0]);
    used.insert(bfsSequence[0]);

    for (int i = 1; i < n; ) {
        int current = q.front();
        q.pop_front();
        int unUsedNeighbours = 0;
        for (int a: adjList[current]) {
            unUsedNeighbours += (int)!(bool)(used.count(a));
        }
        for (int j = 0; j < unUsedNeighbours; ++j) {
            if (used.count(bfsSequence[i + j]) || !adjList[current].count(bfsSequence[i + j])) {
                cout << "NO" << endl;
                return 0;
            }
            q.push_back(bfsSequence[i + j]);
            used.insert(bfsSequence[i + j]);
        }
        i += unUsedNeighbours;
    }
    cout << "YES" << endl;
}
