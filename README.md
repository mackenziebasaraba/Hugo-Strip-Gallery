# Hugo-Strip-Gallery

**Hugo Strip Gallery** is a simple strip gallery shortcode.

![A demo of the shortcode](docs/demo.png)

## Usage

```
{{< strip-gallery >}}
[
    {
        "src": "image-path.jpg",
        "alt": "Accessible alternate text",
        "caption": "Image caption. *Markdown is supported.*"
    },
    {
        "src": "second-image-path.jpg",
        "alt": "Second image alt text",
        "caption": "Another caption."
    }
]
{{</ strip-gallery >}}
```

All image files must be within the same page bundle as the Markdown file.
