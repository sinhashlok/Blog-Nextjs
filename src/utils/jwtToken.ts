const jose = require("jose");

export async function createJwtToken(userId: any, name: string) {
  const secret = new TextEncoder().encode(process.env.SECRET_TOKEN || "");
  const alg = process.env.ALG_KEY;
  const token = await new jose.SignJWT({
    userId: userId,
    name: name,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime("1d")
    .sign(secret);

  return token;
}

export async function verifyJwtToken(jwt: string) {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_TOKEN || "");
    await jose.jwtVerify(jwt, secret);
    return true;
  } catch (error) {
    return false;
  }
}