#include <iostream>
#include <algorithm>

using namespace std;
#define endl '\n'

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int T;
    cin >> T;
    for (int i = 0; i < T; ++i) {
        long long N, K, a, b, la, lb, last;
        cin >> N >> K;
        b = (N - 1) / 2;
        a = N - 1 - b;
        if (a == b) {
            la = 2;
            lb = 0;
        } else {
            la = 1;
            lb = 1;
        }
        K--;
        last = N;
        while (K > 0) {
            // clog << "K = " << K << ", a = " << a << ", b = " << b
            //     << ", la = " << la << ", lb = " << lb << endl;
            if (1 <= K && K <= la) {
                last = a;
                break;
            } else {
                K -= la;
                if (1 <= K && K <= lb) {
                    last = b;
                    break;
                } else {
                    K -= lb;
                }
            }
            // Next layer
            if (lb == 0) {
                if (a % 2 == 1) {
                    a = (a - 1) / 2;
                    b = a;
                    la *= 2;
                } else {
                    a /= 2;
                    b = a - 1;
                    lb = la;
                }
            } else if (a % 2 == 0 && b % 2 == 1) {
                a /= 2;
                b = a - 1;
                lb = la + 2 * lb;
            } else if (a % 2 == 1 && b % 2 == 0) {
                a = b / 2;
                b = a - 1;
                la = lb + 2 * la;
            } else {
                clog << "ERR!\na = " << a << "\nb = " << b
                << "\nla = " << la << "\nlb = " << lb << endl;
            }
        }
        // clog << "K = " << K << ", a = " << a << ", b = " << b
        //         << ", la = " << la << ", lb = " << lb << endl;
        a = (last - 1) / 2, b = last - 1 - a;
        cout << "Case #" << i + 1 << ": " << b << " " << a << endl;
    }
}
