#include <iostream>
#include <cstdio> 
#include <cstring>
using namespace std;

int n,m,k,a[10005];
bool OK,flag; bool flag1[10005],flag2[10005];

int main()
{
    scanf("%d%d",&n,&m);
    while(m--) 
    {
        OK=0;
        scanf("%d",&k);
        if(k==0) {flag=1; OK=1;}
        if(!flag)
        {
            memset(flag1,0,sizeof(flag1));
            memset(flag2,0,sizeof(flag2));
            for(int i=1;i<=k;i++)
            {
                scanf("%d",&a[i]);
                //if(a[i]==1) {OK=1; break;}
                if(a[i]>0)
                {
                    if(flag2[a[i]]) {OK=1;}// break;}
                    else flag1[a[i]]=1;
                }
                else
                {
                    if(flag1[-a[i]]) {OK=1;}// break;}
                    else flag2[-a[i]]=1; 
                } 
            }
        }
        //for(int i=1;i<=n;i++) cout<<flag1[i]<<' '<<flag2[i]<<endl;
        if(!OK) break;
    }
    if(OK) printf("NO\n");
    else printf("YES\n");
    return 0;
}