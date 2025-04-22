
import { Canvas } from "@/components/Canvas";
import { HeartEffect } from "@/components/HeartEffect";

const Index = () => {
  return (
    <div className="min-h-screen heart-bg">
      {/* Hiệu ứng trái tim bay */}
      <HeartEffect />
      
      <div className="love-container">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-love-red mb-3 love-shadow floating">
            Vẽ Trái Tim Tỏ Tình
          </h1>
          <p className="text-xl text-gray-700">
            Sáng tạo trái tim nghệ thuật và gửi tặng người bạn yêu thương
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <Canvas />
          
          <div className="mt-8 p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-love-red mb-2">Hướng dẫn sử dụng:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Vẽ tự do:</strong> Dùng công cụ bút để vẽ nét theo phong cách của bạn</li>
              <li><strong>Thêm trái tim:</strong> Nhấn vào biểu tượng trái tim để thêm hình trái tim</li>
              <li><strong>Thêm chữ:</strong> Nhấn vào biểu tượng chữ để thêm lời nhắn yêu thương</li>
              <li><strong>Lưu hình ảnh:</strong> Nhấn vào biểu tượng tải xuống để lưu lại tác phẩm</li>
            </ul>
          </div>
        </main>
        
        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>Sáng tạo một trái tim nghệ thuật đầy tình yêu</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
