"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowLeft, Share, Clock, 
  Delete, CreditCard, Landmark, Copy,
  Phone, Mail, Facebook, Heart
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

type Currency = 'VND' | 'USD' | 'CNY';

export default function CharityDonationPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'detail' | 'amount' | 'method' | 'qr' | 'success'>('detail');
  
  const [amount, setAmount] = useState<string>('50000');   
  const [displayAmount, setDisplayAmount] = useState<string>('50000');
  const [currency, setCurrency] = useState<Currency>('VND');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('bank');

  const [audio] = useState(() => {
    if (typeof window !== 'undefined') {
      const audioElement = new Audio('/assets/audio/nuoitung.mp3');
      audioElement.loop = true;
      return audioElement;
    }
    return null;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!audio || !isMounted || isLoading) return;
    const playAudio = () => {
      audio.play().catch(() => {});
      ['click', 'touchstart', 'keydown'].forEach(event =>
        document.removeEventListener(event, playAudio)
      );
    };
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        toast('Chạm vào màn hình để phát nhạc.', {
          icon: '🎵',
          duration: 3000,
          style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '13px' }
        });
        ['click', 'touchstart', 'keydown'].forEach(event =>
          document.addEventListener(event, playAudio, { once: true })
        );
      });
    }
    return () => {
      ['click', 'touchstart', 'keydown'].forEach(event =>
        document.removeEventListener(event, playAudio)
      );
      audio.pause();
    };
  }, [audio, isMounted, isLoading]);

  const exchangeRates: Record<Currency, number> = {
    VND: 1,
    USD: 25300,
    CNY: 3500,
  };

  const formatCurrency = (value: string, curr: Currency) => {
    if (!value) return '0';
    const num = Number(value);
    if (curr === 'VND') {
      return new Intl.NumberFormat('vi-VN').format(num);
    } else if (curr === 'USD') {
      return num.toLocaleString('en-US');
    } else {
      return num.toLocaleString('zh-CN');
    }
  };

  const getCurrencySymbol = (curr: Currency) => {
    if (curr === 'VND') return 'đ';
    if (curr === 'USD') return '$';
    return '¥';
  };

  const convertToVND = (val: string, curr: Currency): string => {
    if (curr === 'VND') return val;
    const rate = exchangeRates[curr];
    return Math.round(Number(val) * rate).toString();
  };

  const handleCurrencyChange = (newCurr: Currency) => {
    if (newCurr === currency) return;
    const vndValue = convertToVND(displayAmount, currency);
    const newDisplay = Math.round(Number(vndValue) / exchangeRates[newCurr]).toString();
    setCurrency(newCurr);
    setDisplayAmount(newDisplay);
    setAmount(vndValue);
  };

  const handleKeypadPress = (val: string) => {
    if (val === 'del') {
      setDisplayAmount(prev => prev.slice(0, -1) || '0');
    } else {
      setDisplayAmount(prev => {
        if (prev === '0') return val;
        if (prev.length > 10) return prev;
        return prev + val;
      });
    }
  };

  const handleSelectMethod = (method: string) => {
    if (method !== 'bank') {
      toast.error('Phương thức này đang bảo trì!', {
        style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '13px' },
        iconTheme: { primary: '#FFB703', secondary: '#333' }
      });
      return;
    }
    setPaymentMethod(method);
  };

  const handleCopy = (text: string, message: string = 'Đã sao chép!') => {
    navigator.clipboard.writeText(text);
    toast.success(message, {
      style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '13px' }
    });
  };

  const getVietQRUrl = () => {
    const vndAmount = convertToVND(displayAmount, currency);
    const bankId = 'techcombank';
    const accountNo = '7888888696';
    const accountName = 'VUONG THANH TUNG';
    const addInfo = `NUOITUNG ${accountNo}`;
    return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?amount=${vndAmount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
  };

  if (!isMounted) return null;

  return (
    <div className='h-[100dvh] w-full flex items-center justify-center bg-gray-900 font-sans text-gray-900 dark:text-white'>
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className='h-full w-full sm:w-[375px] bg-white dark:bg-[#0F1115] relative flex flex-col overflow-hidden shadow-2xl'>

        {isLoading && (
          <div className="absolute inset-0 z-50 bg-[#0F1115] flex flex-col items-center justify-center transition-opacity duration-500">
            <div className="relative flex justify-center items-center mb-6">
              <div className="absolute w-20 h-20 bg-yellow-500 rounded-full animate-ping opacity-20"></div>
              <div className="w-16 h-16 bg-[#FFB703] rounded-full flex items-center justify-center z-10 shadow-lg shadow-yellow-500/50">
                <Heart size={32} className="text-gray-900 fill-gray-900 animate-pulse" />
              </div>
            </div>
            <h1 className="text-white text-xl font-semibold tracking-widest uppercase">Nuôi Tùng</h1>
            <p className="text-gray-400 text-xs mt-2">Đang tải dữ liệu...</p>
          </div>
        )}

        <div className={`flex-1 flex flex-col h-full transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          
          {currentScreen === 'detail' && (
            <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-white dark:bg-[#0F1115]">
              <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="relative h-56 w-full flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                  <Image 
                    src="/assets/images/banner.jpg" 
                    alt="Cover" 
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 pt-10 text-white bg-gradient-to-b from-black/70 to-transparent pb-4">
                    <button className="p-2 bg-black/20 rounded-full backdrop-blur-sm hover:bg-black/40 transition-colors"><ArrowLeft size={18} /></button>
                    <button className="p-2 bg-black/20 rounded-full backdrop-blur-sm hover:bg-black/40 transition-colors" onClick={() => handleCopy('https://nuoitung.vercel.app/', 'Đã chép link!')}>
                      <Share size={16} />
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0F1115] rounded-t-3xl -mt-5 relative px-5 pt-6 pb-24 z-10">
                  <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Dự án Nuôi Tùng</h1>
                  
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-semibold mb-1 uppercase tracking-wider">Tạo bởi</span>
                      <div className="flex items-center gap-2">
                        <Image src="/assets/images/avatar.jpg" width={24} height={24} className="rounded-full aspect-square object-cover" alt="Creator" />
                        <span className="text-[14px] font-semibold text-gray-900 dark:text-white">Vương Thanh Tùng</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-semibold mb-1 uppercase tracking-wider">Thời hạn</span>
                      <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-semibold text-[13px] bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-lg">
                        <Clock size={14} /> 15 Ngày nữa
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-2xl font-semibold text-gray-900 dark:text-white">7.500.000 đ</span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">75% của 10.000.000 đ</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-[75%] relative"></div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-[14px] font-semibold mb-2 text-gray-900 dark:text-white">Mô tả</h2>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
                      Dự án Nuôi Tùng được thực hiện nhằm hỗ trợ phát triển và duy trì các hoạt động sáng tạo cá nhân. Sự đồng hành của bạn là nguồn động lực to lớn giúp Tùng hoàn thiện những mục tiêu đề ra. Trân trọng cảm ơn mọi sự ủng hộ.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-[14px] font-semibold mb-3 text-gray-900 dark:text-white">Thông tin liên hệ</h2>
                    <div className="bg-gray-50 dark:bg-[#1A1D24] rounded-2xl p-4 space-y-3.5 border border-gray-100 dark:border-gray-800 shadow-sm">
                      <a href="tel:0986739490" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500">
                        <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center text-green-600 dark:text-green-400"><Phone size={14} /></div>
                        <span className="font-semibold text-[14px] tracking-wide">098 673 9490</span>
                      </a>
                      <div className="h-px w-full bg-gray-200/50 dark:bg-gray-700/50"></div>
                      <a href="mailto:vtung15062005@gmail.com" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500">
                        <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center text-red-500 dark:text-red-400"><Mail size={14} /></div>
                        <span className="font-semibold text-[13px] truncate">vtung15062005@gmail.com</span>
                      </a>
                      <div className="h-px w-full bg-gray-200/50 dark:bg-gray-700/50"></div>
                      <a href="https://www.facebook.com/tungmmo05/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500">
                        <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center text-blue-600 dark:text-blue-400"><Facebook size={14} /></div>
                        <span className="font-semibold text-[13px] truncate">facebook.com/tungmmo05</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-[#0F1115]/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-20">
                <button 
                  onClick={() => setCurrentScreen('amount')}
                  className="w-full bg-[#FFB703] text-gray-900 font-semibold py-4 rounded-2xl hover:bg-yellow-400 shadow-lg shadow-yellow-500/30 transition-all transform active:scale-[0.98]"
                >
                  Ủng hộ ngay
                </button>
              </div>
            </div>
          )}

          {currentScreen === 'amount' && (
            <div className="flex-1 bg-white dark:bg-[#0F1115] text-gray-900 dark:text-white flex flex-col px-5 py-8 sm:py-10 h-full justify-between animate-fade-in">
              <button onClick={() => setCurrentScreen('detail')} className="p-2 w-fit -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white"><ArrowLeft size={24} /></button>
              <div className="flex flex-col items-center justify-center my-auto">
                <h2 className="text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-widest mb-4">SỐ TIỀN ỦNG HỘ</h2>
                <div className="flex items-center gap-3 mb-3">
                  {(['VND', 'USD', 'CNY'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => handleCurrencyChange(curr)}
                      className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                        currency === curr ? 'bg-[#FFB703] text-gray-900' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
                <div className="text-5xl font-semibold flex items-center gap-2 mb-2 tracking-tight text-gray-900 dark:text-white">
                  <span>{formatCurrency(displayAmount, currency)}</span>
                  <span className="text-yellow-500 text-3xl">{getCurrencySymbol(currency)}</span>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-y-4 gap-x-3 mb-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button key={num} onClick={() => handleKeypadPress(num.toString())} className="text-2xl font-semibold py-4 bg-gray-100 dark:bg-[#1A1D24] text-gray-900 dark:text-white rounded-2xl active:bg-gray-200 dark:active:bg-gray-700">
                      {num}
                    </button>
                  ))}
                  <button onClick={() => handleKeypadPress('000')} className="text-lg font-semibold py-4 bg-gray-100 dark:bg-[#1A1D24] text-gray-900 dark:text-white rounded-2xl active:bg-gray-200 dark:active:bg-gray-700">000</button>
                  <button onClick={() => handleKeypadPress('0')} className="text-2xl font-semibold py-4 bg-gray-100 dark:bg-[#1A1D24] text-gray-900 dark:text-white rounded-2xl active:bg-gray-200 dark:active:bg-gray-700">0</button>
                  <button onClick={() => handleKeypadPress('del')} className="py-4 bg-gray-100 dark:bg-[#1A1D24] text-gray-600 dark:text-gray-400 rounded-2xl flex justify-center items-center"><Delete size={22} /></button>
                </div>
                <button 
                  onClick={() => setCurrentScreen('method')}
                  disabled={!displayAmount || displayAmount === '0'}
                  className="w-full bg-[#FFB703] text-gray-900 font-semibold py-4 rounded-2xl disabled:opacity-50 transition-all transform active:scale-[0.98]"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}

          {currentScreen === 'method' && (
            <div className="flex-1 flex flex-col bg-white dark:bg-[#0F1115] px-5 py-8 sm:py-10 h-full justify-between animate-fade-in overflow-hidden">
              <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex justify-between items-center mb-6 text-gray-900 dark:text-white">
                  <button onClick={() => setCurrentScreen('amount')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><ArrowLeft size={22} /></button>
                  <h2 className="font-semibold text-lg">Phương thức</h2>
                  <div className="w-8"></div> 
                </div>
                <div className="bg-white dark:bg-[#1A1D24] rounded-[1.5rem] p-4 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
                  <div className="flex items-center gap-3 mb-4 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                      <Image src="/assets/images/banner.jpg" fill className="object-cover" alt="thumb"/>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[14px] text-gray-900 dark:text-white">Dự án Nuôi Tùng</h3>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">bởi Vương Thanh Tùng</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-[13px] px-1">
                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                      <span>Số tiền</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(displayAmount, currency)} {getCurrencySymbol(currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                      <span>Phí giao dịch</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">Miễn phí</span>
                    </div>
                    <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-700 my-2"></div>
                    <div className="flex justify-between font-semibold text-[15px] text-gray-900 dark:text-white">
                      <span>Tổng thanh toán</span>
                      <span className="text-[#FFB703]">
                        {formatCurrency(displayAmount, currency)} {getCurrencySymbol(currency)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6 px-1 text-gray-900 dark:text-white">
                  <span className="font-semibold text-[14px]">Ủng hộ ẩn danh</span>
                  <button onClick={() => setIsAnonymous(!isAnonymous)} className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${isAnonymous ? 'bg-[#FFB703]' : 'bg-gray-300 dark:bg-gray-700'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                <h3 className="font-semibold text-[14px] mb-3 px-1 text-gray-900 dark:text-white">Chọn phương thức</h3>
                <div className="space-y-3 pb-8">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1A1D24] opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      <span className="font-semibold text-[13px] text-gray-500">Ví điện tử</span>
                    </div>
                  </div>
                  <div onClick={() => handleSelectMethod('bank')} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-[#FFB703] bg-yellow-500/10' : 'border-gray-200 dark:border-gray-800'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank' ? 'border-[#FFB703]' : 'border-gray-300'}`}>
                        {paymentMethod === 'bank' && <div className="w-2 h-2 rounded-full bg-[#FFB703]"></div>}
                      </div>
                      <span className={`font-semibold text-[13px] ${paymentMethod === 'bank' ? 'text-gray-900 dark:text-white' : 'text-gray-600'}`}>Chuyển khoản trực tiếp</span>
                    </div>
                    <Landmark size={18} className="text-blue-500" />
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <button onClick={() => setCurrentScreen('qr')} className="w-full bg-[#FFB703] text-gray-900 font-semibold py-4 rounded-2xl shadow-lg transform active:scale-[0.98]">Xác nhận</button>
              </div>
            </div>
          )}

          {currentScreen === 'qr' && (
            <div className="flex-1 flex flex-col bg-white dark:bg-[#0F1115] px-5 py-8 sm:py-10 h-full justify-between animate-fade-in overflow-hidden">
              <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex justify-between items-center mb-6 text-gray-900 dark:text-white">
                  <button onClick={() => setCurrentScreen('method')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><ArrowLeft size={22} /></button>
                  <h2 className="font-semibold text-lg">Quét mã QR</h2>
                  <div className="w-8"></div> 
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white dark:bg-[#1A1D24] p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
                    <div className="w-56 h-56 bg-white dark:bg-black rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden relative">
                      <Image src={getVietQRUrl()} alt="QR" width={220} height={220} className="object-contain dark:invert" unoptimized />
                    </div>
                  </div>
                  <div className="w-full bg-white dark:bg-[#1A1D24] rounded-[1.5rem] p-4 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                      <span className="text-[13px] text-gray-500">Ngân hàng</span>
                      <span className="font-semibold text-[14px] text-green-600">Techcombank</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <span className="text-[11px] text-gray-400 block mb-1 uppercase font-semibold">Chủ tài khoản</span>
                        <span className="font-semibold text-[14px]">VƯƠNG THANH TÙNG</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <span className="text-[11px] text-gray-400 block mb-1 uppercase font-semibold">Số tài khoản</span>
                        <span className="font-semibold text-[15px] tracking-widest text-gray-900 dark:text-white">7888888696</span>
                      </div>
                      <button onClick={() => handleCopy('7888888696', 'Đã chép số TK!')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"><Copy size={16} /></button>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <span className="text-[11px] text-gray-400 block mb-1 uppercase font-semibold">Nội dung</span>
                        <span className="font-semibold text-[14px] text-blue-600">NUOITUNG 7888888696</span>
                      </div>
                      <button onClick={() => handleCopy('NUOITUNG 7888888696', 'Đã chép nội dung!')} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl"><Copy size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button onClick={() => { toast.loading('Đang xác nhận...', { duration: 1500 }); setTimeout(() => setCurrentScreen('success'), 1500); }} className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold py-4 rounded-2xl shadow-xl transform active:scale-[0.98]">Tôi đã chuyển khoản</button>
              </div>
            </div>
          )}

          {currentScreen === 'success' && (
            <div className="flex-1 flex flex-col bg-white dark:bg-[#0F1115] px-5 py-8 sm:py-10 text-center h-full justify-between animate-fade-in">
              <div className="flex justify-start">
                <button onClick={() => setCurrentScreen('detail')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><ArrowLeft size={24} /></button>
              </div>
              <div className="flex flex-col items-center justify-center -mt-10">
                <div className="w-40 h-40 mb-6 flex justify-center items-center">
                  <Heart size={80} className="text-[#FFB703] fill-[#FFB703] animate-pulse" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Thành công!</h2>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-8 px-4">Cảm ơn sự đồng hành của bạn dành cho dự án Nuôi Tùng.</p>
              </div>
              <button onClick={() => { setAmount('50000'); setDisplayAmount('50000'); setCurrency('VND'); setCurrentScreen('detail'); setPaymentMethod('bank'); }} className="w-full bg-gray-100 dark:bg-[#1A1D24] text-gray-900 dark:text-white font-semibold py-4 rounded-2xl">Trở về</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
