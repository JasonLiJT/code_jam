/*
817 · Range Sum Query 2D - Mutable: https://www.lintcode.com/problem/817/
Also in Leetcode, but subscription required.

TODO: solve it with simpler 2D Binary Indexed Tree. Understand and use 2D BIT: https://www.topcoder.com/thrive/articles/Binary%20Indexed%20Trees


Description
Given a 2D matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2). And the elements of the matrix could be changed.

You have to implement three functions:

- NumMatrix(matrix) The constructor.
- sumRegion(row1, col1, row2, col2) Return the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
- update(row, col, val) Update the element at (row, col) to val.

- The matrix is only modifiable by update.
- You may assume the number of calls to update and sumRegion function is distributed evenly.
- You may assume that row1 ≤ row2 and col1 ≤ col2.

Example


Example 1:

Input:
  NumMatrix(
    [[3,0,1,4,2],
     [5,6,3,2,1],
     [1,2,0,1,5],
     [4,1,0,1,7],
     [1,0,3,0,5]]
  )
  sumRegion(2,1,4,3)
  update(3,2,2)
  sumRegion(2,1,4,3)
Output:
  8
  10


Example 2:

Input:
  NumMatrix([[1]])
  sumRegion(0, 0, 0, 0)
  update(0, 0, -1)
  sumRegion(0, 0, 0, 0)
Output:
  1
  -1
*/

#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

static auto _ = [](){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    return 233;
}();

class NumMatrix {
    using VI = vector<int>;
    using VVI = vector<VI>;
public:
    NumMatrix(vector<vector<int>> matrix) : M(matrix.size()), N(matrix[0].size()) {
        build2DSegTree(matrix);
        print2D(matrix);
    }
    
    void update(int row, int col, int val) {
        for (updateRow(segTree2D[row += M], col, val); row > 0; row /= 2) {
            segTree2D[row / 2] = mergeSegTrees(segTree2D[row], segTree2D[row ^ 1]);
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        int sum = 0;
        for (row1 += M, row2 += M + 1; row1 < row2; row1 /= 2, row2 /=2) {
            if (row1 & 1) sum += sumRow(segTree2D[row1++], col1, col2);
            if (row2 & 1) sum += sumRow(segTree2D[--row2], col1, col2);
        }
        // cout << "sumRegion(" << row1 << ", " << col1 << ", " << row2 << ", " << col2 << ") = " << sum << "\n";
        return sum;
    }

private:
    void updateRow(VI& row, int i, int val) {
        for (row[i += N] = val; i > 0; i /= 2) {
            row[i / 2] = row[i] + row[i ^ 1];
        }
    }
    int sumRow(const VI& segTree, int l, int r) {
        // const int l0 = l, r0 = r;
        int sum = 0;
        for (l += N, r += N + 1; l < r; l /= 2, r /= 2) {
            if (l & 1) sum += segTree[l++];
            if (r & 1) sum += segTree[--r];
        }
        // cout << "sumRow = " << sum << " in [" << l0 << ", " << r0 << "] for "; print1D(segTree);
        return sum;
    }

    VI buildRowSegTree(const VI& row) {
        VI segTree(2 * N);
        for (auto i = N; i < 2 * N; ++i) {
            segTree[i] = row[i - N];
        }
        for (auto i = N - 1; i > 0; --i) {
            segTree[i] = segTree[2 * i] + segTree[2 * i + 1];
        }
        return segTree;
    }

    void build2DSegTree(const VVI& matrix) {
        segTree2D.clear();
        segTree2D.reserve(2 * M);
        segTree2D.resize(M);
        for (const auto& row : matrix) {
            segTree2D.push_back(buildRowSegTree(row));
        }
        // cout << "Before merging: "; print2D(segTree2D);
        for (auto i = M - 1; i > 0; --i) {
            segTree2D[i] = mergeSegTrees(segTree2D[2 * i], segTree2D[2 * i + 1]);
        }
        // cout << "After merging: "; print2D(segTree2D);
    }

    VI mergeSegTrees(const VI& l, const VI& r) {
        VI sum = l;
        for (auto i = 0u; i < r.size(); ++i) {
            sum[i] += r[i];
        }
        return sum;
    }

    void print1D(const VI& vi) {
        for (auto i : vi) {
            cout << i << ", ";
        }
        cout << "\n";
    }

    void print2D(const VVI& vii) {
        for (const auto& row : vii) {
            print1D(row);
        }
        cout << "\n";
    }

    const std::size_t M, N;  // M x N matrix
    VVI segTree2D;  // 2D nested segment tree
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * NumMatrix obj = new NumMatrix(matrix);
 * obj.update(row,col,val);
 * int param_2 = obj.sumRegion(row1,col1,row2,col2);
 */

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    NumMatrix solution{
        {{3, 0, 1, 4, 2},
         {5, 6, 3, 2, 1},
         {1, 2, 0, 1, 5},
         {4, 1, 0, 1, 7},
         {1, 0, 3, 0, 5}}};
    cout << "sumRegion(2,1,4,3) = " << solution.sumRegion(2,1,4,3) << " (should be 8)\n";
    cout << "update(3,2,2)\n";
    solution.update(3,2,2);
    cout << "sumRegion(2,1,4,3) = " << solution.sumRegion(2,1,4,3) << " (should be 10)\n";

    return 0;
}
