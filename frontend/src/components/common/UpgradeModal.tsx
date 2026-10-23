// frontend/src/components/common/UpgradeModal.tsx
// Cổng thanh toán VietQR Napas 24/7 & Tự Động Nhận Diện Giao Dịch SePay (MB Bank 0976294907)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
Check,
  Award,
  RefreshCw,
  QrCode,
  Copy,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { useProStore } from '../../modules/pro/useProStore';
import { useAuth } from '../../context/AuthContext';

interface UpgradeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  onNavigateHome?: () => void;
}

interface PlanOption {
  id: 'month' | '6months' | 'year' | 'lifetime';
  name: string;
  price: number;
  originalPrice: number;
  durationLabel: string;
  badge?: string;
  description: string;
}

const PRO_PLANS: PlanOption[] = [
  {
    id: 'month',
    name: 'Gói 1 Tháng',
    price: 19000,
    originalPrice: 39000,
    durationLabel: '30 ngày (19.000đ/tháng)',
    description: 'Thích hợp trải nghiệm thử phòng luyện thi AI',
  },
  {
    id: '6months',
    name: 'Gói 6 Tháng',
    price: 99000,
    originalPrice: 114000,
    durationLabel: '180 ngày (Chỉ 16.500đ/tháng)',
    badge: 'ĐƯỢC CHỌN NHIỀU NHẤT',
    description: 'Lộ trình tối ưu bứt phá từ 6.0 lên 7.5+',
  },
  {
    id: 'year',
    name: 'Gói 1 Năm',
    price: 189000,
    originalPrice: 228000,
    durationLabel: '365 ngày (Chỉ 15.700đ/tháng)',
    badge: 'TIẾT KIỆM NHẤT',
    description: 'Đồng hành dài hạn cùng mục tiêu IELTS học thuật',
  },
  {
    id: 'lifetime',
    name: 'Gói Trọn Đời (VIP)',
    price: 299000,
    originalPrice: 499000,
    durationLabel: 'Vĩnh viễn không giới hạn',
    badge: 'TRỌN ĐỜI VIP',
    description: 'Sở hữu toàn bộ phân hệ hiện tại và tương lai',
  },
];

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  onSuccess,
  onNavigateHome,
}) => {
  const { user, login } = useAuth();
  const isStoreOpen = useProStore((state) => state.isUpgradeModalOpen);
  const closeStoreModal = useProStore((state) => state.closeUpgradeModal);
  const isPro = useProStore((state) => state.isPro);
  const planName = useProStore((state) => state.planName);
  const packageExpiry = useProStore((state) => state.packageExpiry);
  const activateProPackage = useProStore((state) => state.activateProPackage);
  const resetToFree = useProStore((state) => state.resetToFree);

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isStoreOpen;
  const handleClose = propsOnClose || closeStoreModal;

  // Step flow: 'select' -> 'payment' -> 'success'
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(PRO_PLANS[1]); // Default 6 months
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [isConfirmingPaid, setIsConfirmingPaid] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);

  // Copy feedback state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Timer countdown: 15 minutes (900 seconds)
  const [countdown, setCountdown] = useState<number>(900);

  // Reset step whenever modal opens
  useEffect(() => {
    if (isOpen) {
      if (isPro) {
        setStep('success');
      } else {
        setStep('select');
      }
      setCountdown(900);
    }
  }, [isOpen, isPro]);

  // Countdown timer in payment step
  useEffect(() => {
    let interval: any = null;
    if (step === 'payment' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, countdown]);

  // Polling tự động lắng nghe Webhook SePay (kiểm tra tiền vào STK MB Bank)
  useEffect(() => {
    let pollInterval: any = null;
    if (step === 'payment' && orderData?.orderId) {
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`/api/payment/check-status/${orderData.orderId}`);
          const data = await res.json();
          if (data.success && data.status === 'completed') {
            clearInterval(pollInterval);
            const expiry =
              data.order?.expiryDate || (selectedPlan.id === 'lifetime' ? 'Vĩnh viễn' : '30 ngày');

            activateProPackage({
              packageId: selectedPlan.id,
              planName: selectedPlan.name,
              expiryDate: expiry,
              orderId: orderData.orderCode,
            });

            if (user) {
              login({
                ...user,
                isPro: true,
                proPackage: selectedPlan.name,
                proExpiry: expiry,
              });
            }

            setStep('success');
            if (onSuccess) onSuccess();

            // Tự động đóng modal sau 2 giây
            setTimeout(() => {
              handleClose();
              if (onNavigateHome) {
                onNavigateHome();
              }
            }, 2200);
          }
        } catch (err) {
          // Bỏ qua lỗi mạng polling tạm thời
        }
      }, 2000);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [step, orderData, selectedPlan, activateProPackage, onSuccess, handleClose, onNavigateHome, user, login]);

  if (!isOpen) return null;

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + ' đ';
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (e) {
      console.warn('Cannot copy to clipboard:', e);
    }
  };

  // Step 1 -> Step 2: Tạo đơn hàng VietQR
  const handleProceedToPayment = async () => {
    setIsLoadingOrder(true);
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPlan.id,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
          billingCycle: selectedPlan.durationLabel,
          userEmail: user?.email || 'dangchien2005@gmail.com',
        }),
      });

      const data = await response.json();
      if (data.success && data.order) {
        setOrderData(data.order);
        setStep('payment');
        setCountdown(900);
      } else {
        throw new Error(data.message || 'Không thể tạo đơn hàng thanh toán.');
      }
    } catch (err: any) {
      console.error('Order creation error:', err);
      // Fallback cục bộ
      const randomCode = `EDF${Math.floor(10000 + Math.random() * 90000)}`;
      const mockOrder = {
        orderId: `order_${Date.now()}`,
        orderCode: randomCode,
        packageId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        billingCycle: selectedPlan.durationLabel,
        transferContent: randomCode,
        qrUrl: `https://img.vietqr.io/image/MB-0976294907-compact2.png?amount=${selectedPlan.price}&addInfo=${randomCode}&accountName=DANG%20MINH%20CHIEN`,
        bankInfo: {
          bankName: 'MB Bank (Ngân hàng TMCP Quân Đội)',
          bankShortName: 'MB',
          accountNo: '0976294907',
          accountName: 'DANG MINH CHIEN',
        },
      };
      setOrderData(mockOrder);
      setStep('payment');
    } finally {
      setIsLoadingOrder(false);
    }
  };

  // Nút người dùng xác nhận đã chuyển khoản thành công
  const handleConfirmPaidByUser = async () => {
    setIsConfirmingPaid(true);
    setConfirmError(null);
    try {
      if (!orderData?.orderId) {
        throw new Error('Chưa có thông tin đơn hàng.');
      }

      const lookupKey = orderData.orderCode || orderData.orderId;
      const res = await fetch(`/api/payment/confirm-paid/${lookupKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderCode: orderData.orderCode,
          amount: orderData.amount,
          packageId: selectedPlan.id,
          planName: selectedPlan.name,
          userEmail: user?.email || 'dangchien2005@gmail.com',
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setConfirmError(
          data?.message ||
            'Hệ thống chưa tìm thấy giao dịch tiền vào tài khoản MB Bank. Vui lòng kiểm tra lại app ngân hàng hoặc đợi trong giây lát!'
        );
        return;
      }

      const expiry =
        data.expiryDate ||
        orderData.expiryDate ||
        (selectedPlan.id === 'lifetime'
          ? 'Vĩnh viễn'
          : selectedPlan.id === 'year'
          ? '365 ngày'
          : selectedPlan.id === '6months'
          ? '180 ngày'
          : '30 ngày');

      activateProPackage({
        packageId: selectedPlan.id,
        planName: selectedPlan.name,
        expiryDate: expiry,
        orderId: orderData.orderCode,
      });

      if (user) {
        login({
          ...user,
          isPro: true,
          proPackage: selectedPlan.name,
          proExpiry: expiry,
        });
      }

      setStep('success');
      if (onSuccess) onSuccess();

      // Tự động đóng modal sau 2 giây
      setTimeout(() => {
        handleClose();
        if (onNavigateHome) {
          onNavigateHome();
        }
      }, 2000);
    } catch (e: any) {
      console.error('Error confirming payment:', e);
      setConfirmError(e.message || 'Lỗi kết nối kiểm tra thanh toán.');
    } finally {
      setIsConfirmingPaid(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl bg-[#FAFAF9] border border-amber-300/60 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#064E3B] via-[#043327] to-[#064E3B] px-6 py-5 text-white relative shrink-0">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-stone-300 hover:text-white hover:bg-emerald-800/60 rounded-full transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                <span>NÂNG CẤP ENG4U PRO</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-200">
                <ShieldCheck size={13} />
                <span>VietQR &bull; Tự động kích hoạt</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-2">
              {step === 'select' && 'Chọn Gói Học & Bứt Phá Band Điểm IELTS'}
              {step === 'payment' && 'Quét Mã VietQR Ngân Hàng (Tự Động Kích Hoạt)'}
              {step === 'success' && 'Tài Khoản Đã Kích Hoạt eng4u Pro!'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5">
              {step === 'select' && 'Luyện Viết & Luyện Nói không giới hạn cùng Giám khảo AI Cambridge'}
              {step === 'payment' && 'Hệ thống tự động lắng nghe giao dịch từ MB Bank và tự đưa bạn về Trang Chủ'}
              {step === 'success' && 'Chúc mừng bạn đã sở hữu toàn bộ tính năng cao cấp không giới hạn'}
            </p>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="p-6 overflow-y-auto flex-1 space-y-5">
            {/* ================= STEP 1: SELECT PLAN ================= */}
            {step === 'select' && (
              <div className="space-y-5">
                {/* Benefits Pill Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span>Phòng Luyện Viết (Writing) không giới hạn đề</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span>AI chấm chi tiết 4 tiêu chí chuẩn IELTS</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span>Luyện Nói (Speaking) nhận diện giọng nói Web Speech</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span>Tự động tạo bài mẫu 8.0+ & lưu thẻ Anki Flashcard</span>
                  </div>
                </div>

                {/* Plan Options Cards */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                    Chọn gói thanh toán phù hợp:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRO_PLANS.map((plan) => {
                      const isSelected = selectedPlan.id === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan)}
                          className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#064E3B] bg-emerald-50/40 shadow-md ring-2 ring-emerald-500/20'
                              : 'border-stone-200 bg-white hover:border-emerald-300 hover:shadow-xs'
                          }`}
                        >
                          {plan.badge && (
                            <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#D97706] text-white uppercase tracking-wider shadow-xs">
                              {plan.badge}
                            </span>
                          )}

                          <div>
                            <div className="flex items-baseline justify-between gap-2">
                              <h4 className="text-sm font-bold text-stone-900">{plan.name}</h4>
                              <span className="text-xs text-stone-400 line-through">
                                {formatPrice(plan.originalPrice)}
                              </span>
                            </div>

                            <div className="mt-1 flex items-baseline gap-1">
                              <span className="text-lg font-serif font-bold text-[#064E3B]">
                                {formatPrice(plan.price)}
                              </span>
                            </div>

                            <p className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                              {plan.durationLabel}
                            </p>

                            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                              {plan.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                            <span className={isSelected ? 'text-[#064E3B]' : 'text-stone-400'}>
                              {isSelected ? 'Đang chọn' : 'Nhấp để chọn'}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#064E3B] bg-[#064E3B] text-white'
                                  : 'border-stone-300'
                              }`}
                            >
                              {isSelected && <Check size={10} className="stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-2">
                  <button
                    onClick={handleProceedToPayment}
                    disabled={isLoadingOrder}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#064E3B] via-[#043327] to-[#064E3B] hover:opacity-95 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoadingOrder ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <QrCode size={18} className="text-amber-300" />
                        <span>Tiếp Tục Thanh Toán VietQR ({formatPrice(selectedPlan.price)})</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: VIETQR SCANNER (AUTO LISTENING) ================= */}
            {step === 'payment' && orderData && (
              <div className="space-y-5">
                {/* Back to package select */}
                <button
                  onClick={() => setStep('select')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  <ChevronLeft size={14} />
                  <span>Chọn gói khác</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left: VietQR Code Box (5 cols) */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center bg-white p-4 rounded-3xl border border-stone-200 shadow-sm text-center">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                      Quét mã bằng app ngân hàng:
                    </span>

                    <div className="relative w-52 h-52 sm:w-56 sm:h-56 bg-stone-50 rounded-2xl overflow-hidden p-2 border border-stone-200 flex items-center justify-center shadow-inner">
                      <img
                        src={orderData.qrUrl}
                        alt="Mã VietQR Thanh Toán"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Countdown */}
                    <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold">
                      <Clock size={13} className="animate-spin" />
                      <span>Hết hạn sau: {formatTimer(countdown)}</span>
                    </div>
                  </div>

                  {/* Right: Bank Transfer Details with 1-Click Copy (7 cols) */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2.5 text-xs">
                      {/* Bank Name */}
                      <div className="flex items-center justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Ngân hàng:</span>
                        <span className="font-bold text-stone-900 text-right">
                          MB Bank (Quân Đội)
                        </span>
                      </div>

                      {/* Account Number */}
                      <div className="flex items-center justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Số tài khoản:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#064E3B]">
                            {orderData.bankInfo?.accountNo || '0976294907'}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(orderData.bankInfo?.accountNo || '0976294907', 'stk')
                            }
                            className="p-1 text-stone-500 hover:text-emerald-700 hover:bg-stone-100 rounded cursor-pointer"
                            title="Sao chép số tài khoản"
                          >
                            {copiedField === 'stk' ? (
                              <Check size={14} className="text-emerald-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Account Name */}
                      <div className="flex items-center justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Chủ tài khoản:</span>
                        <span className="font-bold text-stone-900 uppercase">
                          {orderData.bankInfo?.accountName || 'DANG MINH CHIEN'}
                        </span>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Số tiền:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-base text-[#D97706]">
                            {formatPrice(orderData.amount)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(String(orderData.amount), 'amount')}
                            className="p-1 text-stone-500 hover:text-amber-700 hover:bg-stone-100 rounded cursor-pointer"
                            title="Sao chép số tiền"
                          >
                            {copiedField === 'amount' ? (
                              <Check size={14} className="text-emerald-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Transfer Content */}
                      <div className="flex items-center justify-between py-1 bg-amber-50/80 p-2 rounded-xl border border-amber-200">
                        <div>
                          <span className="text-amber-800 font-semibold block text-[11px]">
                            Nội dung chuyển khoản (Bắt buộc):
                          </span>
                          <span className="font-mono font-extrabold text-sm text-stone-900">
                            {orderData.transferContent}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(orderData.transferContent, 'content')}
                          className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-amber-900 font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'content' ? (
                            <>
                              <Check size={12} className="text-emerald-600" />
                              <span className="text-emerald-700 text-[11px]">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span className="text-[11px]">Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500 leading-relaxed italic">
                      * Mẹo: Khi dùng app ngân hàng quét mã VietQR ở bên trái, mọi thông tin (STK, Số tiền và Nội dung) sẽ được tự động điền chính xác 100%.
                    </p>
                  </div>
                </div>

                {/* Nút bấm xác nhận: Tôi Đã Chuyển Tiền Thành Công */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleConfirmPaidByUser}
                    disabled={isConfirmingPaid}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#064E3B] hover:bg-[#043327] text-white font-bold text-sm shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer group hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isConfirmingPaid ? (
                      <>
                        <RefreshCw size={18} className="animate-spin text-amber-300" />
                        <span>Đang kiểm tra biến động số dư MB Bank...</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} className="text-amber-300 stroke-[3]" />
                        <span>Tôi Đã Chuyển Tiền Thành Công</span>
                        <ArrowRight size={16} className="text-emerald-300 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Cảnh báo nếu chưa nhận được tiền */}
                  {confirmError && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs space-y-1 animate-in fade-in">
                      <div className="font-bold flex items-center gap-1.5 text-rose-900">
                        <ShieldCheck size={14} className="text-rose-600 shrink-0" />
                        <span>Chưa ghi nhận tiền vào tài khoản:</span>
                      </div>
                      <p className="leading-relaxed pl-5 text-[11px] text-rose-700">
                        {confirmError}
                      </p>
                    </div>
                  )}

                  <p className="text-[11px] text-center text-stone-500">
                    Bấm xác nhận sau khi bạn đã chuyển khoản để hệ thống đối soát số dư MB Bank và tự động đưa bạn về Trang Chủ.
                  </p>
                </div>

                {/* Action footer */}
                <div className="flex items-center justify-center pt-2 text-xs">
                  <button
                    onClick={handleClose}
                    className="text-stone-500 hover:text-stone-800 cursor-pointer font-medium hover:underline transition-colors"
                  >
                    Để sau, tiếp tục học tập
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: SUCCESS & REDIRECT ================= */}
            {step === 'success' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner border border-emerald-300 animate-bounce">
                  <Award size={32} />
                </div>

                <div>
                  <h4 className="text-xl font-serif font-bold text-[#064E3B]">
                    Thanh Toán &amp; Kích Hoạt Thành Công!
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                    Tài khoản của bạn đã được nâng cấp lên <strong>eng4u Pro ({planName})</strong>. Đang tự động chuyển bạn về Trang Chủ trong giây lát...
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 max-w-sm mx-auto text-xs space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Gói bản quyền:</span>
                    <strong className="text-stone-900">{planName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Thời hạn sử dụng:</span>
                    <strong className="text-emerald-700">{packageExpiry}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Số lượt chấm AI:</span>
                    <strong className="text-[#064E3B]">Không giới hạn (Unlimited)</strong>
                  </div>
                </div>

                <div className="pt-3 space-y-2 max-w-sm mx-auto">
                  <button
                    onClick={() => {
                      handleClose();
                      if (onNavigateHome) onNavigateHome();
                    }}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#064E3B] hover:bg-[#043327] text-white shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Về Trang Chủ Ngay</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      resetToFree();
                      setStep('select');
                    }}
                    className="w-full py-1.5 text-[11px] text-stone-400 hover:text-stone-600 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RefreshCw size={11} />
                    <span>Thử nghiệm: Trở về gói Free</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
