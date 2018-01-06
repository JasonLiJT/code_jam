#include <iostream>
#include <algorithm>

#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	long long A, B, x, y, z;
	cin >> A >> B >> x >> y >> z;

	long long yellow = 2ll * x + y, blue = y + 3ll * z;
	long long addY = max(yellow - A, 0ll), addB = max(blue - B, 0ll);
	cout << addY + addB << endl;

	return 0;
}
