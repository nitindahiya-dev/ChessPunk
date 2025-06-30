// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // 1) Upsert the main user
  const user = await prisma.users.upsert({
    where: { wallet_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
    update: {
      username:      "CyberQueen",
      elo_rating:     2150,
      matches_played: 187,
      wins:           124,
      losses:         63,
      win_rate:       87.4,
      join_date:      new Date("2024-03-15"),
      last_active:    new Date(),
      nfts_owned:     12,
      premium_member: true,
    },
    create: {
      username:      "CyberQueen",
      wallet_address:"0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      elo_rating:     2150,
      matches_played: 187,
      wins:           124,
      losses:         63,
      win_rate:       87.4,
      join_date:      new Date("2024-03-15"),
      last_active:    new Date(),
      nfts_owned:     12,
      premium_member: true,
    },
  })

  // 2) Clear old dependent data
  await prisma.match_history.deleteMany({ where: { user_id: user.id } })
  await prisma.nft_skins.deleteMany({ where: { user_id: user.id } })
  await prisma.leaderboard.deleteMany()

  // 3) Seed match history
  const matchHistory = [
    { opponent: "NeonKing",     result: "Win",  duration: "00:12:45", played_at: "2025-06-25", elo_change: 12 },
    { opponent: "CryptoBishop", result: "Loss", duration: "00:25:18", played_at: "2025-06-24", elo_change: -8 },
    { opponent: "BlockKnight",  result: "Win",  duration: "00:18:32", played_at: "2025-06-23", elo_change: 10 },
    { opponent: "ChainPawn",    result: "Win",  duration: "00:08:15", played_at: "2025-06-22", elo_change: 7 },
    { opponent: "EtherQueen",   result: "Draw", duration: "00:40:22", played_at: "2025-06-20", elo_change: 2 },
    { opponent: "DeFiRook",     result: "Win",  duration: "00:15:44", played_at: "2025-06-18", elo_change: 9 },
    { opponent: "SmartCastle",  result: "Loss", duration: "00:22:17", played_at: "2025-06-17", elo_change: -10 },
  ]
  for (const m of matchHistory) {
    await prisma.match_history.create({
      data: {
        user_id:    user.id,
        opponent:   m.opponent,
        result:     m.result,
        duration:   m.duration,
        played_at:  new Date(m.played_at),
        elo_change: m.elo_change,
      },
    })
  }

  // 4) Seed NFT skins
  const nftSkins = [
    { id: 1, name: "Neon Grid",         type: "board",   rarity: "Epic",      equipped: true  },
    { id: 2, name: "Cyber Samurai",     type: "avatar",  rarity: "Legendary", equipped: false },
    { id: 3, name: "Quantum Pieces",    type: "pieces",  rarity: "Rare",      equipped: false },
    { id: 4, name: "Holographic King",  type: "pieces",  rarity: "Epic",      equipped: false },
    { id: 5, name: "Data Stream",       type: "board",   rarity: "Rare",      equipped: false },
    { id: 6, name: "Blockchain Knight", type: "avatar",  rarity: "Common",    equipped: false },
    { id: 7, name: "Ethereum Classic",  type: "board",   rarity: "Epic",      equipped: false },
    { id: 8, name: "Polygon Queen",     type: "pieces",  rarity: "Legendary", equipped: false },
  ]
  for (const skin of nftSkins) {
    await prisma.nft_skins.create({
      data: {
        id:        skin.id,
        user_id:   user.id,
        name:      skin.name,
        type:      skin.type,
        rarity:    skin.rarity,
        equipped:  skin.equipped,
      },
    })
  }

  // 5) Seed leaderboard snapshot
  const players = [
    { rank: 1, username: "CryptoKnight",     elo: 2450, wins: 142, losses: 18, win_rate: 89,  is_you: false },
    { rank: 2, username: "NeonQueen",        elo: 2380, wins: 218, losses: 42, win_rate: 84,  is_you: false },
    { rank: 3, username: "BlockchainBishop", elo: 2325, wins: 175, losses: 35, win_rate: 83,  is_you: false },
    { rank: 4, username: "QuantumPawn",      elo: 2280, wins: 192, losses: 48, win_rate: 80,  is_you: true  },
    { rank: 5, username: "DeFiRook",         elo: 2245, wins: 165, losses: 45, win_rate: 79,  is_you: false },
    { rank: 6, username: "DAO_Master",       elo: 2205, wins: 130, losses: 40, win_rate: 76,  is_you: false },
    { rank: 7, username: "NFT_Gambit",       elo: 2180, wins: 205, losses: 65, win_rate: 76,  is_you: false },
    { rank: 8, username: "SmartContract",    elo: 2155, wins: 180, losses: 60, win_rate: 75,  is_you: false },
  ]

  for (const p of players) {
    await prisma.leaderboard.create({ data: p })
  }

  console.log('✅ Seed completed!')
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
