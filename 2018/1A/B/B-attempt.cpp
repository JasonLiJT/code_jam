#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

#define endl '\n'

using namespace std;

int M[1001], S[1001], P[1001];

int solveCase() {
    int R, B, C;
    cin >> R >> B >> C;
    
    for (int i = 0; i < C; ++i) {
        cin >> M[i] >> S[i] >> P[i];
    }

    return 0;
}

int main() {
    int T;
    cin >> T;
    for (int caseNum = 1; caseNum <= T; ++caseNum) {
        cout << "Case #" << caseNum << ": " << solveCase() << endl;
    }

    return 0;
}
