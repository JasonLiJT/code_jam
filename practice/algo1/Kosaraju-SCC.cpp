#include <iostream>
#include <algorithm>
#include <vector>
#include <stack>
#include <functional>
#include <cassert>

#define endl '\n'
using namespace std;

class KosarajuAlgorithm {
   private:
    // static constexpr size_t MAX_VERTEX_INDEX = 12;  // small test case
    static constexpr size_t MAX_VERTEX_INDEX = 875714;
    vector<vector<int>> graph, graphTransposed;  // 1-based
    vector<int> orderOfSecondPassDfs;
    vector<int> sccSizes;

    void dfsFirstPass() {
        orderOfSecondPassDfs.resize(MAX_VERTEX_INDEX);
        size_t reverseInserter = MAX_VERTEX_INDEX;
        vector<bool> visited(MAX_VERTEX_INDEX + 1), stacked(MAX_VERTEX_INDEX + 1);
        for (size_t v = 1; v <= MAX_VERTEX_INDEX; ++v) {
            if (stacked[v]) continue;
            dfsFirstPassIterative(v, visited, stacked, reverseInserter);
        }
        assert(reverseInserter == 0);
    }

    void dfsFirstPassIterative(int v, vector<bool>& visited, vector<bool>& stacked, size_t& reverseInserter) {
        stack<int> dfsStack;
        dfsStack.push(v);
        stacked[v] = true;
        while (!dfsStack.empty()) {
            int current = dfsStack.top();
            if (visited[current]) {
                dfsStack.pop();
                orderOfSecondPassDfs[--reverseInserter] = current;
                continue;
            }
            visited[current] = true;
            for (int next : graphTransposed[current]) {
                if (stacked[next]) continue;
                stacked[next] = true;
                dfsStack.push(next);
            }
        }
    }

    void dfsSecondPass() {
        sccSizes.clear();
        vector<bool> stacked(MAX_VERTEX_INDEX + 1);
        for (int v : orderOfSecondPassDfs) {
            if (stacked[v]) continue;
            sccSizes.push_back(dfsSecondPassIterative(v, stacked));
        }
    }

    int dfsSecondPassIterative(int v, vector<bool>& stacked) {
        stack<int> dfsStack;
        int sccSize = 1;
        dfsStack.push(v);
        stacked[v] = true;
        while (!dfsStack.empty()) {
            int current = dfsStack.top();
            dfsStack.pop();
            for (int next : graph[current]) {
                if (stacked[next]) continue;
                sccSize++;
                stacked[next] = true;
                dfsStack.push(next);
            }
        }
        return sccSize;
    }

   public:
    KosarajuAlgorithm() {
        // Read graph from stdin
        graph = graphTransposed = vector<vector<int>>(MAX_VERTEX_INDEX + 1);
        int a, b;
        while (cin >> a >> b) {
            if (a != b) {
                graph[a].push_back(b);
                graphTransposed[b].push_back(a);
            }
        }
    }

    void dfsTwoPass() {
        dfsFirstPass();
        dfsSecondPass();
    }

    void answerInStdout(size_t answerSize) {
        sort(sccSizes.begin(), sccSizes.end(), greater<int>());
        assert(!sccSizes.empty());
        size_t split = min(sccSizes.size(), answerSize);
        
        cout << sccSizes[0];
        for (size_t i = 1; i < split; ++i) {
            cout << "," << sccSizes[i];
        }
        for (size_t i = split; i < answerSize; ++i) {
            cout << "," << 0;
        }
        cout << endl;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    KosarajuAlgorithm kosaraju;  // Read graph from stdin
    kosaraju.dfsTwoPass();
    kosaraju.answerInStdout(5);  // Top 5 largest SCC by vertex count

    return 0;
}
