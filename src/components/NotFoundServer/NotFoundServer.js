import React from "react";
import "./NotFoundServer.scss";

const NotFoundServer = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            5<span>0</span>0
          </h1>
        </div>
        <p>Không thể kết nối với server</p>
        <a href="/">Trang chủ</a>
      </div>
    </div>
  );
};
export default NotFoundServer;
