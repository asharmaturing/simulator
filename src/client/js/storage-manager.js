/**
 * IndexedDB Storage Manager
 * Handles local storage and caching of circuits
 */

class StorageManager {
    constructor(dbName = 'CircuitSimulator', version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    /**
     * Initialize the database
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object stores
                if (!db.objectStoreNames.contains('circuits')) {
                    const circuitStore = db.createObjectStore('circuits', { keyPath: 'id', autoIncrement: true });
                    circuitStore.createIndex('name', 'name', { unique: false });
                    circuitStore.createIndex('createdAt', 'createdAt', { unique: false });
                }

                if (!db.objectStoreNames.contains('components')) {
                    db.createObjectStore('components', { keyPath: 'id', autoIncrement: true });
                }

                if (!db.objectStoreNames.contains('metadata')) {
                    db.createObjectStore('metadata', { keyPath: 'key' });
                }
            };
        });
    }

    /**
     * Save a circuit to IndexedDB
     */
    async saveCircuit(circuit) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['circuits'], 'readwrite');
            const store = transaction.objectStore('circuits');
            const request = store.add(circuit);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Load a circuit from IndexedDB
     */
    async loadCircuit(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['circuits'], 'readonly');
            const store = transaction.objectStore('circuits');
            const request = store.get(id);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Get all circuits
     */
    async getAllCircuits() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['circuits'], 'readonly');
            const store = transaction.objectStore('circuits');
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Delete a circuit
     */
    async deleteCircuit(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['circuits'], 'readwrite');
            const store = transaction.objectStore('circuits');
            const request = store.delete(id);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Update a circuit
     */
    async updateCircuit(id, circuit) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['circuits'], 'readwrite');
            const store = transaction.objectStore('circuits');
            circuit.id = id;
            const request = store.put(circuit);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Export circuit as JSON
     */
    exportCircuitAsJSON(circuit) {
        return JSON.stringify(circuit, null, 2);
    }

    /**
     * Import circuit from JSON
     */
    importCircuitFromJSON(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing circuit JSON:', error);
            return null;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}