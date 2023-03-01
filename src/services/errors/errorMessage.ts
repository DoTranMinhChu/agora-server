export const ERROR_MESSAGE = {
  // DEFUALT DATABASE
  RECORD_NOT_FOUND: {
    message: {
      vi: 'Không tìm thấy bản ghi tương ứng.',
      en: 'Record Not Found.',
      ko: '해당 기록이 없습니다.',
    },
    code: 500
  },

  // DEFUALT AUTH
  UNAUTHORIZED: {
    message: {
      vi: 'Không được phép.',
      en: 'Unauthorized.',
      ko: '허가받지 않은.',
    },
    code: 401
  },
  YOU_NOT_PERMISSIONS: {
    message: {
      vi: 'Bạn không đủ quyền.',
      en: 'You are not permissions.',
      ko: '접근 권한이 없습니다.',
    },
    code: 401
  },
  TOKEN_EXPIRED: {
    message: {
      vi: 'Token hết hạn.',
      en: 'Token Expried.',
      ko: '토큰이 만료되었습니다.',
    },
    code: 401
  },
  BAD_TOKEN: {
    message: {
      vi: 'Token không đúng.',
      en: 'Bad Token.',
      ko: '나쁜 토큰.',
    },
    code: 401
  },

  // DEFUALT ROUTER
  SORRY_SOMETHING_WENT_WRONG: {
    message: {
      vi: 'Xin lỗi, có gì đó không đúng.',
      en: 'Sorry! Something went wrong.',
      ko: '에러. 문제가 발생했습니다.',
    },
    code: 500
  },
  THE_API_NOT_SUPPORTED: {
    message: {
      vi: 'API không còn hổ trợ.',
      en: 'The API is not supported.',
      ko: 'API 지원하지 않습니다.',
    },
    code: 500
  },
  BAD_REQUEST: {
    message: {
      vi: 'Yêu cầu sai.',
      en: 'Bad Request.',
      ko: '잘못된 요청입니다.',
    },
    code: 400
  },
  // Auth
  USERNAME_DOES_NOT_EXIST: {
    message: {
      vi: 'Tên đăng nhập không tồn tài.',
      en: 'Username does not exist.',
      ko: '회원 정보가 없습니다.',
    },
    code: 404
  },
  THIS_ACCOUNT_IS_APPLE: {
    message: {
      vi: 'Tài khoản này được đăng nhập trước đó thông qua Apple.',
      en: 'This account is an account logged in through APPLE.',
      ko: '본 계정은 APPLE로 로그인된 계정입니다.',
    },
    code: 400
  },
  THIS_ACCOUNT_IS_PHONE: {
    message: {
      vi: 'Tài khoản này được đăng nhập trước đó thông qua số điện thoại',
      en: 'This account is an account logged in through PHONE.',
      ko: '본 계정은 PHONE로 로그인된 계정입니다.',
    },
    code: 400
  },
  THIS_ACCOUNT_IS_NAVER: {
    message: {
      vi: 'Tài khoản này được đăng nhập trước đó thông qua Naver.',
      en: 'This account is an account logged in through NAVER.',
      ko: '본 계정은 NAVER로 로그인된 계정입니다.',
    },
    code: 400
  },
  THIS_ACCOUNT_IS_KAKAOTALK: {
    message: {
      vi: 'Tài khoản này được đăng nhập trước đó thông qua Kakaotalk.',
      en: 'This account is an account logged in through KAKAOTALK.',
      ko: '본 계정은 KAKAOTALK로 로그인된 계정입니다.',
    },
    code: 400
  },
  THIS_ACCOUNT_IS_GOOGLE: {
    message: {
      vi: 'Tài khoản này được đăng nhập trước đó thông qua Google.',
      en: 'This account is an account logged in through GOOGLE.',
      ko: '본 계정은 GOOGLE로 로그인된 계정입니다.',
    },
    code: 400
  },
  THIS_ACCOUNT_IS_INAPP: {
    message: {
      vi: 'Tài khoản này được đăng nhập trước đó bằng tên đăng nhập và mật khẩu.',
      en: 'This account is an account logged in through username and password.',
      ko: '해당 이메일은 이미 다른 계정으로 가입된 이메 일입니다.',
    },
    code: 400
  },
  USERNAME_ALREADY_REGISTERED: {
    message: {
      vi: 'Tên đăng nhập này đã được đăng ký trước đó.',
      en: 'Username already registered.',
      ko: '이미 가입된 이메일입니다.',
    },
    code: 400
  },
  PASSWORD_OR_USERNAME_INCORRECT: {
    message: {
      vi: 'Mật khẩu hoặc tài khoản không đúng.',
      en: 'Password or username incorrect.',
      ko: '비밀번호 또는 사용자 이름이 올바르지 않음.',
    },
    code: 400
  },
  LOGIN_METHOD_NOT_SUPPORTED: {
    message: {
      vi: 'Phương thức đăng nhập này không được hỗ trợ.',
      en: 'This login method is not supported.',
      ko: '이 로그인 방법은 지원되지 않습니다.',
    },
    code: 400
  }
}


