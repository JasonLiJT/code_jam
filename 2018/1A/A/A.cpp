#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

#define endl '\n'

using namespace std;

char grid[105][105];

bool verifyCuts(int R, int V, int share, vector<int> & hCut, vector<int> & vCut) {
    int rStart = 0, cStart = 0;
    for (auto rEnd: hCut) {
        for (auto cEnd: vCut) {
            int count = 0;
            // clog << endl << "counting row " << rStart << " to " << rEnd << endl;
            // clog << "column " << cStart << " to " << cEnd << endl;
            for (int i = rStart; i <= rEnd; ++i) {
                for (int j = cStart; j <= cEnd; ++j) {
                    if (grid[i][j] == '@') {
                        count++;
                    }
                }
            }
            cStart = cEnd + 1;
            if (count != share) {
                return false;
            }
        }
        rStart = rEnd + 1;
        cStart = 0;
    }
    return true;
}

string solveCase() {
    int R, C, H, V;
    cin >> R >> C >> H >> V;
    
    int hCount[105] = {0};
    int vCount[105] = {0};
    int count = 0;

    for (int i = 0; i < R; ++i) {
        for (int j = 0; j < C; ++j) {
            cin >> grid[i][j];
            if (grid[i][j] == '@') {
                hCount[i]++;
                vCount[j]++;
                count++;
            }
        }
    }

    if (count % ((H + 1) * (V + 1)) != 0) {
        return "IMPOSSIBLE";
    }

    int share = count / ((H + 1) * (V + 1));
    int rShare = count / (H + 1);
    int cShare = count / (V + 1);

    if (share == 0) {
        return "POSSIBLE";
    }

    // Determine the cut
    vector<int> hCut, vCut;

    // Horizontal cuts
    int rowCount = 0;
    for (int i = 0; i < R; ++i) {
        rowCount += hCount[i];
        if (rowCount > rShare) {
            return "IMPOSSIBLE";
        }
        if (rowCount == rShare) {
            // Make cut
            rowCount = 0;
            hCut.push_back(i);
        }
    }

    // Vertical cuts
    int columnCount = 0;
    for (int i = 0; i < C; ++i) {
        columnCount += vCount[i];
        if (columnCount > cShare) {
            return "IMPOSSIBLE";
        }
        if (columnCount == cShare) {
            // Make cut
            columnCount = 0;
            vCut.push_back(i);
        }
    }

    if (verifyCuts(R, V, share, hCut, vCut)) {
        return "POSSIBLE";
    }
    return "IMPOSSIBLE";

    // clog << endl;
    // clog << "hCut: ";
    // for (auto i: hCut) {
    //     clog << i << " ";
    // }
    // clog << endl << "vCut:";
    // for (auto i: vCut) {
    //     clog << i << " ";
    // }
    // clog << endl;
    // return "END";

}

int main() {
    int T;
    cin >> T;
    for (int caseNum = 1; caseNum <= T; ++caseNum) {
        cout << "Case #" << caseNum << ": " << solveCase() << endl;
    }

    return 0;
}
