#include <cstdio>
#include <iostream>
#include <cmath>

#define DEBUG true
#define pi acos(-1.0)
#define eps 1e-2
int n,m;
double s,r,S,p;
double x[4],y[4],ang[4],L[5];

double dis(double x1,double y1,double x2,double y2)
{
   return sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
double gcd(double a,double b)
{
    if(a<eps) return b;
    if(b<eps) return a;
    return gcd(b,fmod(a,b));
}

int main()
{
    int i,j,k;
    for(i=0;i<3;i++)
        scanf("%lf%lf",&x[i],&y[i]);
    for(i=0;i<3;i++)
      L[i]=dis(x[i],y[i],x[(i+1)%3],y[(i+1)%3]);
    p=(L[0]+L[1]+L[2])/2; 
    s=sqrt(p*(p-L[0])*(p-L[1])*(p-L[2]));
    r=L[0]*L[1]*L[2]/(4*s);
    for(i=0;i<3;i++) ang[i]=acos(1-L[i]*L[i]/(2*r*r));
    ang[2]=2*pi-ang[1]-ang[0];
    double unit=0;
    for(i=0;i<3;i++) unit=gcd(unit,ang[i]);
    printf("%.6f\n",pi*r*r*sin(unit)/unit);
    return 0;
}