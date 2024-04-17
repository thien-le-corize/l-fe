export function calculateLoanPayments(interestRate: number, loanTerm: number, totalAmount: number) {
     const monthlyInterestRate = interestRate / 12; // Lãi suất hàng tháng
    const numberOfPayments = loanTerm; // Số kỳ vay
    const loanAmount = totalAmount; // Số tiền vay

    const payments = [];
    let remainingAmount = loanAmount;
    let totalPayment = 0; // Khởi tạo biến tổng số tiền phải trả

    for (let i = 1; i <= numberOfPayments; i++) {
        // Tính số tiền phải trả hàng tháng bằng công thức lãi suất lãi kép
        const monthlyPayment = loanAmount / numberOfPayments + remainingAmount * monthlyInterestRate; // Gốc + Lãi
        
        // Tạo đối tượng với thông tin về kỳ và số tiền phải trả
        const paymentInfo = {
            id: i,
            ky: i,
            soTienPhaiTra: Math.round(monthlyPayment)
        };

        // Thêm đối tượng vào mảng kết quả
        payments.push(paymentInfo);

        // Cộng vào tổng số tiền phải trả
        totalPayment += paymentInfo.soTienPhaiTra;

        // Giảm số tiền còn lại cho các kỳ sau
        remainingAmount -= loanAmount / numberOfPayments;
    }

    return { payments, totalPayment }; // Trả về cả mảng và tổng số tiền phải trả
}
