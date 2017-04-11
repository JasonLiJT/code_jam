#include <iostream>
#include <cmath>

using namespace std;

int main() {
	int n, m, k, a[100];
	cin >> n >> m >> k;
	for (int i = 0; i < n; ++i) {
		cin >> a[i];
	}
	int i = 1, len = (n - m > m - 1) ? (n - m) : (m - 1);
	for (; i < len; ++i) {
		if (m - 1 - i >= 0 && m - 1 + i < n) {
			if ((a[m - 1 - i] > 0 && a[m - 1 - i] <= k) || (a[m - 1 + i] > 0 && a[m - 1 + i] <= k)) {
				break;
			}
		} else if (m - 1 - i >= 0) {
			if (a[m - 1 - i] > 0 && a[m - 1 - i] <= k) {
				break;
			}
		} else if (m - 1 + i < n) {
			if (a[m - 1 + i] > 0 && a[m - 1 + i] <= k) {
				break;
			}
		}
	}
	cout << i * 10 << endl;
}