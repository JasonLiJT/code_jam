#include <iostream>
#include <string>

using namespace std;

string add(const string& x, const string& y){
    string l, s;
    if (x.length() < y.length()) {
        l = y;
        s = x;
    } else {
        l = x;
        s = y;
    }
    long long Ll = l.length(), Ls = s.length();

    int D=0, carry=0;
    for (long long i = 0; i < s.length(); ++i) {
        D = s[Ls - 1 - i] - '0' + l[Ll - 1 - i] - '0' + carry;
        if (D >= 10) {
            carry = 1;
            l[Ll - 1 - i] = D - 10 + '0';
        } else {
            carry = 0;
            l[Ll - 1 - i] = D + '0';
        }
    }
    if (carry == 1) {
        if (Ll == Ls) {
            l = "1" + l;
        } else {
            l.replace(0, Ll - Ls, add("1", l.substr(0, Ll - Ls)));
        }   
    }
    // cout << x << " + " << y << " = " << l << endl;
    return l;
}

string subtract(const string& x, const string& y){
    string l, s;
    if (x.length() < y.length()) {
        l = y;
        s = x;
    } else {
        l = x;
        s = y;
    }
    long long Ll = l.length(), Ls = s.length();

    int D=0, borrow=0;
    for (long long i = 0; i < s.length(); ++i) {
        D = l[Ll - 1 - i] - '0' - (s[Ls - 1 - i] - '0') - borrow;
        if (D < 0) {
            borrow = 1;
            l[Ll - 1 - i] = D + 10 + '0';
        } else {
            borrow = 0;
            l[Ll - 1 - i] = D + '0';
        }
    }
    if (borrow == 1) {
        if (Ll == Ls) {
            return "Negative result!";
        } else {
            l.replace(0, Ll - Ls, subtract(l.substr(0, Ll - Ls), "1"));
        }   
    }
    // cout << x << " + " << y << " = " << l << endl;
    return l;
}

string Karatsuba(string x, string y){
    long long Lx = x.length(), Ly = y.length(), n = Lx;
    if (Lx == 0 || Ly == 0) {
        return "Error: empty string!";
    }
    if (Lx != Ly) {
        if (Lx < Ly) {
            swap(Lx, Ly);
            swap(x, y);
        }
        string zeros, ans;
        for (long long i = 0; i < Ly; ++i) {
            zeros += '0';
        }
        zeros = Karatsuba(x.substr(0, Lx - Ly), y) + zeros;
        ans = add(zeros, Karatsuba(x.substr(Lx - Ly), y));
        // cout << x << " * " << y << " = " << ans << endl;
        return ans;
    }
    if (n == 1) {
        int p = (x[0] - '0') * (y[0] - '0');
        string ans;
        if (p >= 10) {
            ans += p/10 + '0';
            ans += p - p/10*10 + '0';
        } else {
            ans += p + '0';
        }
        return ans;
    }
    // Assume n = Lx = Ly = 2 ^ k
    string a = x.substr(0, Lx/2), b = x.substr(Lx/2),
           c = y.substr(0, Ly/2), d = y.substr(Ly/2);
    // x = a*10^(n/2) + b,
    // y = c*10^(n/2) + d,
    // x * y = ac*10^n + (ad+bc)*10^n/2 + bd
    //       = ac*10^n + ((a+b)(c+d) - ac - bd)*10^n/2 + bd
    //         ~~         ~~~~~~~~~~                     ~~
    //          Only three recursive calls are needed,
    //          but the digits of (a+b)(c+d) may change and subtraction is needed
    string ac = Karatsuba(a, c), bd = Karatsuba(b, d), ac10n = ac;
    string adbc10half = subtract(subtract(Karatsuba(add(a, b), add(c, d)), ac), bd);
    for (long long i = 0; i < (n + 1) / 2; ++i) {
        ac10n += '0';
        adbc10half += '0';
    }
    for (long long i = 0; i < (n + 1) / 2; ++i) {
        ac10n += '0';
    }
    string ans = add(add(ac10n, adbc10half), bd);
    // cout << x << " * " << y << " = " << ans << endl;
    return ans;
}

int main() {
    int n;
    // cin >> n;
    n = 1;
    string x, y;
    for (int i = 0; i < n; ++i) {
        cin >> x >> y;
        cout << Karatsuba(x, y) << endl;
    }
    // x = "7276516073331588884036742112829621264780507301708503107107940330939782792631937047176678845039258822165554361817686321438089934973863944057456797792295851085707434023895910743391737408330427685900251659894694372036308518156797327381520369593939124349683742198873200924366913713271945150537302617939096145837198333569135733682225424305315277955520288233829005165955758642342003746159046893642835908024102294130183346367106198945435552001849672118232568250085080165577899308481460796707138725180491196993648136176559855249145499937971041787221626090767945563430504837387092311018370626766529028704462588929848060943899530338148484806912537905509186457460074816650982252076588521797736403756252379119077529436657605032601720300857967849434420728161048634178211823750755338271254321526051492973659179729052675938582048357005105419666671228589519861871501211718848298174140369374669451373831161277547745485419101572713757699413165196166002480526739864446363329875620314307096300738960008832637258591252155016771874048340156007760";
    // y = "5561127263912974166772486400574807153255620899726423774013104491688491768147295232491826510056458409066977074543033542112189777075546126721736959451240715911626197869251556404635962812346158125366696978912941001501846622908202839736502978727245259576965680587226049041612786513786850747889458461619021043922896820492157299193681886403084119692033356684496727437636473735070378152429067040136603845228817719514175842881632785601930512878881701234897952143615560495028086204874779342986810529195447717500755331441964418761150277897403441706063161439744361874195364581834812249499437821637042574809922052376227169499130522725342048254354787928144677961927691146889624671824440131009413297031278464940371456508188692956897284958913795228715361395065425235890448100821819713558290554884867620149573185171713889605089786633282484015353637168648989413615085963243083700813608115076186989291619683824693046524454312545188365933974913409921935286645256927843448967970006922402274575950169049053137593437158619517635509420807549837575";
    // cout << Karatsuba(x, y) << endl;
    // Can be verified using Python
    
}