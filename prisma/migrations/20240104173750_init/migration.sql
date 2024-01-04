-- CreateTable
CREATE TABLE "Shelter" (
    "id" TEXT NOT NULL,
    "shelter_name" TEXT NOT NULL,
    "representative_name" TEXT NOT NULL,
    "shelter_type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "population_age_0_15" INTEGER NOT NULL,
    "population_age_16_59" INTEGER NOT NULL,
    "population_age_60_above" INTEGER NOT NULL,
    "male_population" INTEGER NOT NULL,
    "female_population" INTEGER NOT NULL,
    "supplies_not_needed" TEXT NOT NULL,
    "supplies_needed" TEXT NOT NULL,
    "remarks" TEXT,
    "photo_url" TEXT,
    "is_emergency" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id")
);
