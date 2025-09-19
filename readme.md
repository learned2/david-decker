# David O. Decker - Artist Tribute Website

A tribute website showcasing the artwork and life of David O. Decker (1936-2017), professor and mixed-media artist. 
Created by: Stan Usovicz [github.com/learned2] in September 2025. 

## Adding New Artwork

### Step 1: Add Photos

1. Save your artwork images as jpg files (please use 1200x1600 pixle images for wide pieces and 1600x1200 for tall pieces for consistency)
2. Name them using the format: `photo48.jpg`, `photo49.jpg`, etc. (continue numbering from 47)
3. Place the files in the `data/photos/` folder

### Step 2: Update the Gallery Data

1. Open the `data/artworks.json` file
2. Add a new entry for each artwork using this format:

```json
{
  "title": "Artwork Title Here",
  "image": "data/photos/photo46.jpg",
  "medium": "Description of medium (e.g., 'Pen & ink on paper')",
  "year": "Year created or 'Unknown'",
  "story": "Brief description or story about the piece",
  "tags": ["category1", "category2"]
}
```

### Available Tags

Use these tags to categorize artworks:
- `"ink"` - Pen & Ink works
- `"wood"` - Wood Reliefs
- `"etch"` - Intaglio prints
- `"jazz"` - Jazz-themed pieces
- `"lit"` - Literature-themed pieces
- `"litho"` = Lithographs

### Example Entry

```json
{
  "title": "Morning Light",
  "image": "data/photos/photo46.jpg",
  "medium": "Pen & ink on paper",
  "year": "1985",
  "story": "A delicate study of light filtering through trees, capturing the quiet beauty of dawn.",
  "tags": ["ink"]
}
```

**Important:** Make sure to add a comma after the previous entry in the JSON file, and ensure proper formatting to avoid errors.

## Technical Notes

- The website automatically loads and displays new artworks when the JSON is updated
- Images are optimized for web display
- The site includes filtering by artwork category and a modal gallery view