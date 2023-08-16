# watermarking

Easily add watermarks to your web pages for branding, copyright protection, and content security.

## Installation

Install the package using npm:

npm install watermarking


## Usage

Here's a simple example to demonstrate how to use watermarking:

```javascript
import { addWatermark } from 'watermarking';

// Add text watermark to a specific element
addWatermark('#myElement', 'Watermark Text');

// Add image watermark to the entire page
addWatermark('body', { image: 'path/to/watermark.png' });
For more detailed usage instructions and customization options, please refer to the Documentation.
```

## License
This project is licensed under the MIT License.