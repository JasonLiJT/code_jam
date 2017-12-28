#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	long long k[3] = {0};
	cin >> k[0] >> k[1] >> k[2];
	sort(k, k + 3);
	do {
		long long i = 4;
		for (; i < k[0] * k[1] * k[2] + 10; ++i) {
			if ((i-1) % k[0] == 0 || (i-2) % k[1] == 0 || (i-3) % k[2] == 0) {
				continue;
			}
			break;
		}
		if (i == k[0] * k[1] * k[2] + 10) {
			cout << "YES\n";
			return 0;
		}
	} while (next_permutation(k, k + 3));
	cout << "NO\n";
	// if (count(k, k + 3, 2) == 2 || count(k, k + 3, 1) > 0) {
	// 	cout << "YES\n";
	// } else if (k[0] > 3) {
	// 	cout << "NO" << endl;
	// } else {
	// 	cout << "YES\n";
	// }

	return 0;
}
