const ERROR_MODALS = {
  noCode: {
    title: "No Code Entered",
    subTitle: "Please enter the code sent to your email address. You can also resend the code if you haven’t received it within a few minutes."
  },
  resendConfirm: {
    title: "Verification Code Sent",
    subTitle: "Another verification code has been sent to your email address. Please check your inbox, including the spam folder."
  },
  resendUnavailable: {
    title: "Resend Code Not Available",
    subTitle: "You can not send more verification codes at the moment."
  },
  maxAttempts: {
    title: "Attempt Limit Reached",
    subTitle: "There have been too many incorrect attempts at entering the verification code. Please try again in 5 minutes."
  },
  incorrectCode: {
    title: "Incorrect Code",
    subTitle: "Code is not valid, please check your email and try again."
  },
  verifyFailed: {
     title: "Verification Failed",
    subTitle: "Something went wrong. Please try again later."
  }
}


export default { ERROR_MODALS } 