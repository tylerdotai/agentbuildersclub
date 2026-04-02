"use client";

import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";

export function PrivyWalletButton() {
  const { user, login, logout, authenticated } = usePrivy();

  const shortAddress = user?.wallet?.address
    ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
    : null;

  if (authenticated && shortAddress) {
    return (
      <button
        onClick={logout}
        className="group flex items-center gap-2 rounded-full border border-claw-orange/40 bg-claw-orange/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-claw-orange transition-all hover:border-claw-orange hover:bg-claw-orange/20"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-claw-orange opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-claw-orange"></span>
        </span>
        {shortAddress}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={login}
      className="rounded-full bg-claw-orange px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-claw-void transition-all hover:bg-claw-orange/90"
    >
      Connect Wallet
    </motion.button>
  );
}
