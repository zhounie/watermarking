# watermarking

Easily add watermarks to your web pages for branding, copyright protection, and content security.

## Installation

Using npm:
``` bash
$ npm install watermarking
```
Using yarn:

```bash
$ yarn add watermarking
```

Using pnpm:

```bash
$ pnpm add watermarking
```

## Usage

Here's a simple example to demonstrate how to use watermarking:

```javascript
import watermarking from 'watermarking';

// Add text watermark to a specific element
const element = document.getElementById(myElement)
watermarking(element, 'Watermark Text');


// Provide options, see Options
const element = document.getElementById(myElement)
watermarking(element, 'Watermark Text', Options);

// Provide remove watermark
const element = document.getElementById(myElement)
const { removeWatermark } = watermarking(element, 'Watermark Text', Options);

For more detailed usage instructions and customization options, please refer to the Documentation.
```

## Options
``` typescript
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
```

## License
This project is licensed under the MIT License.