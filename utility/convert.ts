export function stringToHslColor(str: string, saturation = 60, lightness = 70) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Calculate hue from hash, ensuring it's within 0-360 degrees
    const h = hash % 360;
    // Use default saturation (s) and lightness (l) if not provided
    return `hsl(${h}, ${saturation}%, ${lightness}%)`;
}
