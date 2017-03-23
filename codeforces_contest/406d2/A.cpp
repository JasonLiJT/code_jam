#include <iostream>
#include <cmath>

using namespace std;

#define endl '\n'

int main() {
    int a, b, c, d, scream = -1;
    cin >> a >> b >> c >> d;
    if (b > d) {
        swap(b, d);
        swap(a, c);
    }
    // Now d >= b
    bool a_even = (a % 2 == 0), c_even = (c % 2 == 0), db_even = ((d - b) % 2 == 0);
    if (!(!db_even && a_even && c_even)) {
        // Possible
        int n = 0;
        while (((d - b + n * c) % a != 0) && n < 101) {
            ++n;
        }
        if (n < 101){
            scream = d + n * c;
        }
    }
    cout << scream << endl;
}