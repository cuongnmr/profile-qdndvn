export interface User {
  id: string;
  // Thông tin cơ bản
  hoten: string;
  ngaysinh: string;
  nhapngu: string;
  capbac: string;
  chucvu: string;
  donvi: string;
  vanhoa: string;
  vaodoan: string;
  dantoc: string;
  tongiao: string;
  khokhan: boolean;
  doandang: string;
  sohieuqn?: string;
  capbacheso?: string;
  thanhphan: string;
  thuongtru: string;
  truocnhapngu: string;
  truongquandoi?: string;
  nuocngoai: string;
  sotruong?: string;
  laodongchinh: boolean;
  nguoithandinuocngoai: string;
  bomebichatdocdacam: string;
  conguoitrongquandoi: string;
  phatgiamcaitao: string;
  tomtatcongtac?: string;
  vaodang?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  // Thông tin cơ bản
  hoten: string;
  ngaysinh: string;
  nhapngu: string;
  capbac: string;
  chucvu: string;
  donvi: string;
  vanhoa: string;
  vaodoan: string;
  dantoc: string;
  tongiao: string;
  khokhan: boolean;
  doandang: string;
  sohieuqn?: string;
  capbacheso?: string;
  thanhphan: string;
  thuongtru: string;
  truocnhapngu: string;
  truongquandoi?: string;
  nuocngoai: string;
  sotruong?: string;
  laodongchinh: boolean;
  nguoithandinuocngoai: string;
  bomebichatdocdacam: string;
  conguoitrongquandoi: string;
  phatgiamcaitao: string;
  tomtatcongtac?: string;
  vaodang?: string;
}

export interface UpdateUserRequest {
  id: string;
  // Thông tin cơ bản
  hoten?: string;
  ngaysinh?: string;
  nhapngu?: string;
  capbac?: string;
  chucvu?: string;
  donvi?: string;
  vanhoa?: string;
  vaodoan?: string;
  dantoc?: string;
  tongiao?: string;
  khokhan?: boolean;
  doandang?: string;
  sohieuqn?: string;
  capbacheso?: string;
  thanhphan?: string;
  thuongtru?: string;
  truocnhapngu?: string;
  truongquandoi?: string;
  nuocngoai?: string;
  sotruong?: string;
  laodongchinh?: boolean;
  nguoithandinuocngoai?: string;
  bomebichatdocdacam?: string;
  conguoitrongquandoi?: string;
  phatgiamcaitao?: string;
  tomtatcongtac?: string;
  vaodang?: string;
}

export interface UserResponse {
  success: boolean;
  data?: User | User[];
  error?: string;
}
