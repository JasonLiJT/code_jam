#include <cstdio>
#include <cmath>
#include <iostream>
using namespace std;

inline int Read()
{
 char c=getchar(); int ret=0;
 while(c>='0' && c<='9')
 {
  ret=ret*10+c-'0';
  c=getchar();
 }
 return ret;
} 

int main()
{
    int n, k, w[10009], sum = 0;
    n=Read(); k=Read();
    //cout<<n<<' '<<k<<endl;
    for (int i = 0; i < n; ++i) {
        w[i]=Read();
        w[i] = (w[i] - 1) / k + 1;
        sum += w[i];
    }
    printf("%d\n", (sum + 1) / 2);
    return 0;
}