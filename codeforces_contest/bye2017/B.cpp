#include <iostream>
#include <algorithm>
#include <string>
#include <vector>

#define endl '\n'

using namespace std;

char maze[100][100];
int n, m;
string s;
int x, y, xStart, yStart;
vector< pair<int, int> > mappings({{1, 0}, {-1, 0}, {0, -1}, {0, 1}});

bool check(int i, int j) {
	if (0 <= i && i < n && 0 <= j && j < m) {
		return maze[i][j] != '#';
	}
	return false;
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	sort(mappings.begin(), mappings.end());

	cin >> n >> m;

	for (int i = 0; i < n; ++i) {
		for (int j = 0; j < m; ++j) {
			cin >> maze[i][j];
			if (maze[i][j] == 'S') {
				xStart = i;
				yStart = j;
			}
		}
	}

	cin >> s;

	int count = 0;
	do {
		x = xStart;
		y = yStart;
		for (char c: s) {
			auto p = mappings[c - '0'];
			x += p.first;
			y += p.second;
			if (check(x, y)) {
				if (maze[x][y] == 'E') {
					count++;
					// clog << count << ":" << endl;
					// for (auto p: mappings) {
					// 	clog << p.first << "," << p.second << endl;
					// }
					break;  // Exit for loop, next permutation
				} else if (maze[x][y] == '#') {
					break;
				}
			} else {
				break;
			}
		}
	} while (next_permutation(mappings.begin(), mappings.end()));

	cout << count << endl;

	return 0;
}
