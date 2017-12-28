#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int n, a, b;
	cin >> n >> a >> b;

	// 1 ≤ a, b ≤ 100, 2 ≤ n ≤ a + b

	vector<int> maximums;

	for (int x = (a + b) / n; x > 0; --x) {
		for (int left = 1; left <= n - 1; ++left) {
			int right = n - left;
			maximums.push_back(min(a / left, b / right));
		}
	}

	cout << *max_element(maximums.begin(), maximums.end()) << endl;

	return 0;
}
