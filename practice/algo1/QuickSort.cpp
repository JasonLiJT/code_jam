#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

#define endl '\n'

auto partition_firstIsPivot(const auto vbegin, const auto vend) {
	// Returns an iterator to the pivot in the partitioned vector.

	if (vend - vbegin <= 1) {
		return vbegin;
	}

	// Choses the first element as the pivot
	auto pivot = vbegin;
	auto pivotTarget = pivot + 1;

	for (auto i = vbegin + 1; i != vend; ++i) {
		if (*i <= *pivot) {
			swap(*i, *pivotTarget);
			++pivotTarget;
		}
	}

	swap(*pivot, *--pivotTarget);
	return pivotTarget;
}



void quicksort_countComparisons(const auto vbegin, const auto vend, long long& comparisons) {
	// vbegin and vend are expected to be iterators
	// e.g. v.begin(), v.end()
	if (vend - vbegin <= 1) {
		// Size of subarray is 1 or 0
		// Nothing to do.
		return;
	}

	// Q1. Choose the first element as the pivot
	// auto pivot = partition_firstIsPivot(vbegin, vend);

	// Q2. Choose the final element as the pivot
	// The lectures require exchanging the pivot element (i.e., the last element) with the first element.
	// swap(*vbegin, *(vend - 1));
	// auto pivot = partition_firstIsPivot(vbegin, vend);

	// Q3. Use the "median-of-three" pivot rule:
	// Consider the first, middle, and final elements of the given array,
	// choose the medium value as the pivot.
	// Again, exchange it with the first element.
	auto first = vbegin, last = vend - 1, middle = (vbegin + (vend - vbegin - 1) / 2);
	if ((*first < *middle && *middle <= *last) || (*first > *middle && *middle >= *last)) {
		swap(*first, *middle);
	} else if ((*first < *last && *last <= *middle) || (*first > *last && *last >= *middle)) {
		swap(*first, *last);
	}
	auto pivot = partition_firstIsPivot(vbegin, vend);


	comparisons += vend - vbegin - 1;  // The pivot needs to compare with the other N - 1 elements
	quicksort_countComparisons(vbegin, pivot, comparisons);
	quicksort_countComparisons(pivot + 1, vend, comparisons);  // The pivot is excluded
}

int main() {
	vector<long long> vLL;
	long long num;
	while (cin >> num) {
		vLL.push_back(num);
	}

	long long comparisons = 0;
	quicksort_countComparisons(vLL.begin(), vLL.end(), comparisons);
	for (const auto& i: vLL) {
		cout << i << endl;
	}
	clog << comparisons << endl;
}
