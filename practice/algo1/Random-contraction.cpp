#include <iostream>
#include <fstream>
#include <algorithm>
#include <sstream>
#include <string>
#include <set>
#include <unordered_map>
#include <cstdlib>
#include <ctime>

#define endl '\n'

using namespace std;

void random_contract(unordered_map< int, multiset<int> >& graph, long long& edge_count2, long long& node_count) {
	if (node_count < 3) {
		cout << "Reached 2 nodes!" << endl;
		return;
	}

	cout << "edge_count2 = " << edge_count2 << ", node_count = " << node_count << " = " << graph.size() << endl;

	// Uniformly randomly select an edge
	long long r = rand() % edge_count2; cout << "r: " << r << endl;
	auto i = graph.begin();

	while (r > i->second.size() && i != graph.end()) {
		r -= i->second.size();
		i++;
		// cout << "i+";
	}

	if (i == graph.end()) {
		cout << "Random number out of range at i" << endl;
		return;
	}

	// Edge selected, find nodes a, b
	int a = i->first;
	auto b_iter = i->second.begin();
	while (r-- && b_iter != i->second.end()) {
		// BidirectionalIterator, no random access
		b_iter++;
		// cout << "b+";
	}
	if (b_iter == i->second.end()) {
		cout << "Random number out of range at b_iter" << endl;
		cout << "i->second.size() = " << i->second.size() << endl;
		cout << "r = " << r << endl;
		return;
	}
	int b = *b_iter;
	
	// Iterators to the nodes to be contracted
	auto x = i, y = graph.find(b);

	if (y == graph.end()) {
		cout << "Graph error: node b not found" << endl;
		return;
	}

	// Delete self-loops
	edge_count2 -= x->second.erase(y->first);
	edge_count2 -= y->second.erase(x->first);

	// Redirect every edge with y to x
	for (auto y_node: y->second) {
		int count = graph.at(y_node).erase(b); // at() provides bounds checking
		for (int i = 0; i < count; ++i) {
			graph.at(y_node).insert(a);
		}
	}

	// Delete node y
	graph.erase(y);
	node_count--;
}

int main() {
	srand(time(nullptr));

	ifstream fin;
	fin.open("kargerMinCut.txt");
	string line;
	stringstream ss;
	unordered_map< int, multiset<int> > graph;

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
			graph[n].insert(m);
		}
	}
	fin.close();

	cout << "Read done" << endl;

	while (node_count > 2) {
		random_contract(graph, edge_count2, node_count);
	}

	for (const auto& i: graph) {
		cout << i.first << ": ";
		for (const auto& j: i.second) {
			cout << j << " ";
		}
		cout << endl;
	}

	return 0;
}
