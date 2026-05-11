# Service-Based Gallery System

## 🎯 How It Works

Clients can now add images to service folders and they'll automatically appear in the gallery!

## 📁 Folder Structure

```
src/assets/services/
├── artificial-grass/
│   ├── README.md
│   ├── gallery-8.jpg
│   └── before-after-large.jpg
├── construction-maintenance/
│   ├── README.md
│   └── gallery-11.jpg
├── labour-hire/
│   └── README.md
├── sand-removal/
│   ├── README.md
│   └── gallery-18.jpg
└── handyman/
    ├── README.md
    └── before_HANDYMAN.jpg
```

## 🚀 Adding New Images

### For Clients:
1. **Navigate to**: `src/assets/services/[service-name]/`
2. **Add images**: Place JPG, PNG, or WEBP files
3. **Automatic detection**: Images appear in gallery automatically
4. **Size control**: Add size suffix to filename

### Size Options:
- **Default**: `image.jpg` → Medium size
- **Small**: `image-small.jpg` → Square (1:1)
- **Large**: `image-large.jpg` → Wide (16:9), spans 2 columns
- **Tall**: `image-tall.jpg` → Portrait (3:4)
- **Wide**: `image-wide.jpg` → Ultra-wide (16:7), spans 2 columns

### Example:
```
src/assets/services/artificial-grass/
├── backyard-installation.jpg       (medium size)
├── front-yard-large.jpg          (large size)
├── side-view-tall.jpg           (tall size)
└── detail-wide.jpg              (wide size)
```

## 🔄 Automatic Process

1. **Image Detection**: System scans service folders on build
2. **Label Generation**: Creates readable labels from filenames
3. **Size Assignment**: Extracts size from filename suffix
4. **Gallery Display**: Shows images with correct layout

## 📝 Filename to Label Examples

| Filename | Gallery Label |
|-----------|----------------|
| `backyard-installation.jpg` | "Backyard Installation" |
| `front-yard-before-after.jpg` | "Front Yard Before After" |
| `commercial-project-large.jpg` | "Commercial Project" |
| `residential-work-tall.jpg` | "Residential Work" |

## 🎨 Gallery Integration

Images automatically appear in:
- **Main Gallery**: `/gallery` (all services)
- **Service Pages**: Individual service galleries
- **Service Gallery Component**: Service-specific displays
- **Dynamic Loading**: Real-time updates on build

## 🔧 Technical Details

### Image Processing:
- **Formats**: JPG, JPEG, PNG, WEBP (case insensitive)
- **Size Detection**: Filename suffix parsing
- **Label Creation**: Automatic filename-to-label conversion
- **Fallback**: Medium size if no size specified

### Build Process:
1. **Import**: `import.meta.glob()` scans service folders
2. **Transform**: Converts to gallery format
3. **Cache**: Stores in memory for performance
4. **Display**: Renders with appropriate layout

## 🚨 Important Notes

### For Development:
- Images must be in `src/assets/services/` folder
- Changes require rebuild to appear
- Use descriptive filenames for better labels

### For Production:
- Images are bundled in build (Git deployment safe)
- No external storage needed
- Images persist across deployments
- Fast loading from bundled assets

## 🎯 Benefits

✅ **Git Safe**: Images included in repository  
✅ **Automatic**: No manual configuration needed  
✅ **Flexible**: Size control via filename  
✅ **Organized**: Service-based folder structure  
✅ **Professional**: Automatic label generation  
✅ **Deployable**: Works with static hosting  

## 🔄 Maintenance

### Adding New Services:
1. Create folder: `src/assets/services/new-service/`
2. Add to autoImportImages.ts switch statement
3. Update siteConfig.ts services array
4. Images work automatically

### Updating Images:
1. Replace/add images in service folder
2. Rebuild project
3. Changes appear in gallery

This system provides a perfect balance of automation and control while maintaining deployment safety!
