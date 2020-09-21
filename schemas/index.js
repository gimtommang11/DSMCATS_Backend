const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect('mongodb://suha:1234@localhost:27017/admin', {
      dbName: 'nodejs'
    }, (error) => {
      if (error) {
        console.log("몽고db 에러 발견", error);
      } else {
        console.log("몽고DB 연결 성공")
      }
    });
  }
  //몽구스 커넥션에 이벤트 달아서 에러 발생 시 에러 내용 기록, 연결 종료 시 재연결을 시도함 
  connect();
  mongoose.connection.on('error', (error) => {
    console.error("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다");
    connect();
  });
  //user스키마 , comment스키마 연결하는 부분
  require('./user');
  require('./comment');
}