# Environment Variables Configuration Guide

## Development Environment

### server/.env
```
MONGODB_URI=mongodb+srv://ragii62996_car_rental:ryss1234@carrental.xwfyhyc.mongodb.net
JWT_SECRET=carrental_greatstack_jwt_secret_2026
IMAGEKIT_PUBLIC_KEY=public_/Ftyf63zwV0FENDjCLqBuchxHHk=
IMAGEKIT_PRIVATE_KEY=private_o/3ASpKz93n9pAC/chtl7J4PtSw=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/luminos
PORT=4000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

### client/.env
```
VITE_BACKEND_URL=http://localhost:4000
```

### admin/.env
```
VITE_BACKEND_URL=http://localhost:4000
```

---

## Production Environment

### Railway Backend URL
After deploying on Railway, Railway will give you a URL like:
`https://car-rental-api-production.up.railway.app`

### Vercel Client - Environment Variables
```
VITE_BACKEND_URL=https://car-rental-api-production.up.railway.app
```

### Vercel Admin - Environment Variables
```
VITE_BACKEND_URL=https://car-rental-api-production.up.railway.app
```

### Railway Backend - Environment Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental
JWT_SECRET=your-production-secret-key-here
IMAGEKIT_PUBLIC_KEY=your_production_key
IMAGEKIT_PRIVATE_KEY=your_production_key
IMAGEKIT_URL_ENDPOINT=your_production_endpoint
PORT=3000
ALLOWED_ORIGINS=https://your-client.vercel.app,https://your-admin.vercel.app
```

---

## ✅ Steps to Deploy

1. Deploy Backend to Railway → Get URL
2. Update Vercel Client env with Backend URL
3. Deploy Client to Vercel → Get Client URL
4. Update Vercel Admin env with Backend URL
5. Deploy Admin to Vercel → Get Admin URL
6. Update Railway Backend ALLOWED_ORIGINS with Vercel URLs
