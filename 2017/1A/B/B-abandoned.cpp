#include <iostream>
#include <cmath>

using namespace std;


int main() {
	int T;
	cin >> T;
	for (int test_case = 1; test_case < T + 1; ++test_case) {
		int kit = 0, N, P, R[50];
		double Q[50][50];
		bool used[50][50] = {0};
		cin >> N >> P;
		for (int i = 0; i < N; ++i) {
			cin >> R[i];
		}
		for (int i = 0; i < N; ++i) {
			for (int j = 0; j < P; ++j) {
				int quantity;
				cin >> quantity;
				Q[i][j] = 1.0 * quantity / R[i];
			}
		}

		for (int pack = 0; pack < P; ++pack) {
			int upper = Q[0][pack] / 0.9, lower = ceil(Q[0][pack] / 1.1);
			if (upper - lower == 1) {
				continue;
			}
			for (int ingredient = 1; ingredient < N; ++ingredient) {
				int ip = 0;
				for (; ip < P; ++ip) {
					if (true) {
						break;
					}
				}
			}
		}


		cout << "Case #" << test_case << ": " << kit << endl;
	}
}