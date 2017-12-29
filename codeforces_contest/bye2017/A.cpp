#include <iostream>
#include <algorithm>
#include <string>
#include <set>

#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	set<char> turn = {'a', 'e', 'i', 'o', 'u', '1', '3', '5', '7', '9'};

	string input;
	cin >> input;
	int count = 0;
	for (char c: input) {
		if (turn.count(c)) {
			count++;
		}
	}

	cout << count << endl;

	return 0;
}
