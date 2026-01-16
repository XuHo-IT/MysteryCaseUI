# Detective Noir - Frontend

## 🌐 Live Demo
**Production URL:** https://detectivenoir.netlify.app/

## 📋 Tổng quan

Detective Noir là ứng dụng web frontend được xây dựng bằng React 19 và TypeScript, cung cấp giao diện người dùng cho hệ thống giải đố vụ án Mystery Case. Ứng dụng sử dụng Vite làm build tool và React Router cho routing.

## 🛠️ Công nghệ sử dụng

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool và dev server
- **React Router DOM** - Client-side routing
- **SignalR Client** - Real-time communication với backend
- **Tailwind CSS** - Styling (nếu có)

## 🚀 Cài đặt và chạy

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt

1. **Clone repository và di chuyển vào thư mục**
```bash
cd MysteryCaseUI
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình API endpoint**

Cập nhật file `services/api.ts`:
```typescript
const API_BASE_URL = 'https://mysterycaseapi.onrender.com';
```

Cập nhật file `services/chatService.ts`:
```typescript
const API_BASE_URL = "https://mysterycaseapi.onrender.com";
```

4. **Chạy development server**
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

5. **Build cho production**
```bash
npm run build
```

Output sẽ nằm trong thư mục `dist/`

## 🏗️ Cấu trúc dự án

```
MysteryCaseUI/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── cases/          # Case-related components
│   ├── clues/          # Clue components
│   ├── suspects/       # Suspect components
│   ├── chat/           # Chat components
│   └── pages/          # Page components
├── contexts/           # React contexts (AuthContext)
├── services/           # API services
│   ├── api.ts         # Main API client
│   └── chatService.ts  # SignalR chat service
├── types.ts            # TypeScript type definitions
├── constants.ts        # Constants và mock data
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## 🔐 Authentication

Ứng dụng sử dụng JWT token-based authentication:
- Token được lưu trong `localStorage`
- Token tự động được thêm vào header của mọi API request
- AuthContext quản lý trạng thái authentication

## 🔄 Real-time Features

Ứng dụng hỗ trợ real-time chat thông qua SignalR:
- Kết nối đến ChatHub trên backend
- Gửi/nhận messages real-time
- Hiển thị thông báo khi user join/leave

## 📱 Tính năng chính

- ✅ Authentication (Login/Register)
- ✅ Dashboard với danh sách vụ án
- ✅ Case Detail với tabs (Intro, Suspects, Evidence)
- ✅ Investigation Board để điều tra
- ✅ Clue System với unlock mechanism
- ✅ Suspect Profiles chi tiết
- ✅ Submit Answer & Inference
- ✅ Progress Tracking
- ✅ Leaderboard
- ✅ User Profile
- ✅ Real-time Chat
- ✅ Admin Panel (nếu có quyền)

## 🚀 Deployment

### Netlify

1. **Build command**
```bash
npm run build
```

2. **Publish directory**
```
dist
```

3. **Environment Variables** (nếu cần):
   - `VITE_API_BASE_URL` (nếu sử dụng env variables)

4. **Cấu hình redirects** (tạo file `public/_redirects`):
```
/*    /index.html   200
```

Hoặc tạo `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Các bước deploy:

1. Kết nối GitHub repository với Netlify
2. Cấu hình build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy!

## 🔧 Development

### Cấu trúc components

- **Pages**: Các trang chính (Dashboard, CaseDetail, InvestigationBoard, etc.)
- **Components**: Các component tái sử dụng
- **Services**: API clients và services
- **Contexts**: Global state management (AuthContext)

### Routing

Ứng dụng sử dụng HashRouter:
- Public routes: `/`, `/login`, `/register`, `/history`
- Protected routes: `/case-detail/:id`, `/investigation`, `/profile`, `/chat`
- Admin routes: `/create-case`, `/edit-case/:id`

### API Integration

Tất cả API calls được quản lý trong `services/api.ts`:
- Authentication APIs
- Case APIs
- Suspect APIs
- Clue APIs
- Leaderboard APIs
- Admin APIs

## 📝 Notes

- Ứng dụng sử dụng HashRouter để tương thích với static hosting
- API base URL cần được cấu hình đúng với backend production URL
- SignalR connection cần token trong query string
- CORS phải được cấu hình đúng trên backend

## 🐛 Troubleshooting

### Lỗi CORS
- Kiểm tra CORS configuration trên backend
- Đảm bảo frontend URL được thêm vào allowed origins

### Lỗi Authentication
- Kiểm tra token có được lưu trong localStorage
- Kiểm tra token có hết hạn
- Kiểm tra API endpoint có đúng

### Build errors
- Xóa `node_modules` và `package-lock.json`
- Chạy lại `npm install`
- Kiểm tra Node.js version (cần 18+)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

[Thêm license nếu có]

## 📧 Contact

[Thêm thông tin liên hệ nếu cần]
