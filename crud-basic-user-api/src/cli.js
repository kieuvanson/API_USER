const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const API_URL = 'http://localhost:4000';

function showMenu() {
  console.clear();
  console.log('=== USER MANAGEMENT SYSTEM ===');
  console.log('1. Xem danh sách người dùng');
  console.log('2. Tìm kiếm một người theo tên');
  console.log('3. Thêm người dùng mới');
  console.log('4. Cập nhật thông tin người dùng');
  console.log('5. Xóa người dùng');
  console.log('0. Thoát');
  console.log('===========================');
}

async function getAllUsers() {
  try {
    const url = `${API_URL}/users`;
    console.log('Đang kết nối tới:', url);
    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      console.log(`\nDanh sách người dùng (Tổng: ${response.data.length}):`);
      response.data.forEach(user => {
        console.log(`ID: ${user.id}`);
        console.log(`Tên: ${user.name}`);
        console.log(`Email: ${user.email}`);
        console.log(`Số điện thoại: ${user.phone || 'N/A'}`);
        console.log(`Avatar: ${user.avatar || 'N/A'}`);
        console.log(`Ngày tạo: ${user.created_at ? new Date(user.created_at).toLocaleString('vi-VN') : 'N/A'}`);
        console.log('-------------------------');
      });
    } else {
      console.log('\nKhông có người dùng nào.');
    }
  } catch (error) {
    console.error('Lỗi kết nối:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('Không thể kết nối đến server. Hãy đảm bảo server đang chạy ở port 4000');
    }
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
  }
  promptUser();
}

async function getUserByName() {
  rl.question('\nNhập tên người cần tìm: ', async (name) => {
    try {
      const url = `${API_URL}/users/search?name=${encodeURIComponent(name)}`;
      console.log('Đang kết nối tới:', url);
      const response = await axios.get(url);

      if (response.data) {
        console.log('\nThông tin người dùng:');
        console.log(`ID: ${response.data.id}`);
        console.log(`Tên: ${response.data.name}`);
        console.log(`Email: ${response.data.email}`);
        console.log(`Số điện thoại: ${response.data.phone || 'N/A'}`);
        console.log(`Avatar: ${response.data.avatar || 'N/A'}`);
        console.log(`Ngày tạo: ${response.data.created_at ? new Date(response.data.created_at).toLocaleString('vi-VN') : 'N/A'}`);
      } else {
        console.log('\nKhông tìm thấy người dùng.');
      }
    } catch (error) {
      console.error('Lỗi:', error.response?.data?.message || error.message);
    }
    promptUser();
  });
}

async function createUser() {
  console.log('\nNhập thông tin người dùng mới:');
  rl.question('Tên: ', (name) => {
    rl.question('Email: ', (email) => {
      rl.question('Số điện thoại (có thể để trống): ', (phone) => {
        rl.question('Avatar URL (có thể để trống): ', async (avatar) => {
          try {
            const response = await axios.post(`${API_URL}/users`, {
              name,
              email,
              phone: phone || null,
              avatar: avatar || null
            });
            console.log('\nĐã thêm người dùng thành công:');
            console.log(`ID: ${response.data.id}`);
            console.log(`Tên: ${response.data.name}`);
            console.log(`Email: ${response.data.email}`);
          } catch (error) {
            console.error('Lỗi:', error.response?.data?.message || error.message);
          }
          promptUser();
        });
      });
    });
  });
}

async function updateUser() {
  rl.question('\nNhập ID người dùng cần cập nhật: ', (id) => {
    console.log('\nNhập thông tin mới (để trống nếu không muốn cập nhật):');
    rl.question('Tên mới: ', (name) => {
      rl.question('Email mới: ', (email) => {
        rl.question('Số điện thoại mới: ', (phone) => {
          rl.question('Avatar URL mới: ', async (avatar) => {
            const updateData = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (phone) updateData.phone = phone;
            if (avatar) updateData.avatar = avatar;

            try {
              const response = await axios.put(`${API_URL}/users/${id}`, updateData);
              console.log('\nĐã cập nhật thông tin thành công:');
              console.log(`ID: ${response.data.id}`);
              console.log(`Tên: ${response.data.name}`);
              console.log(`Email: ${response.data.email}`);
            } catch (error) {
              console.error('Lỗi:', error.response?.data?.message || error.message);
            }
            promptUser();
          });
        });
      });
    });
  });
}

async function deleteUser() {
  rl.question('\nNhập ID người dùng cần xóa: ', async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      console.log('\nĐã xóa người dùng thành công!');
    } catch (error) {
      console.error('Lỗi:', error.response?.data?.message || error.message);
    }
    promptUser();
  });
}

async function handleChoice(choice) {
  switch (choice) {
    case '1':
      await getAllUsers();
      break;
    case '2':
      await getUserByName();
      break;
    case '3':
      await createUser();
      break;
    case '4':
      await updateUser();
      break;
    case '5':
      await deleteUser();
      break;
    case '0':
      console.log('Tạm biệt!');
      rl.close();
      process.exit(0);
    default:
      console.log('Lựa chọn không hợp lệ!');
      promptUser();
  }
}

let isFirstRun = true;

function promptUser() {
  if (isFirstRun) {
    isFirstRun = false;
    showMenu();
    rl.question('\nNhập lựa chọn của bạn: ', handleChoice);
  } else {
    console.log('\n');
    console.log('===========================');
    console.log('Nhấn Enter để quay lại menu...');
    rl.question('', () => {
      showMenu();
      rl.question('\nNhập lựa chọn của bạn: ', handleChoice);
    });
  }
}

// Cài đặt axios để xử lý lỗi tốt hơn
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      error.message = error.response.data.message || error.message;
    }
    return Promise.reject(error);
  }
);

console.log('Đang khởi động ứng dụng...');
promptUser();