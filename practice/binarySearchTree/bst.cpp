#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

template <class T>
class BstNode {
   public:
    BstNode() = default;
    BstNode(T data) : p(nullptr), left(nullptr), right(nullptr), data(data) {
    }
    BstNode(BstNode *p, BstNode *left, BstNode *right, T data) : p(p), left(left), right(right), data(data) {
    }
    BstNode(BstNode &&) = default;
    BstNode(const BstNode &) = default;
    BstNode &operator=(BstNode &&) = default;
    BstNode &operator=(const BstNode &) = default;
    ~BstNode() {
        cerr << "~BstNode()\n";
        // Must not delete p because the dtor call may be from p!
        delete left;
        delete right;
    };

    BstNode *p;
    BstNode *left;
    BstNode *right;
    T data;
};

template <class T>
class Bst {
   public:
    Bst() : _size(0) {
    }
    Bst(BstNode<T> *root) : root(root), _size((root == nullptr) ? 1 : 0) {
    }
    Bst(T data) : root(new BstNode<T>(data)), _size(1) {
    }
    Bst(const vector<T> &input) {
        this->Bst();
        this->insert(input);
    }
    Bst(Bst &&) = default;
    Bst(const Bst &) = default;
    Bst &operator=(Bst &&) = default;
    Bst &operator=(const Bst &) = default;
    ~Bst() {
        cerr << "~Bst()\n";
        delete root;
    };

    static vector<T> inOrderTreeWalk(BstNode<T> *x) {
        vector<T> result;
        inOrderTreeWalk(x, result);
        return result;
    }

    static void inOrderTreeWalk(BstNode<T> *x, vector<T> &result) {
        if (x != nullptr) {
            inOrderTreeWalk(x->left, result);
            result.push_back(x->data);
            inOrderTreeWalk(x->right, result);
        }
    }

    static void inOrderTreeWalkStdOut(BstNode<T> *x) {
        cout << "In order tree walk:\n";
        for (int i : Bst<int>::inOrderTreeWalk(x)) {
            cout << i << " ";
        }
        cout << endl;
    }

    static BstNode<T> *minimum(BstNode<T> *x) {
        while (x->left != nullptr) {
            x = x->left;
        }
        return x;
    }

    static BstNode<T> *maximum(BstNode<T> *x) {
        while (x->right != nullptr) {
            x = x->right;
        }
        return x;
    }

    static BstNode<T> *successor(BstNode<T> *x) {
        if (x->right != nullptr) {
            return Bst<T>::minimum(x->right);
        }
        BstNode<T> *y = x->p;
        while (y != nullptr && y->right == x) {
            x = y;
            y = y->p;
        }
        return y;
    }

    void insertWithoutTrailingPointer(BstNode<T> *z) {
        this->_size++;
        // BstNode<T> *y = nullptr;
        BstNode<T> *x = this->root;
        if (x == nullptr) {
            // Empty tree
            this->root = z;
            z->p = nullptr;
            return;
        }
        while (true) {
            if (z->data < x->data) {
                if (x->left == nullptr) {
                    x->left = z;
                    break;
                }
                x = x->left;
            } else {
                if (x->right == nullptr) {
                    x->right = z;
                    break;
                }
                x = x->right;
            }
        }
        z->p = x;
    }

    void insert(BstNode<T> *z) {
        this->_size++;
        BstNode<T> *y = nullptr;
        BstNode<T> *x = this->root;
        while (x != nullptr) {
            y = x;
            if (z->data < x->data) {
                x = x->left;
            } else {
                x = x->right;
            }
        }
        z->p = y;
        if (y == nullptr) {
            // Empty tree
            this->root = z;
        } else if (z->data < y->data) {
            y->left = z;
        } else {
            y->right = z;
        }
    }

    BstNode<T> *insert(T data) {
        BstNode<T> *z = new BstNode<T>(data);
        this->insert(z);
        return z;
    }

    void insert(const vector<T> &input) {
        for (const T &data : input) {
            this->insert(data);
        }
    }

    BstNode<T> *transplant(BstNode<T> *from, BstNode<T> *to) {
        if (to == nullptr || to->p == nullptr) {
            // Empty Bst || Root node
            if (to != this->root) {
                throw "Bst::transplant(BstNode<T> *from, BstNode<T> *to): target node \"to\" not in Bst!";
            }
            this->root = from;
        } else if (to->p->left == to) {
            to->p->left = from;
        } else {
            to->p->right = from;
        }
        if (from != nullptr) {
            from->p = (to == nullptr) ? nullptr : to->p;
        }
        return to;
    }

    void deleteNode(BstNode<T> *x) {
        if (x->left == nullptr) {
            this->transplant(x->right, x);
        } else if (x->right == nullptr) {
            this->transplant(x->left, x);
        } else {
            BstNode<T> *rightSuccessor = Bst<T>::minimum(x->right);
            if (rightSuccessor != x->right) {
                // rightSuccessor is in x->right's left subtree
                this->transplant(rightSuccessor->right, rightSuccessor);
                rightSuccessor->right = x->right;
                rightSuccessor->right->p = rightSuccessor;
            }
            this->transplant(rightSuccessor, x);
            rightSuccessor->left = x->left;  // rightSuccessor had no left subtree
            rightSuccessor->left->p = rightSuccessor;
        }
        x->left = nullptr;
        x->right = nullptr;
        delete x;
    }

    size_t size() const {
        return this->_size;
    }

    BstNode<T> *root;

   private:
    size_t _size;
};

int main() {
    Bst<int> bst(250);
    auto node666 = bst.insert(666);
    vector<int> input = {450, 250, 233, 233, -1, 999};
    bst.insert(input);
    cout << "bst.size() = " << bst.size() << endl;

    Bst<int>::inOrderTreeWalkStdOut(bst.root);

    cout << "Maximum: " << Bst<int>::maximum(bst.root)->data << endl;
    cout << "Minimum: " << Bst<int>::minimum(bst.root)->data << endl;

    cout << "666's subtree: ";
    Bst<int>::inOrderTreeWalkStdOut(node666);

    cout << "666's successor: " << Bst<int>::successor(node666)->data << endl;

    bst.deleteNode(bst.root);
    cout << "Deleted root node 250." << endl;

    Bst<int>::inOrderTreeWalkStdOut(bst.root);

    try {
        delete bst.transplant(new BstNode<int>(3), bst.root);
    } catch (const char *e) {
        cerr << "Error: " << e << endl;
    }

    cerr << "Program finished!" << endl;

    return 0;
}
