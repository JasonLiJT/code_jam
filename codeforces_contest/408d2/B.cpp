#include <iostream>

using namespace std;
#define endl '\n'

bool h[1000000];

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int n, m, k, bone = 0, hole, a, b;
	cin >> n >> m >> k;
	for (int i = 0; i < m; ++i) {
		cin >> hole; hole--;
		h[hole] = true;
	}
	for (int i = 0; i < k; ++i) {
		if (h[bone]) break;
		cin >> a >> b; a--; b--;
		if (bone == a) bone = b;
		else if (bone == b) bone = a;
	}
	cout << bone + 1 << endl;
}
