#include <iostream>
#include <string>

using namespace std;


void scan(int i, int index, int C, string cake[], bool done[25][25]) {
	for (int j = index + 1; j < C; ++j) {
		if (cake[i][j] != '?') {
			break;
		}
		cake[i][j] = cake[i][index];
		done[i][j] = true;
	}
	for (int j = index - 1; j >= 0; --j)
	{
		if (cake[i][j] != '?') {
			break;
		}
		cake[i][j] = cake[i][index];
		done[i][j] = true;
	}
}

int main() {
	int T;
	cin >> T;
	for (int test_case = 1; test_case < T + 1; ++test_case) {
		int R, C;
		cin >> R >> C;

		string cake[25];
		bool done[25][25] = {0};
		bool blank_row[25] = {0};

		for (int i = 0; i < R; ++i) {
			cin >> cake[i];
		}

		for (int i = 0; i < R; ++i) {
			int row_count = 0;
			for (int j = 0; j < C; ++j) {
				if (!done[i][j] && cake[i][j] != '?') {
					row_count++;
					scan(i, j, C, cake, done);
				}
			}
			if (row_count == 0) {
				blank_row[i] = true;
				// clog << "Case " << test_case << " row " << i << " is blank" << endl;
			}
		}

		for (int i = 0; i < R; ++i)
		{
			if (blank_row[i]) {
				// clog << "Copying case " << test_case << " row " << i << endl;
				int next_non_blank = i + 1;
				while (next_non_blank < R && blank_row[next_non_blank]) {
					blank_row[next_non_blank] = false;
					next_non_blank++;
				}
				if (next_non_blank == R) {
					// i > 0, otherwise impossible
					for (int r = i; r < R; ++r) {
						for (int c = 0; c < C; ++c) {
							cake[r][c] = cake[i - 1][c];
						}
					}
				} else {
					for (int r = i; r < next_non_blank; ++r) {
						for (int c = 0; c < C; ++c) {
							cake[r][c] = cake[next_non_blank][c];
						}
					}
				}
			}
		}

		cout << "Case #" << test_case << ":\n";
		for (int i = 0; i < R; ++i)
		{
			cout << cake[i] << endl;
		}
	}
}