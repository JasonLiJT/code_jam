#include <iostream>
#include <algorithm>
#include <set>

using namespace std;
#define endl '\n'

int a[300000];
set<int> linked[300000];

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int n, x, y, max = -1000000000;
	cin >> n;
	for (int i = 0; i < n; ++i) {
		cin >> a[i];
		if (a[i] > max) {
			max = a[i];
		}
	}
	for (int i = 0; i < n - 1; ++i) {
		cin >> x >> y;
		linked[x-1].insert(y-1);
		linked[y-1].insert(x-1);
	}
	clog << "Read done\n" << flush;
	int min_max = 1000000002;
	for (int next = 0; next < n; ++next) {
		int current_max = max;
		for (auto next1: linked[next]) {
			if (next1 == next) continue;
			if (a[next1] + 1 > current_max) {
				current_max = a[next1] + 1;
			}
			for (auto next2: linked[next1]) {
				if (next2 == next1 || next2 == next) continue;
				if (a[next2] + 2 > current_max) {
					current_max = a[next2] + 2;
				}
			}
		}
		if (current_max < min_max) {
			min_max = current_max;
		}
	}
	
	cout << min_max << endl;
}
