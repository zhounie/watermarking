interface Options {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    opacity?: number;
    padding?: number;
    rotation?: number;
    width?: number;
    height?: number;
}
export default function (dom: HTMLElement, content: string, config?: Options): {
    removeWatermark?: undefined;
} | {
    removeWatermark: () => void;
};
export {};
