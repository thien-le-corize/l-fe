import React, { useCallback, useEffect, useState } from "react";
import Modal from "styled-react-modal";
import Cookie from "js-cookie";
import { formatCurrency } from "@/utils/formatCurrency";
import styled from "styled-components";
import Image from "next/image";
import MocImage from "./assets/moc.jpg";
import { httpClient } from "@/utils/httpClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const LoanRequest = ({ loanInfoSelected, close, open }: any) => {
  const [u, setU] = useState<any>({});

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      const body = {
        kyHan: loanInfoSelected.kyHan,
        laiSuat: loanInfoSelected.interestRate,
        tongVay: loanInfoSelected.loanPrice,
        userId: u._id,
        userName: u.fullName,
      };

      try {
        const res = await httpClient.post("/loan-contract", body);
        router.push(`/contract/${res.id}`);

        toast.success(
          "Yêu cầu khoản vay thành công, vui lòng chờ hệ thống xác nhận"
        );
      } catch (error) {
        toast.error("Yêu cầu khoản vay thất bại");
      }
    },
    [
      loanInfoSelected?.interestRate,
      loanInfoSelected?.kyHan,
      loanInfoSelected?.loanPrice,
      router,
      u._id,
      u.fullName,
    ]
  );

  useEffect(() => {
    const userJson = Cookie.get("user");

    if (userJson) {
      const a = JSON.parse(userJson);
      setU(a);
    }
  }, []);

  return (
    <div>
      <StyledModal
        isOpen={open}
        onBackgroundClick={close}
        onEscapeKeydown={close}
      >
        <div style={{ padding: "20px" }}>
          <h5 className="text-center">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
          <h5 className="text-center" style={{ textDecoration: "underline" }}>
            ĐỘC LẬP - TỰ DO - HANH PHÚC
          </h5>
          <h4 className="text-center my-4 font-bold text-3xl">
            HỢP ĐỒNG VAY VỐN
          </h4>
          <p className="text-center" style={{ marginBottom: "10px" }}>
            <i>Số HĐ: </i>
          </p>
          <p>
            <i>- Căn cứ Bộ Luật Dân sự năm 2015;</i>
          </p>
          <p>
            <i>- Căn cứ Luật Ngân hàng nhà nước Việt nam năm 2010;</i>
          </p>
          <p>
            Hôm nay tại địa chỉ <b>Tài chính đa quốc gia</b>, chúng tôi gồm:
          </p>
          <p>
            <strong>1. Bên A (Bên cho vay):</strong>
            <strong> Tài chính đa quốc gia</strong>
          </p>
          <p>
            <span>Mã số thuế: </span>
            <span> 0100283873-022</span>
          </p>
          <p>
            <span>Địa chỉ: </span>
            <span>
              {" "}
              259 Trần Hưng Đạo, Phường Cô Giang, Quận 1 , Thành phố Hồ Chí Minh
            </span>
          </p>
          <p>
            <span>Điện thoại: </span>
            <span> 1900252576</span>
          </p>
          <p>
            <span>Đại diện: </span>
            <strong> Mai Thị Dung</strong>
          </p>
          <p>
            <span>Chức vụ: </span>
            <span> GIÁM ĐỐC</span>
          </p>
          <p>
            <strong>2. Bên B (Bên vay):</strong>
            <strong>{u.fullName}</strong>
          </p>
          <p>
            <span>Số CCCD/CMND: </span>
            <span>{u.cmnd}</span>
          </p>
          <p>
            <span>Ngày sinh: </span>
            <span>{u.day_of_birth}</span>
          </p>
          <p>
            <span>Địa chỉ: </span>
            <span>{u.address}</span>
          </p>
          <p>
            <span>Điện thoại: </span>
            <span>{u.phoneNumber}</span>
          </p>
          <p>
            Hai bên thống nhất việc Bên A cho Bên B vay tiền tín chấp theo theo
            các điều khoản, điều kiện dưới đây:
          </p>
          <p>
            <b>Điều 1: Nội dung cho vay</b>
          </p>
          <p>
            Tổng số tiền vay bằng số là{" "}
            {formatCurrency(loanInfoSelected.loanPrice)} đ
          </p>
          <p>
            <b>Điều 2: Mục đích sử dụng tiền vay</b>
          </p>
          <p>Số tiền vay sẽ được sử dụng vào mục đích tiêu dùng của bên B</p>
          <p>
            <b>Điều 3: Thời hạn cho vay</b>
          </p>
          <p>3.1. Thời hạn cho vay là {loanInfoSelected.kyHan} tháng, </p>
          <p>
            <b>Điều 4: Lãi suất cho vay</b>
          </p>
          <p>
            <span>
              4.1. Lãi suất cho vay là {loanInfoSelected.interestRate * 100}
              %/tháng (số tiền viết bằng chữ), được tính trên tổng số tiền vay.
            </span>
          </p>
          <p>
            4.2. Tiền lãi được tính trên tổng số tiền vay, theo lãi suất cho vay
            nhân với thời gian vay. Thời gian vay được kể từ ngày Bên B nhận
            tiền vay đến ngày trả hết nợ gốc và lãi (kể cả lãi quá hạn nếu có),
            căn cứ vào các phiếu thu của văn phòng được hai bên ký nhận theo
            điều 4.3 dưới đây.
          </p>
          <p>
            4.3. Trường hợp Bên B nhận tiền vay thành nhiều lần thì mỗi lần nhận
            tiền vay, hai bên ký Phiếu thu hoặc Biên lai nhận nợ. Phiếu thu,
            biên lai nhận nợ là bộ phận không tách rời của Hợp đồng này.
          </p>
          <p>
            4.4. Lãi suất nợ quá hạn: Trường hợp đến kỳ trả nợ gốc và lãi, nếu
            Bên B không thanh toán toàn bộ nợ (gốc và lãi) mà không có thoả
            thuận nào khác với Bên A thì Bên B phải chịu lãi suất nợ quá hạn
            bằng 150% (một trăm năm mươi phần trăm) lãi suất cho vay.
          </p>
          <p>
            <b>Điều 5: Quyền và nghĩa vụ của Bên A</b>
          </p>
          <p>
            5.1. Có các quyền, nghĩa vụ theo quy định của Quy chế vay tín chấp
          </p>
          <p>5.2. Yêu cầu Bên B thực hiện các nghĩa vụ đã cam kết.</p>
          <p>
            5.3 Ngừng cho vay, chấm dứt việc cho vay, thu hồi nợ trước hạn khi
            phát hiện Bên B cung cấp thông tin sai sự thật, vi phạm hợp đồng.
          </p>
          <p>
            5.4. Chuyển tiền cho Bên B vào ví tiền điện tử của bên B tại Hợp
            đồng này
          </p>
          <p>
            5.5. Cung cấp mật khẩu rút tiền cho bên B sau khi đã chuyển tiền vào
            ví tiền điện tử.
          </p>
          <p>
            5.6. Nhận tiền lãi vay hàng tháng, lãi suất nợ quá hạn trong trường
            hợp đến kỳ thanh toán mà Bên B không trả được nợ;
          </p>
          <p>
            <b>Điều 6: Quyền và nghĩa vụ của Bên B</b>
          </p>
          <p>6.1. Yêu cầu Bên A thực hiện đúng các nghĩa vụ đã cam kết.</p>
          <p>
            6.2. Toàn quyền sở hữu và sử dụng số tiền bên A đã chuyển vào ví
            tiền điện tử
          </p>
          <p>
            6.3. Sử dụng tiền vay đúng mục đích và thực hiện đúng các nội dung
            khác đã thỏa thuận trong Hợp đồng vay vốn;
          </p>
          <p>
            6.4. Thanh toán đầy đủ, đúng hạn toàn bộ nợ (gốc và lãi) cho Bên A ;
          </p>
          <p>
            6.5. Chịu trách nhiệm trước trước pháp luật khi không thực hiện đúng
            cam kết theo Hợp đồng này.
          </p>
          <p>
            6.6. Hoàn toàn chịu trách nhiệm khi không làm đúng hướng dẫn của bên
            A khi để xảy ra sai xót trong quá trình giải ngân.
          </p>
          <p>
            <b>Điều 7: Chấm dứt Hợp đồng trước thời hạn</b>
          </p>
          <p>
            7.1. Hợp đồng này sẽ chấm dứt trước thời hạn khi xảy ra một trong
            các sự kiện sau:
          </p>
          <p>a) Hai Bên đồng ý chấm dứt Hợp đồng trước thời hạn</p>
          <p>b) Một trong hai bên không thực hiện nghĩa vụ của mình;</p>
          <p>
            c) Khi một bên là pháp nhân hợp nhất, chia tách hoặc chuyển giao
            quyền sở hữu mà pháp nhân mới không có mong muốn hoặc khả năng để
            tiếp tục thực hiện hợp đồng như đã thoả thuận.
          </p>
          <p>
            7.2. Khi một trong các sự kiện tại Điều 7.1 quy định ở trên xảy ra,
            bên chấm dứt trước thời hạn thông báo trước thời hạn cho bên kia 15
            ngày. Hai bên sẽ lập bản Thanh lý hợp đồng trước thời hạn và hoàn
            trả cho nhau những gì đã nhận.
          </p>
          <p>
            <b>Điều 8: Sửa đổi, bổ sung, thanh lý Hợp đồng</b>
          </p>
          <p>
            8.1. Các điều khoản trong Hợp đồng này có thể được sửa đổi, bổ sung
            theo thoả thuận của các bên. Bất kỳ sự sửa đổi, bổ sung nào phải
            được lập thành văn bản, có chữ ký của hai bên và là một bộ phận
            không tách rời của Hợp đồng này, và hoàn toàn không ảnh hưởng đến
            hiệu lực của các điều khoản khác.
          </p>
          <p>
            8.2. Hợp đồng này được thanh lý sau khi Bên B đã hoàn thành mọi
            nghĩa vụ theo quy định tại Hợp đồng này.
          </p>
          <p>
            <b>Điều 9: Giải quyết tranh chấp</b>
          </p>
          <p>
            Các tranh chấp hợp đồng này sẽ được hai bên giải quyết bằng thương
            lượng theo tinh thần bình đẳng và cùng có lợi. Trường hợp không thể
            giải quyết được bằng thương lượng, hai bên sẽ đưa tranh chấp ra giải
            quyết tại Toà án có thẩm quyền tại TP. Hồ Chí Minh.
          </p>
          <p>
            <b>Điều 10: Hiệu lực và số bản của Hợp đồng</b>
          </p>
          <p>
            10.1. Hợp đồng có hiệu lực từ ngày ký và kết thúc khi các nghĩa vụ
            đã được thực hiện xong.
          </p>
          <p>
            10.2. Hợp đồng này được lập thành hai (02) bản gốc có giá trị pháp
            lý ngang nhau,mỗi bên giữ một bản.
          </p>
          <p>
            10.3 Chữ ký điện tử của bên B có giá trị pháp lý kể từ khi bên B ký
            vào hợp đồng này.
          </p>
          <div className="flex justify-between mt-10">
            <div className="basis-6/12 flex flex-col items-center">
              <p className="text-center">ĐẠI DIỆN BÊN A</p>
              <p className="text-center">
                <i>(Ký, ghi rõ họ tên)</i>
              </p>
              <Sign className="pt-10 text-3xl">
                <b>{u.fullName}</b>
              </Sign>
            </div>
            <div className="basis-6/12 flex flex-col items-center">
              <p style={{ zIndex: 199 }}>ĐẠI DIỆN BÊN B</p>
              <p style={{ zIndex: 199 }}>
                <i>(Ký, ghi rõ họ tên)</i>
              </p>
              <Sg style={{ top: -30 }} className="relative">
                <Image
                  src={MocImage.src}
                  alt="Công ty ký"
                  width={300}
                  height={300}
                />
                <b className="absolute text-7xl font-thin bottom-32 right-20">
                  Dung
                </b>
              </Sg>
              <div
                style={{ top: -50 }}
                className="text-center font-semibold text-3xl relative"
              >
                Mai Thị Dung
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-full text-gray-200 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Gửi yêu cầu vay
          </button>
        </form>
      </StyledModal>
    </div>
  );
};

const Sign = styled.p`
  font-family: "SVN-Modisframe";
`;

const Sg = styled.p`
  font-family: "SVN-Amstirdam";
`;

const StyledModal = Modal.styled`
width: 50%;
height: 80%;
position: relative;
top: 50px;
overflow: hidden;
overflow-y: scroll;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;
