// TODO: create DTO for signup
export const signupUser = async (body: any) => {
  await fetch(`/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

/*
* TODO: avoid using absolute path, here I use absolute path because this method will be call in server side, which need to put the absolute path to get detected, but this is not a good practice because in server side, we should not call an internal api, because this will be additional useless api call
* reference: https://stackoverflow.com/questions/76309154/next-js-typeerror-failed-to-parse-url-from-when-targeting-api-route-relati#:~:text=This%20is%20because%20you're,an%20additional%20useless%20API%20call.
*/
export const oauthSignUpUser = async (body: any) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/oauth-signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}