#include <iostream>
#include <algorithm>
#include <vector>

#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int n;
	int arr[100005] = {0};
	vector<int> distances;
	cin >> n;
	cin >> arr[0];
	int min = arr[0], d = 0;
	for (int i = 1; i < n; ++i) {
		cin >> arr[i];
		d++;
		if (arr[i] < min) {
			min = arr[i];
			d = 0;
			distances.clear();
		} else if (arr[i] == min) {
			distances.push_back(d);
			d = 0;
		}
	}

	cout << *min_element(distances.begin(), distances.end()) << endl;


	return 0;
}
