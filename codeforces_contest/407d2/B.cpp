#include <iostream>
#include <cstdio>
#include <cmath>

using namespace std;

long long b1, q, l, m, a[100009], b, count = 0, upper = 35;
bool inf = false;

inline bool in_a(long long x) {
    for (long long i = 0; i < m; ++i)
    {
        if (x == a[i]) return true;
    }
    return false;
}

int main() {
    
    scanf("%lld%lld%lld%lld", &b1, &q, &l, &m);
    for (long long i = 0; i < m; ++i) {
        scanf("%lld", &a[i]);
    }

    if (q == -1 && ((in_a(b1) && in_a(b1 * q)) || (abs(b1) > l))) {
        printf("0\n");
        return 0;
    } else if (q == -1 && ((!in_a(b1) || !in_a(b1 * q)) && (abs(b1) <= l))) {
        printf("inf\n");
        return 0;
    } else if (b1 * q == 0) {
        if (in_a(0)) {
            printf("%d\n", (!in_a(b1) && abs(b1) <= l));
            return 0;
        } else if (abs(b1) <= l) {
            printf("inf\n");
            return 0;
        } else {
            printf("0\n");
            return 0;
        }
    } else if (q == 1) {
        if (in_a(b1) || abs(b1) > l) {
            printf("0\n");
            return 0;
        } else {
            printf("inf\n");
            return 0;
        }
    }

    // now abs(q) >= 2 && b1 != 0
    b = b1;
    count = 0;
    while (count < 35 && abs(b) <= l) {
        if (in_a(b)) {
            b *= q;
            continue;
        }
        count++;
        b *= q;
    }

    if (count > 33) printf("inf\n");
    else printf("%lld\n", count);

}
