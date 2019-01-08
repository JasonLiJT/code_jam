#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
#include <unordered_set>
#include <queue>

using namespace std;

class Solution {
    long long encode(int x, int y) {
        return x * 200000 + y;
    }

   public:
    /**
     * @param maze: the map of maze
     * @param start: the start points
     * @param endd: the end points
     * @return: Return the minimal steps
     */
    int getAns(vector<vector<int>> &maze, vector<vector<int>> &start, vector<vector<int>> &endd) {
        if (maze.empty() || maze[0].empty()) return INT_MAX;
        unordered_set<long long> dest;
        for (const auto &vi : endd) {
            dest.insert(encode(vi[0], vi[1]));
        }
        const size_t rows = maze.size(), cols = maze[0].size();
        int leastSteps = INT_MAX;
        for (const auto &source : start) {
            // Start BFS here
            queue<pair<int, int>> bfsQ;
            vector<vector<bool>> inBfsQ(rows, vector<bool>(cols, false));
            bfsQ.emplace(source[0], source[1]);
            // cout << "Now at source (" << source[0] << ", " << source[1] << ")" << endl;
            inBfsQ[source[0]][source[1]] = true;
            int step = 0;
            while (!bfsQ.empty()) {
                // cout << "Now at step " << step << endl;
                size_t levelSize = bfsQ.size();
                bool nextSource = false;
                while (levelSize--) {
                    int x = bfsQ.front().first, y = bfsQ.front().second;
                    bfsQ.pop();
                    if (dest.count(encode(x, y))) {
                        leastSteps = min(leastSteps, step);
                        nextSource = true;
                        break;
                    }
                    if (x > 0 && !inBfsQ[x - 1][y]) {
                        // cout << "Add (" << x - 1 << ", " << y << ")" << endl;
                        inBfsQ[x - 1][y] = true;
                        bfsQ.emplace(x - 1, y);
                    }
                    if (y > 0 && !inBfsQ[x][y - 1]) {
                        // cout << "Add (" << x << ", " << y - 1 << ")" << endl;
                        inBfsQ[x][y - 1] = true;
                        bfsQ.emplace(x, y - 1);
                    }
                    if (x + 1 < rows && !inBfsQ[x + 1][y]) {
                        // cout << "Add (" << x + 1 << ", " << y << ")" << endl;
                        inBfsQ[x + 1][y] = true;
                        bfsQ.emplace(x + 1, y);
                    }
                    if (y + 1 < cols && !inBfsQ[x][y + 1]) {
                        // cout << "Add (" << x << ", " << y + 1 << ")" << endl;
                        inBfsQ[x][y + 1] = true;
                        bfsQ.emplace(x, y + 1);
                    }
                }
                step++;
                if (nextSource) break;
            }
        }
        return leastSteps;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    vector<vector<int>> maze({{0, 0, 0, 0, 0, 0, 0},
                              {1, 0, 0, 1, 0, 0, 0},
                              {0, 0, 1, 0, 1, 0, 0},
                              {0, 0, 0, 1, 0, 0, 0},
                              {0, 0, 0, 0, 1, 0, 0},
                              {0, 0, 0, 0, 1, 0, 1},
                              {0, 1, 0, 0, 0, 0, 0}}),
        start({{2, 5}, {4, 2}, {3, 4}}),
        end({{0, 5}, {3, 0}});

    Solution sol;
    cout << sol.getAns(maze, start, end) << endl;

    return 0;
}
