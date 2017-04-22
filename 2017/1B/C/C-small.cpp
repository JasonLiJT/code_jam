#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;
int E[100], S[100], D[100][100], U[100], V[100];

double solve(double times, const int& current, const int& N, const int& km_left, double speed) {
    //expect current >= 1
    if (current == N - 2){
        //arrive at N-1
        // clog << "last city, ";
        if (km_left >= D[current][current+1]) {
            if (E[current] >= D[current][current+1] && S[current] > speed) {
                times += (1.0 * D[current][current+1] / S[current]);
                // clog << "times = " << times << endl;
                // clog << "change\n";
                return times;
            } else {
                times += (1.0 * D[current][current+1] / speed);
                // clog << "times = " << times << endl;
                // clog << "unchange\n";
                return times;
            }
        } else {
            // clog << "have to change\n";
            times += (1.0 * D[current][current+1] / S[current]);
            // clog << "times = " << times << endl;
            return times;
        }
    } else if (km_left < D[current][current + 1]) {
        //have to change horse
        times += (1.0 * D[current][current+1] / S[current]);
        // clog << "times = " << times << endl;
        return solve(times, current + 1, N, E[current] - D[current][current+1], S[current]);
    } else {
        //change or don't change
        double change = times, nochange = times;
        change += (1.0 * D[current][current+1] / S[current]);
        // clog << "change times = " << change << endl;
        change = solve(change, current + 1, N,  E[current] - D[current][current+1], S[current]);

        nochange += (1.0 * D[current][current+1] / speed);
        // clog << "nochange times = " << nochange << endl;
        nochange = solve(nochange, current + 1, N, km_left - D[current][current+1], speed);
        return (change < nochange) ? change : nochange;
    }
}

int main() {
    int T;
    cin >> T;
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        cout << "Case #" << test_case << ": ";
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
        // small: single line, Q = 1, from 1 to N

        cout << fixed << solve(0.0, 0, N, E[0], S[0]) << endl;
    }
}