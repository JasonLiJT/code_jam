#include <cstdio>
#include <cstdlib>
#include <iostream>

using namespace std;

int b1, q, l, m, a[100009], count = 0;
long long b;

inline bool in_a(long long x) {
    for (long long i = 0; i < m; ++i)
        if (x == a[i]) return true;
    return false;
}

int main() {
    scanf("%d%d%d%d", &b1, &q, &l, &m);
    for (long long i = 0; i < m; ++i) scanf("%d", &a[i]);
    b = b1;
    count = 0;
    for (int i = 0; i < 70 + m && count < 35 && abs(b) <= l; ++i) {
        if (in_a(b)) {
            b *= q;
            continue;
        }
        count++;
        b *= q;
    }

    if (count > 33) printf("inf\n");
    else printf("%d\n", count);
}
