import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma"; // Adjust the import path

interface UserUpdate {
  matches_played?: number;
  wins?: number;
  losses?: number;
  win_rate?: number;
}

// API handler to save a completed match and update user stats
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { walletAddress, opponent, result, duration, eloChange } = req.body;

  // Validate input
  if (!walletAddress || !opponent || !result || !duration || eloChange === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Find the user by wallet address
    const user = await prisma.users.findUnique({
      where: { wallet_address: walletAddress },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save the match to the history
    const match = await prisma.match_history.create({
      data: {
        opponent,
        result,
        duration,
        played_at: new Date(),
        elo_change: Number(eloChange),
        users: { connect: { id: user.id } },
      },
    });

    // Prepare updates for user stats
    const updates: UserUpdate = {
      matches_played: user.matches_played + 1,
    };
    if (result === "Win") {
      updates.wins = user.wins + 1;
    } else if (result === "Loss") {
      updates.losses = user.losses + 1;
    }
    const totalMatches = updates.matches_played ?? 0;
    const totalWins = updates.wins ?? user.wins;
    updates.win_rate = totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;

    console.log('Updating user stats:', updates);

    // Update user statistics without disconnecting the client
    const updatedUser = await prisma.users.update({
      where: { wallet_address: walletAddress },
      data: updates,
    });

    return res.status(200).json({ match, updatedUser });
  } catch (error) {
    console.error("Error saving match:", error);
    return res.status(500).json({ error: "Failed to save match" });
  }
}
