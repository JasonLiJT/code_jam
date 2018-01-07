#include <iostream>
#include <algorithm>
#include <deque>
#include <vector>

#define endl '\n'

using namespace std;

long long n, m, r, k;

long long weightN(long long i) {
	if (r <= i) {
		if (r <= n - i + 1) {
			return r;
		} else {
			return n - i + 1;
		}
	} else {
		// r > i
		if (r <= n - i + 1) {
			return i;
		} else {
			return n - r + 1;
		}
	}
}

long long weightM(long long j) {
	if (r <= j) {
		if (r <= m - j + 1) {
			return r;
		} else {
			return m - j + 1;
		}
	} else {
		// r > j
		if (r <= m - j + 1) {
			return j;
		} else {
			return m - r + 1;
		}
	}
}

long long weight(long long i, long long j) {
	return weightN(i) * weightM(j);
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	cin >> n >> m >> r >> k;

	// Brute force
	vector<long long> vll;
	vll.resize(n * m);
	for (long long i = 1; i <= n; ++i) {
		for (long long j = 1; j <= m; ++j) {
			vll.push_back(weight(i, j));
		}
	}
	sort(vll.begin(), vll.end());
	long long sum_numerator = 0;
	while (k--) {
		sum_numerator += vll.back();
		vll.pop_back();
	}

	cout.precision(10);
	cout << fixed;
	cout << 1.0 * sum_numerator / (n - r + 1) / (m - r + 1) << endl;

	return 0;
}
