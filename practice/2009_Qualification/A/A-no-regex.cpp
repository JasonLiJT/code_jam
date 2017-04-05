#include <iostream>
#include <string>
#include <set>

using namespace std;
#define endl '\n'

int L, D, N;
string dict[5000];
char pattern[15][26+1]; //[letters][L]

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);
	cin >> L >> D >> N;
	for (int d = 0; d < D; ++d) {
		cin >> dict[d];
	}
	for (int X = 1; X < N + 1; ++X) {
		int K = 0;
		char c;
		for (int i = 0; i < L; ++i) {
			cin >> c;
			if (c == '(') {
				cin >> c;
				int j = 0;
				for (; j < 26 + 1; ++j) {
					if (c == ')') {
						pattern[i][j] = '!';
						break;
					}
					pattern[i][j] = c;
					cin >> c;
				}
			} else {
				pattern[i][0] = c;
				pattern[i][1] = '!';
			}
		}

		// for (int i = 0; i < L; ++i)
		// {
		// 	for (int j = 0; j < 27 && pattern[i][j] != '!'; ++j)
		// 	{
		// 		cout << pattern[i][j];
		// 	}
		// 	cout << endl;
		// }

		for (int d = 0; d < D; ++d) {
			bool match = true;
			for (int i = 0; i < L; ++i) {
				c = dict[d][i];
				for (int j = 0; j < 26 + 1; ++j) {
					if (pattern[i][j] == '!') {
						match = false;
						break;
					}
					if (pattern[i][j] == c) {
						break;
					}
				}
				if (!match) break;
			}
			if (match) K++;
		}
		cout << "Case #" << X << ": " << K << endl;
	}
}