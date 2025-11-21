/**
 * DC Circuit Solver
 * Solves DC circuits using nodal analysis
 */

class DCCircuitSolver {
    constructor() {
        this.components = [];
        this.nodes = new Map();
        this.voltage = new Map();
        this.current = new Map();
    }

    /**
     * Add a component to the circuit
     * @param {Object} component - Component object with type, value, node1, node2
     */
    addComponent(component) {
        this.components.push(component);
        this.registerNodes(component.node1, component.node2);
    }

    /**
     * Register nodes in the circuit
     */
    registerNodes(node1, node2) {
        if (!this.nodes.has(node1)) {
            this.nodes.set(node1, []);
        }
        if (!this.nodes.has(node2)) {
            this.nodes.set(node2, []);
        }
    }

    /**
     * Solve the circuit using Kirchhoff's laws
     */
    solve() {
        // Build conductance matrix (G) and current vector (I)
        const nodeList = Array.from(this.nodes.keys());
        const n = nodeList.length;
        
        // Initialize matrices
        const G = Array(n).fill(null).map(() => Array(n).fill(0));
        const I = Array(n).fill(0);

        // Process each component
        for (const comp of this.components) {
            const i = nodeList.indexOf(comp.node1);
            const j = nodeList.indexOf(comp.node2);

            if (comp.type === 'resistor') {
                const g = 1 / comp.value; // conductance
                G[i][i] += g;
                G[j][j] += g;
                G[i][j] -= g;
                G[j][i] -= g;
            } else if (comp.type === 'voltageSource') {
                I[i] += comp.value;
            }
        }

        // Solve V = G^-1 * I
        const V = this.gaussianElimination(G, I);
        
        // Store voltages
        nodeList.forEach((node, idx) => {
            this.voltage.set(node, V[idx] || 0);
        });

        return this.voltage;
    }

    /**
     * Gaussian elimination for solving linear equations
     */
    gaussianElimination(G, I) {
        const n = G.length;
        const A = G.map(row => [...row]);
        const b = [...I];

        // Forward elimination
        for (let i = 0; i < n; i++) {
            // Find pivot
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
                    maxRow = k;
                }
            }

            // Swap rows
            [A[i], A[maxRow]] = [A[maxRow], A[i]];
            [b[i], b[maxRow]] = [b[maxRow], b[i]];

            // Make all rows below this one 0 in current column
            for (let k = i + 1; k < n; k++) {
                const c = A[k][i] / A[i][i];
                for (let j = i; j < n; j++) {
                    A[k][j] -= c * A[i][j];
                }
                b[k] -= c * b[i];
            }
        }

        // Back substitution
        const x = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            x[i] = b[i];
            for (let j = i + 1; j < n; j++) {
                x[i] -= A[i][j] * x[j];
            }
            x[i] /= A[i][i];
        }

        return x;
    }

    /**
     * Get voltage between two nodes
     */
    getVoltage(node1, node2) {
        const v1 = this.voltage.get(node1) || 0;
        const v2 = this.voltage.get(node2) || 0;
        return Math.abs(v1 - v2);
    }

    /**
     * Get current through a resistor
     */
    getCurrent(node1, node2, resistance) {
        const v1 = this.voltage.get(node1) || 0;
        const v2 = this.voltage.get(node2) || 0;
        return (v1 - v2) / resistance;
    }

    /**
     * Reset the solver
     */
    reset() {
        this.components = [];
        this.nodes.clear();
        this.voltage.clear();
        this.current.clear();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DCCircuitSolver;
}