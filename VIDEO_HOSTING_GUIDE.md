# 🎥 Video Hosting Solutions for Vercel Deployment

## ⚠️ Problem
Vercel doesn't serve Git LFS files by default, and large videos (100MB+) won't work on the free tier.

---

## ✅ Solution 1: Cloudinary (RECOMMENDED - FREE)

### Step 1: Sign up for Cloudinary
1. Go to https://cloudinary.com/
2. Sign up for FREE account
3. Get your cloud name, API key, and API secret

### Step 2: Upload Videos
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Upload videos
cloudinary upload public/videos/English/09aThe\ Sleeping\ Beauty.mp4 --folder lms/english
cloudinary upload public/videos/English/09bThe\ Sleeping\ Beauty.mp4 --folder lms/english
cloudinary upload public/videos/English/09cThe\ Sleeping\ Beauty.mp4 --folder lms/english
```

### Step 3: Update Video URLs
Replace local paths with Cloudinary URLs:
```typescript
// Before
videoUrl: '/videos/English/09aThe Sleeping Beauty.mp4'

// After
videoUrl: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/lms/english/09aThe_Sleeping_Beauty.mp4'
```

**Pros:**
- ✅ 25GB free storage
- ✅ 25GB free bandwidth/month
- ✅ Fast CDN delivery worldwide
- ✅ Video optimization & transformations
- ✅ No build time impact

---

## ✅ Solution 2: YouTube Unlisted Videos (FREE & EASY)

### Step 1: Upload to YouTube
1. Go to YouTube Studio
2. Upload each video as "Unlisted"
3. Copy the video ID

### Step 2: Update Lesson Component
```typescript
// Instead of <video> tags, use YouTube embed:
<iframe 
  width="100%" 
  height="480"
  src="https://www.youtube.com/embed/VIDEO_ID_HERE"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  className="rounded-lg shadow-lg"
></iframe>
```

**Pros:**
- ✅ Completely free
- ✅ Unlimited bandwidth
- ✅ Fast worldwide delivery
- ✅ No storage limits

---

## ✅ Solution 3: Vercel Blob Storage (PAID)

### Step 1: Install Vercel Blob
```bash
npm install @vercel/blob
```

### Step 2: Upload Videos
```bash
vercel blob put public/videos/English/09aThe\ Sleeping\ Beauty.mp4 --token YOUR_TOKEN
```

### Step 3: Use Blob URLs
Update video paths to use blob URLs provided by Vercel.

**Pros:**
- ✅ Integrated with Vercel
- ✅ Fast delivery

**Cons:**
- ❌ Paid service (~$0.15/GB storage + bandwidth)

---

## ✅ Solution 4: Configure Vercel for Git LFS (Current Approach)

### I've created vercel.json with:
```json
{
  "buildCommand": "git lfs pull && npm run build",
  "installCommand": "git lfs install && npm install"
}
```

### Then push and redeploy:
```bash
git add vercel.json
git commit -m "Add Vercel Git LFS support"
git push origin main
```

**Issues:**
- ⚠️ Increases build time significantly
- ⚠️ May timeout on large files
- ⚠️ 100MB file might still fail
- ⚠️ Uses Vercel build minutes (limited on free tier)

---

## 🎯 MY RECOMMENDATION

**Use Cloudinary (Solution 1)** because:
1. ✅ FREE forever
2. ✅ Fast CDN worldwide
3. ✅ No Vercel build impact
4. ✅ Better video streaming
5. ✅ Can resize/optimize videos automatically

---

## 🚀 Quick Start with Cloudinary

1. **Sign up:** https://cloudinary.com/users/register/free
2. **Get credentials** from dashboard
3. **Upload via web UI:**
   - Media Library → Upload
   - Drag and drop your 3 videos
   - Copy the URLs

4. **Update mockData.ts:**
```typescript
{
  _id: 'eng9_class4',
  title: 'The Sleeping Beauty',
  subject: 'English',
  class: 'class4',
  unit: 'Unit 9',
  content: `
    <!-- Replace src URLs -->
    <source src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/09aThe_Sleeping_Beauty.mp4" type="video/mp4">
    <source src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/09bThe_Sleeping_Beauty.mp4" type="video/mp4">
    <source src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1/09cThe_Sleeping_Beauty.mp4" type="video/mp4">
  `
}
```

5. **Deploy:** Videos will work instantly!

---

## 📞 Need Help?

Let me know which solution you prefer, and I'll help you implement it!
