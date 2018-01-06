#include <iostream>
#include <algorithm>

#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	unsigned long long k, n;
	cin >> n >> k;

	// k large enough
	int digits = 0;
	unsigned long long _n = n;
	do {
		digits++;
	} while (_n >>= 1);
	// clog << digits << endl;

	if (k == 1) {
		cout << n << endl;
	} else {
		unsigned long long ans = 1;
		while (digits--) {
			ans <<= 1;
		}
		ans--;
		cout << ans << endl;
	}

	return 0;
}
