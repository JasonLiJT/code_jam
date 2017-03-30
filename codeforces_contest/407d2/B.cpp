#include <iostream>
#include <cstdio>
#include <cmath>

using namespace std;

int b1, q, l, m, a[100009], b[30], count = 0;
bool inf = false;

inline bool in_a(int x) {
    for (int i = 0; i < m; ++i)
    {
        if (x == a[i]) return true;
    }
    return false;
}

int main() {
    
    scanf("%d%d%d%d", &b1, &q, &l, &m);
    b[0] = b1;
    b[1] = b[0] * q;
    for (int i = 0; i < m; ++i) {
        scanf("%d", &a[i]);
    }

    if (q == -1 && (in_a(b1) && in_a(b1 * q)) || (abs(b1) > l)) {
        printf("0\n");
        return 0;
    } else if (q == -1 && ((!in_a(b1) || !in_a(b1 * q)) && (abs(b1) <= l))) {
        printf("inf\n");
        return 0;
    } else if (b1 * q == 0) {
        if (in_a(0)) {
            printf("%d\n", (!in_a(b1)));
            return 0;
        } else {
            printf("inf\n");
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

    m = 35;
    while (in_a(b[0]) && (m + 1)) {
        b[0] *= q;
        m--;
    }
    if (m == -1) {
        printf("0\n");
        return 0;
    }
    count = 1;
    for (int i = 0; i < 35; ++i) {
        int next = b[i] * q;
        // printf("next:%d\n", next);
        if (next == 0 || abs(next) > 1000000000 || abs(next) > l) {
            break;
        }
        if (in_a(next)) continue;
        count++;
        // printf("count++\n");
        b[i+1] = next;
    }

    printf("%d\n", count);
    // for (int i = 0; i < count; ++i) {
    //     printf("%d ", b[i]);
    // }

}
