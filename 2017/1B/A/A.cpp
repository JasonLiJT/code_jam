#include <cstdio>

using namespace std;

int main() {
    int T;
    scanf("%d", &T);
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        int D, N;
        scanf("%d%d", &D, &N);
        double max_time = 0;
        for (int i = 0; i < N; ++i) {
            int K, S;
            scanf("%d%d", &K, &S);
            double travel_time = 1.0 * (D - K) / S;
            if (travel_time > max_time) {
                max_time = travel_time;
            }
        }
        printf("Case #%d: %f\n", test_case, D / max_time);
    }
}