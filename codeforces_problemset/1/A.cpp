#include <iostream>
using namespace std;

#define endl '\n'

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, a;
    cin >> n >> m >> a;
    
    int x = n / a + ((n % a == 0) ? 0 : 1);
    int y = m / a + ((m % a == 0) ? 0 : 1);

    // cout << x * y * 1LL;
    // Doesn't work. Note precedence! 
    // x * y * 1LL == (x * y) * 1LL
    // (int * int) * 1LL --> int(overflow) * 1LL --> wrong!

    cout << 1LL * x * y;

}