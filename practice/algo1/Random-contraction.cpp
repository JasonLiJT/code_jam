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

void random_contract(unordered_map<int, vector<int> >& graph, long long& edge_count2, long long& node_count) {
    if (node_count < 3) {
        cout << "Reached 2 nodes!" << endl;
        return;
    }

    cout << "edge_count2 = " << edge_count2 << ", node_count = " << node_count << " = " << graph.size() << endl;

    // Uniformly randomly select an edge
    long long r = rand() % edge_count2;
    cout << "r: " << r << endl;
    auto i = graph.begin();

    int flag = 0;
    while (r >= i->second.size() && i != graph.end()) {
        r -= i->second.size();
        i++;
        flag++;
        // cout << "i+" << flag << "-" << r << " ";
    }

    if (i == graph.end()) {
        cout << "Random number out of range at i" << endl;
        return;
    }

    // Edge selected, find nodes a, b
    int a = i->first;
    // auto b_iter = i->second.begin();
    // while (r-- && b_iter != i->second.end()) {
    // 	// BidirectionalIterator, no random access
    // 	b_iter++;
    // 	cout << "b+";
    // }
    // if (b_iter == i->second.end()) {
    // 	cout << "Random number out of range at b_iter" << endl;
    // 	cout << "i->second.size() = " << i->second.size() << endl;
    // 	cout << "r = " << r << endl;
    // 	return;
    // }
    // int b = *b_iter;
    int b = *(i->second.begin() + r);

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
        cout << "boom" << endl;
    }
    edge_count2 -= x2y;
    edge_count2 -= y2x;
    remove(x->second.begin(), x->second.end(), y->first);
    remove(y->second.begin(), y->second.end(), x->first);


    // Redirect every edge with y to x
    try {
        for (auto y_node : y->second) {
            cout << "y_node: " << y_node << " ";
            int b_count = count(graph.at(y_node).begin(), graph.at(y_node).end(), b);  // at() provides bounds checking
            remove(graph.at(y_node).begin(), graph.at(y_node).end(), b);
            for (int i = 0; i < b_count; ++i) {
                graph.at(y_node).push_back(a);
                x->second.push_back(y_node);
            }
        }
    } catch (...) {
        cout << "\nErr caught!" << endl;
        cout << "a = " << a << ", b = " << b << endl;
        cout << "x: " << x->first << ": ";
        for (const auto& j : x->second) {
            cout << j << " ";
        }
        cout << endl;
        cout << "y: " << y->first << ": ";
        for (const auto& j : y->second) {
            cout << j << " ";
        }
        cout << endl;
        print_graph(graph);
        cout << endl;
    }

    // Delete node y
    if (b == 19) {
        print_graph(graph);
        cout << "a = " << a << ", b = " << b << endl;
        cout << "WTF" << endl;
    }
    if (graph.erase(y) == graph.end()) {
        cout << "Erasion failed for " << b << endl;
    } else {
        node_count--;
    }
}

int main() {
    // srand(time(nullptr));

    ifstream fin;
    fin.open("kargerMinCut.txt");
    string line;
    stringstream ss;
    unordered_map<int, vector<int> > graph;

    long long edge_count2 = 0, node_count = 0;

    // Read the graph
    while (getline(fin, line)) {
        ss.clear();
        ss.str(line);
        int n, m;
        ss >> n;
        node_count++;
        while (ss >> m) {
            edge_count2++;
            graph[n].push_back(m);
        }
    }
    fin.close();

    cout << "Read done" << endl;

    while (node_count > 2) {
        random_contract(graph, edge_count2, node_count);
    }

    print_graph(graph);

    return 0;
}
