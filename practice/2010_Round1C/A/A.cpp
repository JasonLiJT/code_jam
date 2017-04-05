#include <cstdio>

int main() {
	int T;
	scanf("%d", &T);
	for (int i = 0; i < T; ++i) {
		int N, inters = 0, wire[1000][2] = {0};
		scanf("%d", &N);
		for (int j = 0; j < N; ++j) {
			scanf("%d%d", &wire[j][0], &wire[j][1]);
			for (int k = 0; k < j; ++k) {
				if ((wire[j][0] > wire[k][0]) != (wire[j][1] > wire[k][1])) inters++;
			}
		}
		printf("Case #%d: %d\n", i + 1, inters);
	}
}