$(document).ready(function () {
  function tinhTongSoLe() {
    let tong = 0;
  
    for (let i = 1; i < 10; i ++) {
        if(i % 2 != 0){
          tong += i;
        }
    }
  
    return tong;
  }
  
  console.log(tinhTongSoLe());
})