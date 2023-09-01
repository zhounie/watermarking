interface Options {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    opacity?: number;
    padding?: number;
    rotation?: number;
    width?: number;
    height?: number;
    type?: 'image' | 'text';
}
export default function (dom: HTMLElement, content: string, config?: Options): Promise<{
    removeWatermark?: undefined;
} | {
    removeWatermark: () => void;
}>;
export {};
