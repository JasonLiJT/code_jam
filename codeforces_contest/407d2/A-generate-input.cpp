#include <cstdio>
#include <iostream>
#include <cmath>
#include <ctime>
#include <algorithm>

using namespace std;

int main() {
    srand(time(0));
    
    // freopen("A.in", "w", stdout);
    int n = 70709, k = 57273423;
    printf("%d %d\n", n, k);
    for (int i = 0; i < n - 1; ++i) {
        printf("%d ", rand() % 10000);
    }
    printf("%d\n", rand() % 10000);
    return 0;
}