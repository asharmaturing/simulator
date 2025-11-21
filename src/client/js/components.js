/**
 * Component Library
 * Defines available components for circuit simulation
 */

const ComponentLibrary = {
    resistor: {
        type: 'resistor',
        name: 'Resistor',
        symbol: 'R',
        defaultValue: 1000,
        unit: 'Ω',
        icon: '▬',
        properties: ['resistance']
    },
    capacitor: {
        type: 'capacitor',
        name: 'Capacitor',
        symbol: 'C',
        defaultValue: 1e-6,
        unit: 'F',
        icon: '||',
        properties: ['capacitance']
    },
    inductor: {
        type: 'inductor',
        name: 'Inductor',
        symbol: 'L',
        defaultValue: 1e-3,
        unit: 'H',
        icon: '~~~',
        properties: ['inductance']
    },
    battery: {
        type: 'battery',
        name: 'Battery',
        symbol: 'V',
        defaultValue: 5,
        unit: 'V',
        icon: '⊕⊖',
        properties: ['voltage']
    },
    led: {
        type: 'led',
        name: 'LED',
        symbol: 'D',
        defaultValue: 2,
        unit: 'V',
        icon: '◈',
        properties: ['forwardVoltage', 'maxCurrent']
    },
    switch: {
        type: 'switch',
        name: 'Switch',
        symbol: 'S',
        defaultValue: 1,
        unit: 'State',
        icon: '⊥',
        properties: ['state']
    },
    ground: {
        type: 'ground',
        name: 'Ground',
        symbol: 'GND',
        defaultValue: 0,
        unit: 'V',
        icon: '⏚',
        properties: []
    },
    voltmeter: {
        type: 'voltmeter',
        name: 'Voltmeter',
        symbol: 'VM',
        defaultValue: 0,
        unit: 'V',
        icon: 'V',
        properties: []
    },
    ammeter: {
        type: 'ammeter',
        name: 'Ammeter',
        symbol: 'AM',
        defaultValue: 0,
        unit: 'A',
        icon: 'A',
        properties: []
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLibrary;
}