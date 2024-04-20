import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const HomeSection = () => {
  return (
    <div id="main__content">
      {/* Hero Banner */}
      <section className="heroBanner">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          className="swiperBanner"
        >
          <SwiperSlide>
            <Image
              layout="fill"
              src="https://demo1.web678.com/wp-content/uploads/2021/12/2-scaled.jpg"
              alt="Tài chính đa quốc gia"
              className="no-lazyload"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              layout="fill"
              src="https://demo1.web678.com/wp-content/uploads/2021/12/1-scaled-1.jpg"
              alt="Tài chính đa quốc gia"
              className="no-lazyload"
            />
          </SwiperSlide>
        </Swiper>
      </section>
      {/* Partner */}
      <section className="partner">
        <div className="container">
          <Swiper
            className="swiperPartner"
            loop={true}
            slidesPerView={6}
            navigation={{
              nextEl: ".swiper__partner--next",
              prevEl: ".swiper__partner--prev",
            }}
          >
            {/* Slides */}
            <SwiperSlide>
              <Image
                layout="fill"
                src="https://demo1.web678.com/wp-content/uploads/2021/11/logo_partner_1.png"
                alt="partner"
              />
            </SwiperSlide>
            {/* Add more slides as needed */}
          </Swiper>
          {/* Navigation Buttons */}
          <div className="swiper-button-next swiper__partner--next">
            {/* Next Button */}
            <svg
              className="icon"
              width={6}
              height={12}
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Next Button SVG */}
            </svg>
          </div>
          <div className="swiper-button-prev swiper__partner--prev">
            {/* Previous Button */}
            <svg
              className="icon"
              width={6}
              height={12}
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Previous Button SVG */}
            </svg>
          </div>
        </div>
      </section>
      {/* About Us */}
      <section className="aboutUs" id="ve-chung-toi">
        <div className="container__global_w1200">
          <div className="row align-cen">
            <div className="col-lg-7">
              <div className="video-intro">
                <Image
                  layout="fill"
                  src="https://demo1.web678.com/wp-content/uploads/2021/11/intro-video.jpg"
                  alt="intor-video-image"
                />
                <div className="play-video" id="play-video">
                  <svg
                    className="icon"
                    width={19}
                    height={22}
                    viewBox="0 0 19 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9159 9.45341C19.2172 10.2291 19.2172 12.1136 17.9159 12.8893L3.23357 21.6414C1.90043 22.4361 0.209506 21.4755 0.209506 19.9235L0.209507 2.41918C0.209507 0.867157 1.90043 -0.0934388 3.23357 0.701247L17.9159 9.45341Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="show-intro-video" />
            </div>
            <div className="col-lg-5">
              <div className="intro__caption">
                <p className="intro__caption--mainTitle">
                  Tiên phong trong hỗ trợ vay vốn kinh doanh
                </p>
                <div className="intro__caption--description">
                  <p>
                    Thành lập năm 2017, Tài chính đa quốc gia là nền tảng công
                    nghệ tài chính chuyên kết nối các Tổ chức tín dụng đến các
                    doanh nghiệp vi mô, vừa và nhỏ (MSME) tại Việt Nam
                  </p>
                  <p>
                    Với hệ thống cơ sở dữ liệu hơn 1 triệu hộ kinh doanh và
                    doanh nghiệp vi mô, Tài chính đa quốc gia mong muốn góp phần
                    thúc đẩy tài chính toàn diện thông qua hợp tác sâu rộng với
                    các đối tác Ngân hàng và Công ty Tài chính trong lĩnh vực
                    phân phối sản phẩm, cung cấp chấm điểm tín dụng và tích hợp
                    công nghệ tài chính
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Count Number */}
      <section className="countNumber">
        <Image
          layout="fill"
          className="countNumber__background"
          src="https://demo1.web678.com/wp-content/themes/kiman-tos/assets/images/homepage/bg_counts.png"
          alt="background"
        />
        <div className="container__global_w1200">
          <div className="row align-cen">
            <div className="col-xl-6">
              <div className="counts__title">
                Tại Việt Nam
                <br />
                <span>Hộ kinh doanh &amp; Doanh nghiệp vi mô</span>
                <br />
                đóng góp
              </div>
            </div>
            <div className="col-xl-6">
              <div className="new_numbers">
                <div className="item">
                  <div className="item_wrapper">
                    <div className="wrapper">
                      <svg viewBox="0 0 100 100" className="svg">
                        <circle
                          id="pie"
                          r="22.5"
                          cx={50}
                          cy={50}
                          fill="none"
                          data-dasharray={138}
                          className="pie circle"
                        />
                      </svg>
                    </div>
                    <div className="item__caption">
                      <div className="item__number">
                        <span className="count" data-percentage={98}>
                          0
                        </span>
                        <span className="item__unit">%</span>
                      </div>
                      <p className="item__text">Doanh nghiệp</p>
                      <div className="wrapper wrapper--small">
                        <svg viewBox="0 0 100 100" className="svg">
                          <circle
                            id="pie"
                            r="22.5"
                            cx={50}
                            cy={50}
                            fill="none"
                            className="circle"
                            data-dasharray={138}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="item_wrapper">
                    <div className="wrapper">
                      <svg viewBox="0 0 100 100" className="svg">
                        <circle
                          id="pie"
                          r="22.5"
                          cx={50}
                          cy={50}
                          fill="none"
                          data-dasharray={71}
                          className="pie circle"
                        />
                      </svg>
                    </div>
                    <div className="item__caption">
                      <div className="item__number">
                        <span className="count" data-percentage={50}>
                          0
                        </span>
                        <span className="item__unit">%</span>
                      </div>
                      <p className="item__text">Việc làm</p>
                      <div className="wrapper wrapper--small">
                        <svg viewBox="0 0 100 100" className="svg">
                          <circle
                            id="pie"
                            r="22.5"
                            cx={50}
                            cy={50}
                            fill="none"
                            className="circle"
                            data-dasharray={71}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="item_wrapper">
                    <div className="wrapper">
                      <svg viewBox="0 0 100 100" className="svg">
                        <circle
                          id="pie"
                          r="22.5"
                          cx={50}
                          cy={50}
                          fill="none"
                          data-dasharray={56}
                          className="pie circle"
                        />
                      </svg>
                    </div>
                    <div className="item__caption">
                      <div className="item__number">
                        <span className="count" data-percentage={40}>
                          0
                        </span>
                        <span className="item__unit">%</span>
                      </div>
                      <p className="item__text">GDP</p>
                      <div className="wrapper wrapper--small">
                        <svg viewBox="0 0 100 100" className="svg">
                          <circle
                            id="pie"
                            r="22.5"
                            cx={50}
                            cy={50}
                            fill="none"
                            className="circle"
                            data-dasharray={56}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="row numbers">
                  <div class="col-6 col-sm-4 col-md-4 col-lg-4 numbers__item">
        <div class="numbers__item__chart">
          <div class="pie"
            data-pie='{ "percent": 98, "colorSlice": "#052e5a", "colorCircle": "#ffc107", "fontWeight": 100, "size": 140, "textPosition": "0px" }'>
          </div>
          <span class="numbers__item--chartTitle">Doanh nghiệp</span>
        </div>
      </div>
                  <div class="col-6 col-sm-4 col-md-4 col-lg-4 numbers__item">
        <div class="numbers__item__chart">
          <div class="pie"
            data-pie='{ "percent": 50, "colorSlice": "#052e5a", "colorCircle": "#ffc107", "fontWeight": 100, "size": 140, "textPosition": "0px" }'>
          </div>
          <span class="numbers__item--chartTitle">Việc làm</span>
        </div>
      </div>
                  <div class="col-6 col-sm-4 col-md-4 col-lg-4 numbers__item">
        <div class="numbers__item__chart">
          <div class="pie"
            data-pie='{ "percent": 40, "colorSlice": "#052e5a", "colorCircle": "#ffc107", "fontWeight": 100, "size": 140, "textPosition": "0px" }'>
          </div>
          <span class="numbers__item--chartTitle">GDP</span>
        </div>
      </div>
                </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* Why Us */}
      <section className="whyUs">
        <div className="container__global_w1200">
          <p className="whyUs__mainTitle">Chúng tôi cung cấp</p>
          <div className="whyUs__reason">
            <Image
              layout="fill"
              className="people"
              src="https://demo1.web678.com/wp-content/themes/kiman-tos/assets/images/homepage/people.png"
              alt="image-people"
            />
            <div className="circle-wrapper">
              <Image
                layout="fill"
                src="https://demo1.web678.com/wp-content/themes/kiman-tos/assets/images/homepage/circle.svg"
                alt="circle"
              />
              <div className="circle-animate" style={{}}>
                <div className="wrapper" style={{}}>
                  <svg viewBox="0 0 100 100" className="svg" style={{}}>
                    <circle
                      r="22.5"
                      cx={50}
                      cy={50}
                      fill="none"
                      className="circle circle--blue"
                      style={{ strokeWidth: 50 }}
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Image
              layout="fill"
              className="circle-shadow"
              src="https://demo1.web678.com/wp-content/themes/kiman-tos/assets/images/homepage/shadow.svg"
              alt=""
            />
            <div className="d-flex justify-content-between groups">
              <div className="reason-group">
                <div className="reason-group__title">
                  Cho các Tổ chức tín dụng
                </div>
                <div className="item">
                  <div className="item__inner">
                    <div className="item__icon">
                      <Image
                        layout="fill"
                        className="w-100"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/reason_1.svg"
                        alt="Đối tác tin cậy với mạng lưới phân phối toàn quốc"
                      />
                    </div>
                    <div className="item__desc">
                      Đối tác tin cậy với mạng lưới
                      <br />
                      phân phối toàn quốc
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="item__inner">
                    <div className="item__icon">
                      <Image
                        layout="fill"
                        className="w-100"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/reason_3.svg"
                        alt="Mô hình chấm điểm tín dụng độc quyền cho MSME"
                      />
                    </div>
                    <div className="item__desc">
                      Mô hình chấm điểm tín dụng
                      <br />
                      độc quyền cho MSME
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="item__inner">
                    <div className="item__icon">
                      <Image
                        layout="fill"
                        className="w-100"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/reason_2.svg"
                        alt="Nền tảng IT và tích hợp APIs sẵn sàng triển khai"
                      />
                    </div>
                    <div className="item__desc">
                      Nền tảng IT và tích hợp APIs
                      <br />
                      sẵn sàng triển khai
                    </div>
                  </div>
                </div>
              </div>
              <div className="reason-group">
                <div className="reason-group__title">
                  Cho các Chủ doanh nghiệp
                </div>
                <div className="item item--right">
                  <div className="item__inner">
                    <div className="item__desc text-right">
                      Nguồn vốn bền vững
                      <br />
                      phát triển cùng quy mô
                      <br />
                      kinh doanh
                    </div>
                    <div className="item__icon">
                      <Image
                        layout="fill"
                        className="w-100"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/reason_4.svg"
                        alt="Nguồn vốn bền vững phát triển cùng quy mô kinh doanh"
                      />
                    </div>
                  </div>
                </div>
                <div className="item item--right">
                  <div className="item__inner">
                    <div className="item__desc text-right">
                      Cung cấp thông tin 1 lần
                      <br />
                      để nhận nhiều khoản vay
                      <br />
                      và xây dựng lịch sử tín dụng
                    </div>
                    <div className="item__icon">
                      <Image
                        layout="fill"
                        className="w-100"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/reason_6.svg"
                        alt="Cung cấp thông tin 1 lần để nhận nhiều khoản vay và xây dựng lịch sử tín dụng"
                      />
                    </div>
                  </div>
                </div>
                <div className="item item--right">
                  <div className="item__inner">
                    <div className="item__desc text-right">
                      Phục vụ tại nơi kinh doanh
                      <br />
                      để tiết kiệm thời gian <br />
                      cho khách hàng
                    </div>
                    <div className="item__icon">
                      <Image
                        layout="fill"
                        className="w-100"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/reason_5.svg"
                        alt="Phục vụ tại nơi kinh doanh để tiết kiệm thời gian cho khách hàng"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Customer Stories */}
      <section className="customer-stories">
        <div className="container__global_w1200">
          <p className="customer__mainTitle">Câu chuyện khách hàng:</p>
          <div className="stories">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 stories__wrapper">
                <div className="item">
                  <div className="item__desc">
                    <p>
                      “Tôi được bạn hàng giới thiệu công ty Tài chính đa quốc
                      gia. Khi có nhu cầu nhập hàng số lượng lớn để được hưởng
                      chiết khấu cao từ nhà cung cấp nên tôi đã liên hệ và được
                      tư vấn rất nhiệt tình, hồ sơ gọn, cung cấp vốn nhanh. Nhân
                      viên Tài chính đa quốc gia rất nhẹ nhàng và dễ thương”
                    </p>
                  </div>
                  <div className="author">
                    <div className="author__image">
                      <Image
                        layout="fill"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/z2118465494999_b43c4e885046cd49f48d1cde6dd332e9.jpg"
                        alt=""
                      />
                    </div>
                    <div className="author__info">
                      <p className="author__name">Chị Thương</p>
                      <p className="author__postion">Shop nệm, giường</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 stories__wrapper">
                <div className="item">
                  <div className="item__desc">
                    <p>
                      “Tôi là chủ quán ăn và cần vốn vay để mua trang thiết bị,
                      đồ dùng trong quán. Tôi đã liên hệ với nhân viên của công
                      ty Tài chính đa quốc gia và được nhân viên hỗ trợ tư vấn
                      rất nhiệt tình và dễ chịu. Hồ sơ làm rất nhanh. Vì vậy mà
                      tôi đã xoay được vốn lúc khó khăn”
                    </p>
                  </div>
                  <div className="author">
                    <div className="author__image">
                      <Image
                        layout="fill"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/z2118467161893_4bd604c4956848a2d1609386187ea7de.jpg"
                        alt=""
                      />
                    </div>
                    <div className="author__info">
                      <p className="author__name">Anh Liêm</p>
                      <p className="author__postion">Nhà hàng</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 stories__wrapper">
                <div className="item">
                  <div className="item__desc">
                    <p>
                      “Tôi được nhân viên kinh doanh của Tài chính đa quốc gia
                      liên hệ tư vấn trực tiếp, nhận thấy sản phẩm của Tài chính
                      đa quốc gia linh động cho khách hàng và lãi suất phù hợp
                      với ngành hàng kinh doanh nên tôi đã làm hồ sơ để dùng số
                      tiền này nhập thêm hàng và mua sắm đồ đạc trong gia đình”
                    </p>
                  </div>
                  <div className="author">
                    <div className="author__image">
                      <Image
                        layout="fill"
                        src="https://demo1.web678.com/wp-content/uploads/2021/11/z2118463292842_1720e16c7eb68d98102de92c7296a6f4.jpg"
                        alt=""
                      />
                    </div>
                    <div className="author__info">
                      <p className="author__name">Chị Tâm</p>
                      <p className="author__postion">Cửa hàng văn phòng phẩm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Technology */}
      <section className="technology" id="cong-nghe">
        <Image
          layout="fill"
          className="map"
          src="https://demo1.web678.com/wp-content/themes/steen/app/public/Image/map.html"
          alt=""
        />
        <div className="container__global_w1200">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center technology__slider">
              <div className="technology__image">
                <div className="swiper-container swiperTechnology">
                  <div className="swiper-wrapper">
                    <Swiper
                      slidesPerView={1}
                      loop={true}
                      navigation={{
                        nextEl: ".swiper__technology--next",
                        prevEl: ".swiper__technology--prev",
                      }}
                    >
                      {/* Slides */}
                      <SwiperSlide>
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/11/Group-654-2.png"
                          alt="logo_partner"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/11/Group-655-2.png"
                          alt="logo_partner"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/11/Group-653-2.png"
                          alt="logo_partner"
                        />
                      </SwiperSlide>
                      {/* Add more slides as needed */}
                    </Swiper>
                  </div>
                  {/* Navigation Buttons */}
                  <div className="swiper-button-next swiper__technology--next">
                    {/* Next Button */}
                    <svg
                      className="icon"
                      width={6}
                      height={12}
                      viewBox="0 0 6 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Next Button SVG */}
                    </svg>
                  </div>
                  <div className="swiper-button-prev swiper__technology--prev">
                    {/* Previous Button */}
                    <svg
                      className="icon"
                      width={6}
                      height={12}
                      viewBox="0 0 6 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Previous Button SVG */}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 technology__content">
              <div className="technology__caption">
                <p className="technology__mainTitle">Công nghệ</p>
                <div className="technology__list">
                  <div className="item">
                    <p className="item__title">
                      Công nghệ quản lý khoản vay tối ưu cho MSME
                    </p>
                    <p className="ktem__desc">
                      Hệ thống chuyên biệt, cung cấp các phương thức ghi nhận
                      thanh toán linh hoạt theo ngày, tuần, tháng… phù hợp với
                      dòng tiền kinh doanh
                    </p>
                  </div>
                  <div className="item">
                    <p className="item__title">
                      Vận hành hoàn toàn bằng app để đảm bảo hiệu quả và khả
                      năng nhân rộng
                    </p>
                    <p className="ktem__desc">
                      Tất cả các chức năng chính như quản lý bán hàng, chấm điểm
                      tín dụng, quản lý khoản vay… được quản lý hoàn toàn qua
                      app, cung cấp dữ liệu theo thời gian thực cho các Tổ chức
                      tín dụng
                    </p>
                  </div>
                  <div className="item">
                    <p className="item__title">
                      Nền tảng API để tích hợp với các sàn thương mại điện tử,
                      các ví điện tử và phần mềm SAAS
                    </p>
                    <p className="ktem__desc">
                      Chúng tôi cung cấp các công nghệ và sản phẩm đo ni đóng
                      giày để hỗ trợ sự tăng trưởng và số lượng giao dịch của
                      các doanh nghiệp online trên thị trường thương mại điện tử
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* News */}
      <section className="news">
        <div className="container__global_w1200">
          <p className="news__mainTitle">Tin tức</p>
          <div className="news__slider">
            <div className="swiper-container swiperNews">
              <div className="swiper-wrapper">
                {/* Slides */}
                <div className="swiper-slide">
                  <div className="item-news-contain">
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">16/12/2021</p>
                        <div className="item__title">
                          <a href="/" className="item__link">
                            Vốn ít kinh doanh gì bây giờ? Xu thế kinh doanh lợi
                            nhuận cao 2021
                          </a>
                        </div>
                        <div className="excerpt">
                          <p>
                            Khi chúng ta khởi nghiệp kinh doanh nhưng không có
                            nhiều vốn, suy nghĩ đầu tiên thường xuất hiện trong
                            đầu là nên chọn loại hình, sản phẩm và dịch vụ nào
                            phù hợp. Vậy hãy cùng tìm hiểu vốn ít kinh doanh gì
                            bây giờ và xu thế kinh doanh lợi nhuận cao 2021 […]
                          </p>
                        </div>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/88977935-y-tuong-kinh-doanh-it-v-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="Vốn ít kinh doanh gì bây giờ? Xu thế kinh doanh lợi nhuận cao 2021"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">16/12/2021</p>
                        <div className="item__title">
                          <a href="/" className="item__link">
                            Kinh nghiệm mở shop quần áo với 30 triệu có lợi
                            nhuận cao
                          </a>
                        </div>
                        <div className="excerpt">
                          <p>
                            Nếu Chủ Kinh Doanh mở shop quần áo với nguồn vốn 100
                            triệu đồng, thì mọi việc sẽ trở nên dễ dàng và đơn
                            giản hơn. Nhưng nếu Chủ Kinh Doanh chỉ có 30 triệu
                            đồng, việc mở shop quần áo liệu có khả thi? Hãy cùng
                            tìm hiểu mở shop quần áo cần bao […]
                          </p>
                        </div>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/mo-shop-quan-ao-voi-30-trieu-1-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="Kinh nghiệm mở shop quần áo với 30 triệu có lợi nhuận cao"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">16/12/2021</p>
                        <div className="item__title">
                          <a href="/" className="item__link">
                            Các hình thức vay ngân hàng phổ biến &amp; Lãi suất
                            thấp 2021
                          </a>
                        </div>
                        <div className="excerpt">
                          <p>
                            Hiện nay, hầu hết cả các ngân hàng đều cung cấp
                            những sản phẩm vay với nhiều hình thức đa dạng, phù
                            hợp với nhu cầu vay vốn của doanh nghiệp. Để giúp
                            doanh nghiệp có góc nhìn bao quát hơn về các các
                            hình thức vay tiền ngân hàng và lãi suất thấp 2021,
                            […]
                          </p>
                        </div>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/vay-von-ngan-hang-1-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="Các hình thức vay ngân hàng phổ biến & Lãi suất thấp 2021"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">16/12/2021</p>
                        <div className="item__title">
                          <a href="/" className="item__link">
                            Các hình thức huy động vốn của doanh nghiệp &amp;
                            Lãi suất 2021
                          </a>
                        </div>
                        <div className="excerpt">
                          <p>
                            Trong nền kinh tế hiện nay, doanh nghiệp có thể huy
                            động vốn từ nhiều nguồn khác nhau nhằm đáp ứng nhu
                            cầu cho hoạt động sản xuất kinh doanh. Đồng thời,
                            việc này cũng góp phần giải phóng các nguồn tài
                            chính trong nền kinh tế một cách hiệu quả. Vậy cùng
                            tìm hiểu […]
                          </p>
                        </div>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/unnamed-7-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="Các hình thức huy động vốn của doanh nghiệp & Lãi suất 2021"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="item-news-contain">
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">16/12/2021</p>
                        <p className="item__title">
                          <a href="/" className="item__link">
                            3 cách vay tiền nhanh trong ngày không thế chấp
                            &amp; Lãi suất 2021
                          </a>
                        </p>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/vay-tien-nhanh-khong-the-chap-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="3 cách vay tiền nhanh trong ngày không thế chấp & Lãi suất 2021"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">16/12/2021</p>
                        <p className="item__title">
                          <a href="/" className="item__link">
                            Các hình thức vay vốn kinh doanh lãi suất thấp &amp;
                            Điều kiện vay 2021
                          </a>
                        </p>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/AvoidBeingBrokeSeries_1-705x705-1-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="Các hình thức vay vốn kinh doanh lãi suất thấp & Điều kiện vay 2021"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">16/12/2021</p>
                        <p className="item__title">
                          <a href="/" className="item__link">
                            Hỗ trợ vay vốn kinh doanh lãi suất hấp dẫn, thủ tục
                            nhanh chóng
                          </a>
                        </p>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/qG-bcJT0leuCCQnv33G7cpxcftx1O3vG-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="Hỗ trợ vay vốn kinh doanh lãi suất hấp dẫn, thủ tục nhanh chóng"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="item-news__child">
                      <div className="item-news__child--caption">
                        <p className="item__date">15/12/2021</p>
                        <p className="item__title">
                          <a href="/" className="item__link">
                            Lãi suất vay vốn kinh doanh nhỏ lẻ 2021, Điều kiện
                            &amp; Thủ tục vay
                          </a>
                        </p>
                      </div>
                      <div className="item-news__child--image">
                        <Image
                          layout="fill"
                          src="https://demo1.web678.com/wp-content/uploads/2021/12/2G3ZwtA-380x240.jpg"
                          className="Image-fluid wp-post-image"
                          alt="Lãi suất vay vốn kinh doanh nhỏ lẻ 2021, Điều kiện & Thủ tục vay"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* If we need pagination */}
              <div className="swiper-pagination" />
              <div className="swiper-button-next swiper__news--next">
                <svg
                  className="icon"
                  width={6}
                  height={12}
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.77029 4.55329L0.790182 0.754096C0.492792 0.470224 0.000175862 0.681015 0.000175808 1.09214C0.000175791 1.21608 0.0494121 1.33495 0.137053 1.42259L4.00735 5.29289C4.39788 5.68342 4.39788 6.31658 4.00735 6.70711L0.137052 10.5774C0.0494108 10.665 0.000174519 10.7839 0.000174502 10.9079C0.000174447 11.319 0.49279 11.5298 0.79018 11.2459L4.77029 7.44671C5.59568 6.65883 5.59568 5.34117 4.77029 4.55329Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="swiper-button-prev swiper__news--prev">
                <svg
                  className="icon"
                  width={6}
                  height={12}
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.77029 4.55329L0.790182 0.754096C0.492792 0.470224 0.000175862 0.681015 0.000175808 1.09214C0.000175791 1.21608 0.0494121 1.33495 0.137053 1.42259L4.00735 5.29289C4.39788 5.68342 4.39788 6.31658 4.00735 6.70711L0.137052 10.5774C0.0494108 10.665 0.000174519 10.7839 0.000174502 10.9079C0.000174447 11.319 0.49279 11.5298 0.79018 11.2459L4.77029 7.44671C5.59568 6.65883 5.59568 5.34117 4.77029 4.55329Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Collaborations */}
      <section className="collaborations">
        <div className="container__global_w1200">
          <p className="collaborations__mainTTitle">Hợp tác</p>
          <div className="row collaborations__box">
            <div className="col-lg-6 collaborations__box--item">
              <div className="school">
                <div className="school__logo">
                  <Image
                    layout="fill"
                    src="https://demo1.web678.com/wp-content/uploads/2021/11/school_1.png"
                    alt="Chương trình Thực tập sinh với Fulbright"
                  />
                </div>
                <div className="school__caption">
                  <p className="school__name">
                    Chương trình Thực tập sinh với Fulbright
                  </p>
                  <div className="school__desc">
                    <p>
                      Chúng tôi là tổ chức đối tác cung cấp các vị trí thực tập
                      có lương cho sinh viên đại học Fulbight nhằm giúp xây dựng
                      thế hệ doanh nhân và lãnh đạo mới tại Việt Nam
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 collaborations__box--item">
              <div className="school">
                <div className="school__logo">
                  <Image
                    layout="fill"
                    src="https://demo1.web678.com/wp-content/uploads/2021/11/school_2.png"
                    alt="Chương trình Thực tập quốc tế với HBS"
                  />
                </div>
                <div className="school__caption">
                  <p className="school__name">
                    Chương trình Thực tập quốc tế với HBS
                  </p>
                  <div className="school__desc">
                    <p>
                      Chúng tôi phối hợp cùng Đại học Harvard tổ chức các dự án
                      khảo sát thực địa để giúp các ứng viên MBA khám phá sự
                      giao thoa giữa tài chính, công nghệ và doanh nghiệp vi mô
                      tại TP. HCM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          layout="fill"
          className="collaborations__background"
          src="https://demo1.web678.com/wp-content/themes/kiman-tos/assets/images/homepage/bg_collaborations.png"
          alt=""
        />
      </section>
    </div>
  );
};
