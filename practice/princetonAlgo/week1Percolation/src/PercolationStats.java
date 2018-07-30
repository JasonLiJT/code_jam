import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;

public class PercolationStats {
    private final int n;
    private final int trials;
    private final double[] trialResults;
    private double mean;
    private double stddev;

    public PercolationStats(int n, int trials) {
        // perform trials independent experiments on an n-by-n grid
        if (n <= 0 || trials <= 0) {
            throw new IllegalArgumentException("Negative n or trials!");
        }
        this.n = n;
        this.trials = trials;
        this.trialResults = new double[trials];
        Percolation percolation;

        for (int i = 0; i < trials; i++) {
            percolation = new Percolation(n);
            int[] blockedSites = new int[n * n];
            for (int j = 0; j < n * n; j++) {
                blockedSites[j] = j;
            }
            StdRandom.shuffle(blockedSites);
            int currentSiteInd = 0;

            // Monte Carlo
            while (!percolation.percolates()) {
                int currentSite = blockedSites[currentSiteInd++];
                int row = rowFromZeroBased(currentSite);
                int col = colFromZeroBased(currentSite);
                percolation.open(row, col);
            }
            trialResults[i] = 1.0 * currentSiteInd / n / n;
        }
        if (n == 1) {
            this.mean = 0.5;
            // integrate (x-0.5)^2*x from 0 to 1
            this.stddev = 1.0 / 4 - 1.0 / 3 + 1.0 / 8;
        } else {
            this.mean = StdStats.mean(trialResults);
            this.stddev = StdStats.stddev(trialResults);
        }
    }

    private int rowFromZeroBased(int x) {
        return 1 + x / n;
    }

    private int colFromZeroBased(int x) {
        return 1 + x % n;
    }

    public double mean() {
        // sample mean of percolation threshold
        return this.mean;
    }

    public double stddev() {
        // sample standard deviation of percolation threshold
        return this.stddev;
    }

    public double confidenceLo() {
        // low endpoint of 95% confidence interval
        return this.mean - 1.96 * this.stddev / Math.sqrt(trials);
    }

    public double confidenceHi() {
        // high endpoint of 95% confidence interval
        return this.mean + 1.96 * this.stddev / Math.sqrt(trials);
    }

    public static void main(String[] args) {
        // test client (described below)
        PercolationStats percolationStats;
        if (args.length == 2) {
            int n = Integer.parseInt(args[0]);
            int tInput = Integer.parseInt(args[1]);
            percolationStats = new PercolationStats(n, tInput);
        } else {
            percolationStats = new PercolationStats(20, 100);
        }
        System.out.printf("%-24s= %.16f\n", "mean", percolationStats.mean());
        System.out.printf("%-24s= %.16f\n", "stddev", percolationStats.stddev());
        System.out.printf("%-24s= [%.16f, %.16f]\n", "95% confidence interval", percolationStats.confidenceLo(),
                percolationStats.confidenceHi());
    }
}
