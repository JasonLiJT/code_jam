#include <iostream>
#include <fstream>
#include <algorithm>
#include <sstream>
#include <string>
#include <vector>
#include <unordered_map>
#include <cstdlib>
#include <ctime>

#define endl '\n'

using namespace std;

void print_graph(const unordered_map<int, vector<int> >& graph) {
    cout << "Graph:\n";
    for (const auto& i : graph) {
        cout << i.first << ": ";
        for (const auto& j : i.second) {
            cout << j << " ";
        }
        cout << endl;
    }
}

void random_contract(unordered_map<int, vector<int> >& graph, long long& edge_count2) {
    size_t node_count = graph.size();
    if (node_count < 3) {
        cout << "Reached 2 nodes!" << endl;
        return;
    }

    // Uniformly randomly select an edge
    long long r = rand() % edge_count2;
    // cout << "r: " << r << endl;
    auto i = graph.begin();

    while (r >= i->second.size() && i != graph.end()) {
        r -= i->second.size();
        i++;
    }

    if (i == graph.end()) {
        cout << "Random number out of range at i" << endl;
        return;
    }

    // Edge selected, find nodes a, b
    int a = i->first, b = *(i->second.begin() + r);

    // Iterators to the nodes to be contracted
    auto x = i, y = graph.find(b);

    if (y == graph.end()) {
        cout << "Graph error: node b not found" << endl;
        return;
    }

    // Delete self-loops
    int x2y = count(x->second.begin(), x->second.end(), y->first);
    int y2x = count(y->second.begin(), y->second.end(), x->first);
    if (x2y != y2x) {
        print_graph(graph);
    }
    edge_count2 -= x2y;
    edge_count2 -= y2x;
    x->second.erase(remove(x->second.begin(), x->second.end(), y->first), x->second.end());
    y->second.erase(remove(y->second.begin(), y->second.end(), x->first), y->second.end());

    // Redirect every edge with y to x
    try {
        for (auto y_node : y->second) {
            x->second.push_back(y_node);
            for (auto& i : graph.at(y_node)) {
                if (i == b) {
                    i = a;
                }
            }
        }
    } catch (...) {
        cout << "\nErr caught!" << endl;
    }

    // Delete node y
    graph.erase(y);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    srand(time(nullptr));

    ifstream fin;
    fin.open("kargerMinCut.txt");
    string line;
    stringstream ss;
    unordered_map<int, vector<int> > graph;

    long long edge_count2 = 0;

    // Read the graph
    while (getline(fin, line)) {
        ss.clear();
        ss.str(line);
        int n, m;
        ss >> n;
        while (ss >> m) {
            edge_count2++;
            graph[n].push_back(m);
        }
    }
    fin.close();

    cout << "Read done" << endl;

    size_t trials = 1, smallest_min = 200;

    while (trials--) {
        unordered_map<int, vector<int> > tmp_graph(graph);
        long long tmp_edge_count2 = edge_count2;
        // srand(trials);
        while (tmp_graph.size() > 2) {
            random_contract(tmp_graph, tmp_edge_count2);
        }

        print_graph(tmp_graph);
        if (tmp_graph.begin()->second.size() < smallest_min) {
            smallest_min = tmp_graph.begin()->second.size();
        }
        cout << "\nMinimum cuts = " << smallest_min << endl;
    }

    return 0;
}
