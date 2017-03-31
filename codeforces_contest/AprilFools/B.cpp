#include <iostream>
#include <string>
#include <cstdio>
#include <cstdlib>

using namespace std;

int main() {
    string digs;
    cin >> digs;
    int sum = 0;
    for (int i = 0; i < digs.length(); ++i){
        sum += digs[i] - '0';
    }
    cout << sum * 3 << endl;
}