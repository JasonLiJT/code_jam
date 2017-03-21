#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

const int N=2005;
struct flavor{int n; bool m;} fl[N][N]; //n: flavor index;  m: malted
bool malt[N]; int num[N];

int main()
{
	// freopen("B-large-practice.in","r",stdin);
	// freopen("ans.out","w",stdout);
	int T,nman,nfl; cin>>T;
	for(int t=1;t<=T;t++)
	{
		memset(malt,0,sizeof(malt));
		memset(fl,-1,sizeof(fl));
		printf("Case #%d: ",t);
		scanf("%d%d",&nfl,&nman);
		for(int i=0;i<nman;i++)
		{
			scanf("%d",&num[i]);
			for(int j=0;j<num[i];j++)
			{
				scanf("%d%d",&fl[i][j].n,&fl[i][j].m);
				fl[i][j].n--;
			}
		}
		bool OK=1,stop=0;
		while(!stop)
		{
			stop=1;
			for(int i=0;i<nman;i++)
			{
				int k=-1,j;
				for(j=0;j<num[i];j++)
				{
					if(fl[i][j].m)
					{
						if(malt[fl[i][j].n]) break;
						else k=fl[i][j].n;
					}
					else if(!malt[fl[i][j].n]) break;
				}
				if(j==num[i])
				{
					if(k==-1) {stop=1; OK=0; break;}
					else {malt[k]=1; stop=0;}
				}
			}
		}
		if(OK)
		{
			if(malt[0]) printf("1"); else printf("0");
			for(int i=1;i<nfl;i++)
				{if(malt[i]) printf(" 1"); else printf(" 0");}
			printf("\n");
		}
		else printf("IMPOSSIBLE\n");
	}
	// fclose(stdin); fclose(stdout);
	return 0;
}
