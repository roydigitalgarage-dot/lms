# 🎥 Using Google Drive for Video Hosting

## ✅ How to Host Videos on Google Drive

### Step 1: Upload Videos
1. Go to https://drive.google.com
2. Click **+ New** → **File Upload**
3. Upload these 3 videos:
   - 09aThe Sleeping Beauty.mp4 (Part 1: The Curse)
   - 09bThe Sleeping Beauty.mp4 (Part 2: The Sleep)
   - 09cThe Sleeping Beauty.mp4 (Part 3: The Awakening)

### Step 2: Make Videos Public
For EACH video:
1. Right-click the file → **Share**
2. Click **Change to "Anyone with the link"**
3. Set permission to **Viewer**
4. Click **Copy link**

### Step 3: Extract File IDs
From each link, identify the FILE_ID:

**Link format:**
```
https://drive.google.com/file/d/1ABC123xyz456_FILE_ID_HERE/view?usp=sharing
                              ^^^^^^^^^^^^^^^^^^^^^^^^
                              This is the FILE_ID
```

### Step 4: Share With Me
Send me the 3 links (or just the FILE_IDs) and I'll update the code!

---

## 📝 Example:

**Your Google Drive link:**
```
https://drive.google.com/file/d/1xYz9AbC123DeFgHiJkLmNoPqRsTuVwXy/view?usp=sharing
```

**File ID:**
```
1xYz9AbC123DeFgHiJkLmNoPqRsTuVwXy
```

**Embed URL I'll use:**
```
https://drive.google.com/file/d/1xYz9AbC123DeFgHiJkLmNoPqRsTuVwXy/preview
```

---

## 🎬 How It Will Look in Code:

```html
<iframe 
  src="https://drive.google.com/file/d/FILE_ID/preview" 
  width="100%" 
  height="480"
  allow="autoplay"
  className="rounded-lg shadow-lg"
></iframe>
```

---

## ⚠️ Important Notes:

1. **Bandwidth Limits:** Google Drive has daily quotas. If too many students watch at once, videos might be temporarily blocked. For production, consider Cloudinary instead.

2. **Better Alternative:** If you have many students, I still recommend Cloudinary (completely free, no limits for your use case).

---

## 🚀 Next Steps:

**Option A: Google Drive (Quick)**
- Upload videos now
- Share 3 links with me
- I'll update code in 2 minutes
- Deploy!

**Option B: Cloudinary (Better for Production)**
- Sign up: https://cloudinary.com
- Upload 3 videos via web UI
- Share your cloud name
- I'll update code
- Never worry about bandwidth!

**Which do you prefer?** 😊
