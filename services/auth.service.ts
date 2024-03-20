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