#include <iostream>
#include <algorithm>
#include <string>

using namespace std;
#define endl '\n'

template <typename T>
void arr_clog(T A[], const int& size) {
	for (int i = 0; i < size; ++i)
	{
		clog << A[i] << " ";
	}
	clog << endl;
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int T, K;
	bool status[1000], current[1000];
	string s;
	cin >> T;
	for (int i = 0; i < T; ++i) {
		cin >> s >> K;
		int ans  = 0, L = s.length(), width = L - K + 1, operations[1000] = {0};
		bool initial_done = true;
		for (int c = 0; c < L; ++c) {
			status[c] = (s[c] == '+') ? true : false;
			if (!status[c]) initial_done = false;
		}
		if (initial_done) {
			cout << "Case #" << i + 1 << ": " << 0 << endl;
			continue;
		}
		int j = 0;
		for (; j < width; ++j) {
			operations[width - 1 - j] = 1;
			bool done = true;
			do {
				for (int x = 0; x < L; ++x) {
					current[x] = status[x];
				}
				done = true;
				ans = 0;
				for (int a = 0; a < width; ++a) {
					if (operations[a] == 1) {
						ans++;
						for (int b = 0; b < K; ++b) {
							current[a + b] = !current[a + b];
						}
					}
				}
				for (int x = 0; x < L; ++x)
				{
					if (!current[x]) {
						done = false;
						break;
					}
				}
				if (done) break;
			} while (next_permutation(operations, operations + width));
			if (done) break;
		}

		clog << endl;
		arr_clog(status, L);
		arr_clog(current, L);
		arr_clog(operations, width);
		if (j == width) {
			cout << "Case #" << i + 1 << ": IMPOSSIBLE" << endl;
			continue;
		}
		cout << "Case #" << i + 1 << ": " << ans << endl;

	}
}