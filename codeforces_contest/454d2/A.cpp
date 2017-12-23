#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int v1, v2, v3, vm;
	cin >> v1 >> v2 >> v3 >> vm;

	if (vm > 2 * v3 || 2 * vm < v3) {
		cout << -1 << endl;
		return 0;
	}

	int c1 = 2 * v1, c2, c3;
	// c1 > c2 > c3
	// want c1, c2 to be as large as possible,
	// because Masha should only like the smallest car
	// c3 as small as possible
	// Then decide whether c2 exists
	c3 = max(vm, v3);

	if (2 * v2 <= 2 * vm) {
		cout << -1 << endl;
		return 0;
	}

	if (c1 - c3 > 1 && 2 * v2 > c3 && v2 < c1) {
		c2 = min(2 * v2, c1 - 1);
	} else {
		cout << -1 << endl;
		return 0;
	}

	if (c2 <= 2 * vm) {
		cout << -1 << endl;
		return 0;
	}

	cout << c1 << endl << c2 << endl << c3 << endl;

	return 0;
}
