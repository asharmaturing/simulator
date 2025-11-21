/**
 * Canvas Renderer for Circuit Visualization
 * Handles drawing components, wires, and measurements on canvas
 */

class CanvasRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw a resistor component
     */
    drawResistor(x, y, width = 40, height = 15) {
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        
        // Draw rectangle
        this.ctx.strokeRect(x, y - height / 2, width, height);
        
        // Draw connection points
        this.ctx.beginPath();
        this.ctx.arc(x - 20, y, 3, 0, 2 * Math.PI);
        this.ctx.arc(x + width + 20, y, 3, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    /**
     * Draw an LED component
     */
    drawLED(x, y, size = 15) {
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    /**
     * Draw a wire/connection
     */
    drawWire(x1, y1, x2, y2, highlighted = false) {
        this.ctx.strokeStyle = highlighted ? '#ff0000' : '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    /**
     * Draw a node/junction
     */
    drawNode(x, y, radius = 5) {
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    /**
     * Draw voltage measurement on component
     */
    drawVoltageMeasurement(x, y, voltage) {
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`\${voltage.toFixed(2)}V`, x, y);
    }

    /**
     * Draw current measurement on component
     */
    drawCurrentMeasurement(x, y, current) {
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`\${current.toFixed(2)}A`, x, y);
    }

    /**
     * Set canvas dimensions
     */
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Pan view
     */
    pan(dx, dy) {
        this.offsetX += dx;
        this.offsetY += dy;
    }

    /**
     * Zoom view
     */
    zoom(factor) {
        this.scale *= factor;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasRenderer;
}