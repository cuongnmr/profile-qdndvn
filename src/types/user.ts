interface Personal {
  id: string;
  hoten: string;
  ngaysinh: string;
  nhapngu: string;
  capbac: string;
  chucvu: string;
  donvi: string;
  vanhoa: string;
  vaodoan?: string;
  vaodang?: string;
  dantoc: string;
  tongiao: string;
  khokhan?: string;
  doandang?: string;
  sohieuqn?: string;
  capbacheso?: string;
  thanhphan: string;
  thuongtru: string;
  sothedang?: string;
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
}

interface Parent {
  hotenbo?: string;
  namsinhbo?: string;
  sdtbo?: string;
  nghenghiepbo?: string;
  nammatbo?: string;
  quequanbo?: string;
  truquanbo?: string;
  hotenme?: string;
  namsinhme?: string;
  sdtme?: string;
  nghenghiepme?: string;
  nammatme?: string;
  quequanme?: string;
  truquanme?: string;
}

export type User = Personal & Parent;
