import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
    private static final int[] colNeighbour = { 0, 0, 1, -1 };
    private static final int[] rowNeighbour = { 1, -1, 0, 0 };
    private final int n;
    private boolean[][] gridIsOpen;
    private boolean[] ufRootConnectedToTop;
    private boolean[] ufRootConnectedToBottom;
    private int numberOfOpenSites;
    private final WeightedQuickUnionUF uf;
    private boolean percolated;

    public Percolation(int n) {
        // create n-by-n grid, with all sites blocked
        if (n <= 0) {
            throw new IllegalArgumentException("Negative grid size!");
        }
        this.n = n;
        this.gridIsOpen = new boolean[n][n];
        this.uf = new WeightedQuickUnionUF(n * n);
        this.ufRootConnectedToTop = new boolean[n * n];
        this.ufRootConnectedToBottom = new boolean[n * n];
        this.numberOfOpenSites = 0;
        for (int i = 0; i < n; i++) {
            ufRootConnectedToTop[uf.find(i)] = true;
            ufRootConnectedToBottom[uf.find(n * n - 1 - i)] = true;
        }
        this.percolated = false;
    }

    private void checkRange(int row, int col) {
        if (row > n || row < 1 || col > n || col < 1) {
            throw new IllegalArgumentException("Grid coordinate out of range!");
        }
    }

    private boolean isInRange(int row, int col) {
        return !(row > n || row < 1 || col > n || col < 1);
    }

    private int coordinateToUF(int row, int col) {
        return (row - 1) * n + col - 1;
    }

    public void open(int row, int col) {
        // open site (row, col) if it is not open already
        if (isOpen(row, col)) {
            return;
        }
        gridIsOpen[row - 1][col - 1] = true;
        numberOfOpenSites++;
        for (int i = 0; i < 4; i++) {
            int x = row + rowNeighbour[i];
            int y = col + colNeighbour[i];
            if (isInRange(x, y)) {
                if (isOpen(x, y)) {
                    boolean unionConnectedToTop = ufRootConnectedToTop[uf.find(coordinateToUF(row, col))]
                            || ufRootConnectedToTop[uf.find(coordinateToUF(x, y))];
                    boolean unionConnectedToBottom = ufRootConnectedToBottom[uf.find(coordinateToUF(row, col))]
                            || ufRootConnectedToBottom[uf.find(coordinateToUF(x, y))];
                    uf.union(coordinateToUF(row, col), coordinateToUF(x, y));
                    boolean isTop = ufRootConnectedToTop[uf.find(coordinateToUF(row, col))] |= unionConnectedToTop;
                    boolean isBottom = ufRootConnectedToBottom[uf.find(coordinateToUF(row, col))] |= unionConnectedToBottom;
                    if (isTop && isBottom) {
                        percolated = true;
                    }
                }
            }
        }
    }

    public boolean isOpen(int row, int col) {
        // is site (row, col) open?
        checkRange(row, col);
        return gridIsOpen[row - 1][col - 1];
    }

    public boolean isFull(int row, int col) {
        // is site (row, col) full?
        return isOpen(row, col) && ufRootConnectedToTop[uf.find(coordinateToUF(row, col))];
    }

    public int numberOfOpenSites() {
        // number of open sites
        return numberOfOpenSites;
    }

    public boolean percolates() {
        // does the system percolate?
        if (n == 1) {
            return gridIsOpen[0][0];
        }
        return percolated;
    }

    public static void main(String[] args) {
        // test client (optional)
        Percolation percolation = new Percolation(3);
        for (int i = 1; i <= 3; ++i) {
            percolation.open(i, 3);
            System.out.println(percolation.percolates());
        }
        percolation.open(3, 1);
        System.out.println(percolation.isFull(3, 1));
        percolation.open(3, 2);
        System.out.println(percolation.isFull(3, 1));
    }
}
