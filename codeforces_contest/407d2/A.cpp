#include <cstdio>

int main() {
    int n, k, w, sum = 0;
    scanf("%d%d", &n, &k);
    for (int i = 0; i < n; ++i) {
        scanf("%d", &w);
        w = (w - 1) / k + 1;
        sum += w;
    }
    printf("%d\n", (sum + 1) / 2);
}