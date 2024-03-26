export const REGEX_USERNAME = /^[a-z0-9][a-z0-9_.-]{0,32}[a-z0-9]$/;
export const REGEX_EMAIL = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
export const REGEX_PASSWORD =
  /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,64}$/;
export const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9\s]+$/;
