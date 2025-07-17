-- CreateTable
CREATE TABLE "leaderboard" (
    "rank" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "elo" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "win_rate" INTEGER NOT NULL,
    "is_you" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("rank")
);

-- CreateTable
CREATE TABLE "match_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "opponent" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "played_at" DATE NOT NULL,
    "elo_change" INTEGER NOT NULL,

    CONSTRAINT "match_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_skins" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "equipped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "nft_skins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "bio" TEXT,
    "theme" TEXT NOT NULL DEFAULT 'CyberPunk',
    "board_style" TEXT NOT NULL DEFAULT 'Neon Grid',
    "sound_effects" BOOLEAN NOT NULL DEFAULT true,
    "move_sounds" BOOLEAN NOT NULL DEFAULT true,
    "game_notifications" BOOLEAN NOT NULL DEFAULT true,
    "two_fa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "elo_rating" INTEGER NOT NULL DEFAULT 1200,
    "matches_played" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "win_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "join_date" DATE NOT NULL,
    "last_active" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nfts_owned" INTEGER NOT NULL DEFAULT 0,
    "premium_member" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_address_key" ON "users"("wallet_address");

-- AddForeignKey
ALTER TABLE "match_history" ADD CONSTRAINT "match_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nft_skins" ADD CONSTRAINT "nft_skins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
