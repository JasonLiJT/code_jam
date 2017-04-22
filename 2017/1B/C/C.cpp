#include <iostream>
#include <algorithm>

using namespace std;
int E[100], S[100], D[100][100], U[100], V[100];

int main() {
    int T;
    cin >> T;
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        int N, Q;
        cin >> N >> Q;
        for (int i = 0; i < N; ++i) {
            cin >> E[i] >> S[i];
        }
        for (int i = 0; i < N; ++i) {
            for (int j = 0; j < N; ++j) {
                cin >> D[i][j];
            }
        }
        for (int k = 0; k < Q; ++k) {
            cin >> U[k] >> V[k];
        }



        cout << "Case #" << test_case << ": " << 233 << endl;
    }
}