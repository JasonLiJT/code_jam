#include <iostream> 
#include <cmath>
using namespace std;

inline int gcd(int a,int b) {
    if(b==0) return a;
    else return gcd(b,a%b);
}

int main()
{
    int a,b,c,d; int t;
    cin>>a>>b>>c>>d;
    if(b>d) {swap(b,d); swap(a,c);}
    if((d-b)%gcd(a,c)!=0) {cout<<-1<<endl; return 0;}
    int i=0;
    while((d-b+i*c)%a!=0) i++;
    cout<<d+c*i<<endl;
}