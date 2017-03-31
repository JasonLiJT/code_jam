#include <iostream>

using namespace std;

int main() {
    bool a, b, c, d;
    cin >> a >> b >> c >> d;
    cout << (((a || b) and (c && d)) || ((b and c) && (a || d))) << endl;
}