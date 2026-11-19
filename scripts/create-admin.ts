/**
 * Creates the first admin user (or resets the password if the email already exists).
 *   npm run create-admin
 */
import readline from "node:readline";
import mongoose from "mongoose";
import { connectDB } from "../lib/mongodb";
import { AdminUserModel } from "../lib/models/AdminUser";
import { hashPassword } from "../lib/password";

function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    let muted = false;
    const anyRl = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WritableStream };
    const original = anyRl._writeToOutput.bind(rl);
    anyRl._writeToOutput = (s: string) => {
      if (hidden && muted) anyRl.output.write(s.includes("\n") || s.includes("\r") ? s : "*");
      else original(s);
    };
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer.trim());
    });
    muted = true;
  });
}

async function main() {
  const email = (await ask("Admin email: ")).toLowerCase();
  const name = await ask("Full name: ");
  const password = await ask("Password (min 10 characters): ", true);
  const confirm = await ask("Repeat password: ", true);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email.");
  if (!name) throw new Error("Name is required.");
  if (password.length < 10) throw new Error("Password must be at least 10 characters.");
  if (password !== confirm) throw new Error("Passwords do not match.");

  await connectDB();
  const passwordHash = await hashPassword(password);
  const existing = await AdminUserModel.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.name = name;
    existing.active = true;
    await existing.save();
    console.log(`Updated existing admin: ${email} (password reset).`);
  } else {
    await AdminUserModel.create({ email, name, passwordHash, role: "admin" });
    console.log(`Created admin: ${email}`);
  }
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("Failed:", err.message ?? err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
