import { Case, CaseStatus, Difficulty, Clue, HistoryLog } from './types';

export const USER_AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBlqqmrn-gT5nehMTle35uCVPtW6y8RwJ_mMIGowypkrH3KWI6mZkVt2-SrJRLKdjt-AbGNs5g0yx_6GKxv7CJUrdsFtzdS7YMlowtpAAysOfdwlBWxxTzvkXxcgtW0LRn9KVpSw2aqxcn7X9_AZHl8jtM0w_u3FEmW7y4aItKOAu4Nyp4CMtfmhZ2DtJ_mBepw3S1959MPoB_BWu1v5iAClMUfjZsOhUfKhnkdZlB60T3BuJgts9mLeJZqjZUMOvcZBmMAtd2AePE";
export const BACKGROUND_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDV2Xj3bg1x_vTxpPTaX1NfKLaMJEdQ4tYyniaUELSaS66v6P-7CJAzCq38pXRuDlmLHQ91fRDjd3OBAFfNSm_z237CDBOsKxk6zxCguWgaStnhhMX50paVmduArV00zJiWdUdXUOR-6aMxJdNoSl2VPzKE4MA0ROygE4FAMXQ2vuuCjuqDS4ngkvasemPlLPbgJUaA5OFJtrUqSAkWEOiBx-_yN1k3E9skZm-JCixSOmckurlwC_Qjpm8Swg9AXJnHRyTj1r4EoNk";

export const MOCK_CASES: Case[] = [
  {
    id: 'CN88-2B',
    title: 'Vụ án: Cái Bóng Neon',
    description: 'Giám đốc điều hành của tập đoàn OmniCorp, Kaito Tanaka, được phát hiện đã chết trong căn penthouse sang trọng.',
    status: CaseStatus.IN_PROGRESS,
    difficulty: Difficulty.HARD,
    progress: 25,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiqjG6wOUUNnGk_5waM2k6Mo7wZEJBZ2CFByM62hVkwGZjN1a01BRH0w_Sa5BAI5CPESJ5OOMyjTyovc9aPNzYAsOZsjKvLYtswZLdeE2urnfXwfB595XvBdpOAY5M-3wCl0JW4D_acIABv--pIHVE0RK-63BBAUt_jeJxMEaVXkVHMRQecUK9WVXW1M_tYhAfji1FXbxk2TRfX2xhoh6le0d0H3qDrU644tpdl3_ZCqnhPsAn2Dhm_y34DeXTE1IiNTAdYABQgic"
  },
  {
    id: 'CN88-3A',
    title: 'Vụ án Mất Tích ở Bến Tàu',
    description: 'Một nhà buôn giàu có biến mất không dấu vết. Manh mối cuối cùng dẫn đến bến tàu mờ ảo.',
    status: CaseStatus.NEW,
    difficulty: Difficulty.MEDIUM,
    progress: 0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgeVfmJhBY7ChvTiYRhIOoDdsAtAm1-8xQzuyjb5o9sTeLQ85UlZfSCk2mdBU0jsLHOwUNGBcjI9dcpg3kzLDuWeOC2N3g8qAAO9VO60y9DfzQnVQatfEUJu2H5UY_iShS96mqzI7pyblrx0WFSG9VRqGqB7LL5s6oADlKKtYdgGAhV8L4QmMwmH4atUT6KMufH-j5_ag4nXC87GfWNrewwB5n85WhXNwmm_2RZdJZYHaZ0f3yqfpvJ8K__cRvXIFD1mVMy1dbCG0"
  },
  {
    id: 'CN88-1X',
    title: 'Bản Mã của Nhà giả kim',
    description: 'Một cuốn nhật ký cổ chứa đầy những ký hiệu bí ẩn được tìm thấy.',
    status: CaseStatus.SOLVED,
    difficulty: Difficulty.EASY,
    progress: 100,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsC6CTwQ85_d59U5NR_DD-YHd97XTIF76CyIcH8WgC3OSiqAZV4Cc-pC-SyDFvpv3RMW5snzn5l0xttHWuyWpwgcFFMRMeC78VlwW8ppA0b-PtGEXNd_7cKu8kNzWBKUm_vLVK_dydj4jGjHdrRvs_-GZ2DL4QRD_urV_FWRjP9K_vmBDI5wx3sjrGJBgGO9CICBKUny7RBD8UHVpjrUbdLWZDdqf_vP8yyBhL5x5HLhVyifPU3JJqRKRO-NgZjSUcdyU3lwGetLA"
  },
  {
    id: 'CN99-9Z',
    title: 'Vụ trộm Đồng hồ Ngân hà',
    description: 'Cổ vật vô giá bị đánh cắp khỏi một viện bảo tàng được canh gác nghiêm ngặt.',
    status: CaseStatus.NEW,
    difficulty: Difficulty.HARD,
    progress: 0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBydp3ulTYKATjDxFyyhzUf6N1K1MsbOKbDHOw4LZCvv2M4DEM2K8kBZzn7rN7gfo0JGaZVZSB7YgcjdBlflLqdFVYy0oMaxdDZQ6_qh4FPIJI7rknBJ-eqM397EGZ6ReNJ7YdgxwfPVSq_6veF3_udDcIIAZeuIFtHOntLzyFHzeycbABD3a7rmIe7aeGsZBlOMBNPAFoe5ST6L-PLpjjdpVfiCa4XeTSH5e5gSWxTMql7xdBRNUHClNfJsW_iRBM-v-jOHkum8iM"
  }
];

export const MOCK_CLUES: Clue[] = [
  {
    id: '1',
    title: 'Nhật ký của nạn nhân',
    description: 'Những trang cuối cùng có thể chứa đựng bí mật...',
    status: 'locked',
    cost: 100,
    type: 'document',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgeVfmJhBY7ChvTiYRhIOoDdsAtAm1-8xQzuyjb5o9sTeLQ85UlZfSCk2mdBU0jsLHOwUNGBcjI9dcpg3kzLDuWeOC2N3g8qAAO9VO60y9DfzQnVQatfEUJu2H5UY_iShS96mqzI7pyblrx0WFSG9VRqGqB7LL5s6oADlKKtYdgGAhV8L4QmMwmH4atUT6KMufH-j5_ag4nXC87GfWNrewwB5n85WhXNwmm_2RZdJZYHaZ0f3yqfpvJ8K__cRvXIFD1mVMy1dbCG0"
  },
  {
    id: '2',
    title: 'Phân tích vân tay',
    description: 'Phân tích cho thấy có dấu vân tay không xác định...',
    status: 'unlocked',
    type: 'fingerprint',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1a0kcLZ__DvvPlxfUkz8-XfCsoRs3Q64w-0tdE11uQDjzudSeIP2u9cgieI_xFm0E9KLcUZ2VOF5ndAU9s97tK8RYnN2OGWJEKSXAYSTfR-Uzi7NdQc6WNrCqG3U3qajl2mIhvAMd3T1iTxxPl1DASYQG_YiZ1GzPQp4mXO3eLgjCe5wfGmTlft9dM1uNsz_OW9OVEK6wHYes80aTziEIWPEShYbthT7BzogaDvHPOhMYWiHNlq9GWdfWq9BM04qIOnPkn2vdd2k"
  },
  {
    id: '3',
    title: 'Bản ghi camera an ninh',
    description: 'Một bóng người mờ ảo xuất hiện lúc 2 giờ sáng.',
    status: 'locked',
    cost: 150,
    type: 'digital',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBydp3ulTYKATjDxFyyhzUf6N1K1MsbOKbDHOw4LZCvv2M4DEM2K8kBZzn7rN7gfo0JGaZVZSB7YgcjdBlflLqdFVYy0oMaxdDZQ6_qh4FPIJI7rknBJ-eqM397EGZ6ReNJ7YdgxwfPVSq_6veF3_udDcIIAZeuIFtHOntLzyFHzeycbABD3a7rmIe7aeGsZBlOMBNPAFoe5ST6L-PLpjjdpVfiCa4XeTSH5e5gSWxTMql7xdBRNUHClNfJsW_iRBM-v-jOHkum8iM"
  },
  {
    id: '4',
    title: 'Lời khai nhân chứng',
    description: 'Nhân chứng nghe thấy một tiếng hét lớn...',
    status: 'viewed',
    type: 'document',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCm9Ql9lgCz43RzwrjH1AYY40I-RCdyl1d-HUZQohtAXJINZCi5A1ptecQctYma0-9tLJKTc38-6Cd7lyndwxBRCUKDK1-gg_FQrFfU7wfwmUkoQfBfp97bQNN93aPkF_BN_nE1p9W4ZNP55DLiX47BK7YVUQM1SEaRsnX76y-_AjhaDI3pBKUnFo1vZuH8iO0bv-8gtFmgQlsVvOVVEq9gtJ4ANfvtGDOF23ZiR7b6XHB8grpb-ZdWOmBVldtFkPMVR_M_OK7fBk"
  },
  {
    id: '5',
    title: 'Tin nhắn mã hóa',
    description: 'Một mảnh giấy với dòng chữ kỳ lạ được tìm thấy.',
    status: 'unlocked',
    type: 'digital',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsC6CTwQ85_d59U5NR_DD-YHd97XTIF76CyIcH8WgC3OSiqAZV4Cc-pC-SyDFvpv3RMW5snzn5l0xttHWuyWpwgcFFMRMeC78VlwW8ppA0b-PtGEXNd_7cKu8kNzWBKUm_vLVK_dydj4jGjHdrRvs_-GZ2DL4QRD_urV_FWRjP9K_vmBDI5wx3sjrGJBgGO9CICBKUny7RBD8UHVpjrUbdLWZDdqf_vP8yyBhL5x5HLhVyifPU3JJqRKRO-NgZjSUcdyU3lwGetLA"
  }
];

export const MOCK_HISTORY: HistoryLog[] = [
  {
    id: '01',
    caseName: 'Vụ trộm tại Bến cảng',
    date: '24/10/2024',
    score: 950,
    maxScore: 1000,
    timeSpent: '01:23:45',
    accuracy: 95,
    hintsUsed: ['Kiểm tra lịch sử cuộc gọi', 'Phân tích vết máu'],
    finalSolution: 'Thủ phạm là John Doe.',
    deductionSteps: [
      'Tìm thấy manh mối ban đầu tại bến tàu.',
      'Liên kết bằng chứng với nghi phạm.',
      'Xác nhận bằng chứng ngoại phạm là giả.'
    ]
  },
  {
    id: '02',
    caseName: 'Cây bút đỏ thẫm',
    date: '15/10/2024',
    score: 870,
    maxScore: 1000,
    timeSpent: '02:05:10',
    accuracy: 88,
    hintsUsed: ['Phân tích mẫu chữ viết tay', 'Tra cứu hồ sơ thư viện'],
    finalSolution: 'Thủ phạm là Jane Smith.',
    deductionSteps: [
      'Phát hiện trang nhật ký bị xé.',
      'Đối chiếu chữ viết tay với các nghi phạm.',
      'Tìm thấy cây bút tang vật.'
    ]
  }
];
