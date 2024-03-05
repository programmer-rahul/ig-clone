const IS_DEV = true;
const DB_NAME = "ig-clone";
const CookieDefaultOptions = {
  httpOnly: true,
  secure: true,
};

const AccessCookieOptions = {
  ...CookieDefaultOptions,
  maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
};
const RefreshCookieOptions = {
  ...CookieDefaultOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day expiry
};

export { IS_DEV, DB_NAME, AccessCookieOptions,RefreshCookieOptions };
