#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
    int T;
    cin >> T;
    cout << fixed;
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        int N, K;
        double U, fail = 1;
        cin >> N >> K >> U;
        vector<double> p;
        double sum = 0;
        for (int i = 0; i < N; ++i) {
            double tmp;
            cin >> tmp;
            p.push_back(tmp);
            sum += tmp;
        }

        double average = (sum + U) / N;

        for (int i = 0; i < N; ++i) {
            fail *= 1 - p[i];
        }

        cout << "Case #" << test_case << ": " << 1 - fail << endl;
        
    }
}