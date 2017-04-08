#include <iostream>
#include <cstdio>
#include <algorithm>

using namespace std;

#define pii pair<int, int>

int merge_second(pii A[], int p, int q, int r) {
	int n1 = q - p + 1, n2 = r - q, inversion = 0;
	pii L[n1], R[n2];
	for (int i = 0; i < n1; ++i) L[i] = pii(A[p + i]);
	for (int i = 0; i < n2; ++i) R[i] = pii(A[q + i + 1]);

	for (int i = 0, j = 0, k = p; k <= r; k++) {
		if (i == n1) {
			A[k] = pii(R[j++]);
		} else if (j == n2) {
			A[k] = pii(L[i++]);
		} else if (L[i].second <= R[j].second) {
			A[k] = pii(L[i++]);
		} else {
			A[k] = pii(R[j++]);
			inversion += n1 - i;
		}
	}

	return inversion;
}

int merge_sort_second(pii A[], int p, int r) {
    if (p < r) {
        int inversions = 0;
        int q = (p + r) / 2;
        inversions += merge_sort_second(A, p, q);
        inversions += merge_sort_second(A, q + 1, r);
        inversions += merge_second(A, p, q, r);
        return inversions;
    } else {
        return 0;
    }
}

bool comp_first(const pii& A, const pii& B) { return A.first < B.first; }

int main() {
	int T;
	scanf("%d", &T);
	for (int i = 0; i < T; ++i) {
		int N, inters = 0;
		pii wire[1009];
		scanf("%d", &N);
		for (int j = 0; j < N; ++j) {
			scanf("%d%d", &wire[j].first, &wire[j].second);
		}
		sort(wire, wire + N, comp_first);
		inters = merge_sort_second(wire, 0, N - 1);
		printf("Case #%d: %d\n", i + 1, inters);
		cout << flush;
	}
}
