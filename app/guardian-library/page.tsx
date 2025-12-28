"use client";
import React, { useState, useMemo } from 'react';

// --- DATA LENGKAP DARI EXCEL ---
const GUARDIANS = [
  // COMMON
  { name: "Archer", rarity: "Common", type: "Ranged", faction: "Human", ability: "Quick ranged attack", lv6: "Unlock [Double Shot]", lv10: "", lv12: "Increase Double Shot chanfe by 80%", recipe: "", img: "Archer.png" },
  { name: "Bandit", rarity: "Common", type: "Melee", faction: "Human", ability: "Steal Coins", lv6: "Coins gained from [Loot] skill increased by +8", lv10: "", lv12: "Unlocks [Pillage]", recipe: "", img: "Bandit.png" },
  { name: "Barbarian", rarity: "Common", type: "Melee", faction: "Human", ability: "Powerful CRIT hits", lv6: "Unlock [Smash]", lv10: "", lv12: "Increase CRIT DMG by +50%", recipe: "", img: "Barbarian.png" },
  { name: "Thrower", rarity: "Common", type: "Ranged", faction: "Human", ability: "Deals AOE damage", lv6: "Increases explosion range by +100%", lv10: "", lv12: "Increases explosion range by +100%", recipe: "", img: "Thrower.png" },
  { name: "Water Elemental", rarity: "Common", type: "Ranged", faction: "Elemental", ability: "Slow down all enemies MOV SPD", lv6: "Increases boss DMG by +100%", lv10: "", lv12: "Increases skill chance by +5%", recipe: "", img: "Water Elemental.png" },

  // RARE
  { name: "Demon Soldier", rarity: "Rare", type: "Melee", faction: "Devil", ability: "Fast melee attack", lv6: "Unlock [Double Strike]", lv10: "", lv12: "Increase Double Strike chance by 80%", recipe: "", img: "Demon Soldier.png" },
  { name: "Paladin", rarity: "Rare", type: "Melee", faction: "Human", ability: "Stun nearby enemies", lv6: "Increases stun duration by +1 sec", lv10: "", lv12: "Increases [Holy Strike] chance by +5%", recipe: "", img: "Paladin.png" },
  { name: "Ranger", rarity: "Rare", type: "Ranged", faction: "Human", ability: "Powerful ranged attack", lv6: "Unlock [Power Shot]", lv10: "", lv12: "Increases [Power Shot] DMG by +100%", recipe: "", img: "Ranger.png" },
  { name: "Sandman", rarity: "Rare", type: "Melee", faction: "Elemental", ability: "Stun nearby enemies", lv6: "Increases stun duration by +1 sec", lv10: "", lv12: "Increases [Sandstorm] chance by +5%", recipe: "", img: "Sandman.png" },
  { name: "Shock Robot", rarity: "Rare", type: "Ranged", faction: "Robot", ability: "Stun nearby enemies", lv6: "Increases stun duration by +1 sec", lv10: "", lv12: "Increases [Electric Shock] chance by +5%", recipe: "", img: "Shock Robot.png" },

  // EPIC
  { name: "Eagle General", rarity: "Epic", type: "Ranged", faction: "Animal", ability: "Powerful ranged attack", lv6: "Increases [Wind Shot] DMG by +100%", lv10: "", lv12: "Increases [Wind Shot] chance by +5%", recipe: "", img: "Eagle General.png" },
  { name: "Electro Robot", rarity: "Epic", type: "Ranged", faction: "Robot", ability: "Stun nearby enemies", lv6: "Increases stun duration by +1 sec", lv10: "", lv12: "Increases [Overload] chance by +5%", recipe: "", img: "Electro Robot.png" },
  { name: "Hunter", rarity: "Epic", type: "Ranged", faction: "Human", ability: "Powerful ranged attack", lv6: "Unlock [Power Shot]", lv10: "", lv12: "Increases [Power Shot] DMG by +100%", recipe: "", img: "Hunter.png" },
  { name: "Tree", rarity: "Epic", type: "Melee", faction: "Elemental", ability: "Stun nearby enemies", lv6: "Increases stun duration by +1 sec", lv10: "", lv12: "Increases [Root Bind] chance by +5%", recipe: "", img: "Tree.png" },
  { name: "Wolf Warrior", rarity: "Epic", type: "Melee", faction: "Animal", ability: "Fast melee attack", lv6: "Unlock [Frenzy]", lv10: "", lv12: "Increases [Frenzy] duration by +2 sec", recipe: "", img: "Wolf Warrior.png" },

  // LEGENDARY
  { name: "Sheriff", rarity: "Legendary", type: "Ranged", faction: "Human", ability: "Deals AOE damage", lv6: "Increases explosion range by +100%", lv10: "", lv12: "Increases [Golden Bullet] chance by +5%", recipe: "", img: "Sheriff.png" },
  { name: "Storm Giant", rarity: "Legendary", type: "Melee", faction: "Elemental", ability: "Stun nearby enemies", lv6: "Increases stun duration by +1 sec", lv10: "", lv12: "Increases [Thunder Clap] chance by +5%", recipe: "", img: "Storm Giant.png" },
  { name: "Tiger Master", rarity: "Legendary", type: "Melee", faction: "Animal", ability: "Fast melee attack", lv6: "Unlock [Tiger Claw]", lv10: "", lv12: "Increases [Tiger Claw] DMG by +100%", recipe: "", img: "Tiger Master.png" },
  { name: "War Machine", rarity: "Legendary", type: "Ranged", faction: "Robot", ability: "Deals AOE damage", lv6: "Increases explosion range by +100%", lv10: "", lv12: "Increases [Missile Barrage] chance by +5%", recipe: "", img: "War Machine.png" },

  // MYTHIC
  { name: "Ato", rarity: "Mythic", type: "Ranged", faction: "Animal", ability: "Reduce skill cooldown", lv6: "Unlocks [Mystic Watch]", lv10: "Unlocks [Treasure]", lv12: "[Borrowed Power]'s Physical DMG Boost Effect +5%", recipe: "<Tree> + <Hunter> + <Demon Soldier> + <Barbarian>", img: "Ato.png" },
  { name: "Bat Man", rarity: "Mythic", type: "Melee", faction: "Human", ability: "Physical damage", lv6: "Blocks the bat from breaking for once but resets the bat level (only once)", lv10: "Unlocks [Treasure]", lv12: "Lv. 6 effect becomes permanent. [Bat UP] applies twice with a 10% chance", recipe: "1", img: "Bat Man.png" },
  { name: "Birdraw", rarity: "Mythic", type: "Ranged", faction: "Animal", ability: "Area damage", lv6: "[Card Amplification] skill DMG +1%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Magic Circle]", recipe: "<Tiger Master> + <Tree> + <Ranger> + <Bandit>", img: "Birdraw.png" },
  { name: "Blob", rarity: "Mythic", type: "Melee", faction: "Devil", ability: "Reduce enemies DEF", lv6: "Unlocks [Stycky Trap]", lv10: "Unlocks [Treasure]", lv12: "ATK boost from [Devour] +10", recipe: "<Hunter> + <Eagle General> + <Bandit>", img: "Blob.png" },
  { name: "Bomba", rarity: "Mythic", type: "Melee", faction: "Human", ability: "Deals AOE damage", lv6: "Unlocks [Energy Explosion]", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Giant Fist]", recipe: "<Tiger Master> + <Wolf Warrior> + <Barbarian>", img: "Bomba.png" },
  { name: "Coldy", rarity: "Mythic", type: "Ranged", faction: "Elemental", ability: "Stun enemies", lv6: "Unlocks [Blizzard]", lv10: "Unlocks [Treasure]", lv12: "[Glacier Collision] drop 10 more glaciers", recipe: "<Storm Giant> + <Sandman> + <Water Elemental>", img: "Coldy.png" },
  { name: "Dragon - 0 Egg", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increase allies ATK by 10%", lv6: "Increase hatch chance by +2%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Flame Breath]", recipe: "<Eagle General> + <Eagle General> + <Water Elemental>", img: "Dragon - 0 Egg.png" },
  { name: "Dragon - 1 Dragon", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increase ATK for each animal type guardian", lv6: "Increase hatch chance by +2%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Flame Breath]", recipe: "<Eagle General> + <Eagle General> + <Water Elemental>", img: "Dragon - 1 Dragon.png" },
  { name: "Dragon - 2 The Great Egg", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increase allies ATK by 10%", lv6: "Increase hatch chance by +2%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Flame Breath]", recipe: "<Eagle General> + <Eagle General> + <Water Elemental>", img: "Dragon - 2 The Great Egg.png" },
  { name: "Dragon - 3 Drain", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increase ATK for each animal type guardian", lv6: "Increase hatch chance by +2%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Flame Breath]", recipe: "<Eagle General> + <Eagle General> + <Water Elemental>", img: "Dragon - 3 Drain.png" },
  { name: "Frog Prince", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increase allies ATK SPD by 10%", lv6: "[Smash] stuns the enemy for 3 secs", lv10: "Unlocks [Treasure]", lv12: "Increase [Curse Lift] chance by +10%", recipe: "<Wolf Warrior> + <Tree> + <Thrower> + <Barbarian>", img: "Frog Prince.png" },
  { name: "Frog Prince - King Dian", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increase allies ATK SPD by 10%", lv6: "[Smash] stuns the enemy for 3 secs", lv10: "Unlocks [Treasure]", lv12: "Increase [Curse Lift] chance by +10%", recipe: "<Wolf Warrior> + <Tree> + <Thrower> + <Barbarian>", img: "Frog Prince - King Dian.png" },
  { name: "Graviton", rarity: "Mythic", type: "Ranged", faction: "Robot", ability: "Stun enemies", lv6: "Increases skill chance by +3%", lv10: "Unlocks [Treasure]", lv12: "Increases stun duration by +50%", recipe: "<Electro Robot> + <Shock Robot> + <Thrower> + <Thrower>", img: "Graviton.png" },
  { name: "Hailey", rarity: "Mythic", type: "Ranged", faction: "Human", ability: "Magic Damage", lv6: "ATK boost from [Star Power] +200%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Seed of Light]", recipe: "<Sheriff> + <Hunter> + <Sandman>", img: "Hailey.png" },
  { name: "Indy", rarity: "Mythic", type: "Ranged", faction: "Animal", ability: "Search treasure", lv6: "When mana is full, the treasure location is briefly revealed. Selecting Indy will reveal the location again", lv10: "Unlocks [Treasure]", lv12: "Does not excavate treasures below the currently held tier", recipe: "<Sheriff> + <Wolf Warrior> + <Sandman>", img: "Indy.png" },
  { name: "Iron Meow ", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increases MP regen for all allies by 30%", lv6: "Resources required to equip the suit are reduced by 5", lv10: "Unlocks [Treasure]", lv12: "Increases skill damage by +50%. Resources required to equip the suit are reduced by 5", recipe: "<War Machine> + <Bandit> + <Bandit>", img: "Iron Meow .png" },
  { name: "Iron Meow v1", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increases MP regen for all allies by 30%", lv6: "Resources required to equip the suit are reduced by 5", lv10: "Unlocks [Treasure]", lv12: "Increases skill damage by +50%. Resources required to equip the suit are reduced by 5", recipe: "<War Machine> + <Bandit> + <Bandit>", img: "Iron Meow v1.png" },
  { name: "Iron Meow v2", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Increases MP regen for all allies by 30%", lv6: "Resources required to equip the suit are reduced by 5", lv10: "Unlocks [Treasure]", lv12: "Increases skill damage by +50%. Resources required to equip the suit are reduced by 5", recipe: "<War Machine> + <Bandit> + <Bandit>", img: "Iron Meow v2.png" },
  { name: "Kitty Mage", rarity: "Mythic", type: "Ranged", faction: "Animal", ability: "Increases MP regeneration rate for all allies by 20%", lv6: "[Kitty Punch] generates +3 bonus MP", lv10: "Unlocks [Treasure]", lv12: "Increases MP Regen rate from skills by +100%", recipe: "<Eagle General> + <Archer> + <Water Elemental> + <Water Elemental>", img: "Kitty Mage.png" },
  { name: "Lancelot", rarity: "Mythic", type: "Melee", faction: "Human", ability: "Increase allies ATK by 10%", lv6: "Unlocks [Flame Pillar]", lv10: "Unlocks [Treasure]", lv12: "Increases the effect of [Flame] by +0.1", recipe: "<Sheriff> + <Hunter> + <Paladin>", img: "Lancelot.png" },
  { name: "Lazy Taoist", rarity: "Mythic", type: "Ranged", faction: "Human", ability: "Faraway targer", lv6: "Unlocks [Eye of the Storm]", lv10: "Unlocks [Treasure]", lv12: "Increases [Razorwind] chance by +10%", recipe: "<Storm Giant> + <Ranger> + <Water Elemental>", img: "Lazy Taoist.png" },
  { name: "Mama", rarity: "Mythic", type: "Ranged", faction: "Devil", ability: "Reduces all enemies DEF by 20", lv6: "Unlocks [Fear]", lv10: "Unlocks [Treasure]", lv12: "Increases skill DMG by +100%, and the population of Imps summoned with Necromancy become 0", recipe: "<Hunter> + <Tree> + <Electro Robot>", img: "Mama.png" },
  { name: "Master Kun", rarity: "Mythic", type: "Melee", faction: "Animal", ability: "Area damage", lv6: "Unlocks [Flame Spawn]", lv10: "Unlocks [Treasure]", lv12: "Increases skill DMG by +50%", recipe: "<Tiger Master> + <Eagle General> + <Paladin>", img: "Master Kun.png" },
  { name: "Monopoly Man", rarity: "Mythic", type: "Melee", faction: "Devil", ability: "Gain luck stones", lv6: "Reduces MP cost for ULT by 20%", lv10: "Unlocks [Treasure]", lv12: "[Mutation] gain +1 luck stone by 20%", recipe: "<Wolf Warrior> + <Tree> + <Demon Soldier>", img: "Monopoly Man.png" },
  { name: "Ninja", rarity: "Mythic", type: "Ranged", faction: "Human", ability: "Quick ranged attack", lv6: "Unlocks [Assassinate]", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Ninjutsu]", recipe: "<Wolf Warrior> + <Paladin> + <Demon Soldier>", img: "Ninja.png" },
  { name: "Orc Shaman", rarity: "Mythic", type: "Ranged", faction: "Devil", ability: "Reduces all enemies DEF by 20", lv6: "Unlocks [Infection]", lv10: "Unlocks [Treasure]", lv12: "[Infection] applies DEF reduction by 30", recipe: "<Hunter> + <Electro Robot> + <Demon Soldier>", img: "Orc Shaman.png" },
  { name: "Penguin Musician", rarity: "Mythic", type: "Ranged", faction: "Animal", ability: "transform guardian", lv6: "Increases [Andante] chance by +5%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Cincerto]", recipe: "<Eagle General> + <Wolf Warrior> + <Electro Robot>", img: "Penguin Musician.png" },
  { name: "Pulse Generator", rarity: "Mythic", type: "Ranged", faction: "Robot", ability: "AoE damage", lv6: "Charges a small amount of energy even without nearby Robot", lv10: "Unlocks [Treasure]", lv12: "Increases skill DMG by +50%", recipe: "<Electro Robot> + <Shock Robot> + <Archer> + <Archer>", img: "Pulse Generator.png" },
  { name: "Rocket Chu", rarity: "Mythic", type: "Ranged", faction: "Robot", ability: "Physical damage", lv6: "Increases [Overclock] chance by +15%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Annihilation Rocket]", recipe: "", img: "Rocket Chu.png" },
  { name: "Rocket Chu - Overclock", rarity: "Mythic", type: "Ranged", faction: "Robot", ability: "Physical damage", lv6: "Increases [Overclock] chance by +15%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Annihilation Rocket]", recipe: "", img: "Rocket Chu - Overclock.png" },
  { name: "Roka", rarity: "Mythic", type: "Ranged", faction: "Human", ability: "ranged Physical damage", lv6: "[Rapid Fire] skill duration +4s", lv10: "Unlocks [Treasure]", lv12: "[Explosive Rounds] skill DMG +100%", recipe: "<Sheriff> + <Tiger Master> + <Eagle General> + <Archer>", img: "Roka.png" },
  { name: "Tar ", rarity: "Mythic", type: "Melee", faction: "Devil", ability: "Physical damage", lv6: "Unlocks [Blade Slash]", lv10: "Unlocks [Treasure]", lv12: "ATK boost from [Cannibalism] +15%", recipe: "<Wolf Warrior> + <Hunter> + <Sandman> + <Barbarian>", img: "Tar .png" },
  { name: "Tar 1", rarity: "Mythic", type: "Melee", faction: "Devil", ability: "Physical damage", lv6: "Unlocks [Blade Slash]", lv10: "Unlocks [Treasure]", lv12: "ATK boost from [Cannibalism] +15%", recipe: "<Wolf Warrior> + <Hunter> + <Sandman> + <Barbarian>", img: "Tar 1.png" },
  { name: "Tar 2", rarity: "Mythic", type: "Melee", faction: "Devil", ability: "Physical damage", lv6: "Unlocks [Blade Slash]", lv10: "Unlocks [Treasure]", lv12: "ATK boost from [Cannibalism] +15%", recipe: "<Wolf Warrior> + <Hunter> + <Sandman> + <Barbarian>", img: "Tar 2.png" },
  { name: "Vayne", rarity: "Mythic", type: "Ranged", faction: "Human", ability: "Single enemy", lv6: "Unlocks [Gold Arrow]", lv10: "Unlocks [Treasure]", lv12: "[Tumble] DMG +2000% and stuns the target for 1 secs", recipe: "<Storm Giant> + <Hunter> + <Ranger> + <Archer>", img: "Vayne.png" },
  { name: "Verdee", rarity: "Mythic", type: "Ranged", faction: "Elemental", ability: "Physical damage", lv6: "Increases [Thorny Seed] chance by +5%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Premium Fertilizer]", recipe: "<Sheriff> + <Tree> + <Demon Soldier> + <Barbarian>", img: "Verdee.png" },
  { name: "Watt", rarity: "Mythic", type: "Melee", faction: "Human", ability: "AoE damage", lv6: "ATK boost from Burst Mode +2%", lv10: "Unlocks [Treasure]", lv12: "Unlocks [Energy Absorb]", recipe: "<Storm Giant> + <Electro Robot> + <Demon Soldier>", img: "Watt.png" },
  { name: "Zap", rarity: "Mythic", type: "Ranged", faction: "Human", ability: "Single enemy", lv6: "Increases number of [Perfect Calculation] magic missiles by 2", lv10: "Unlocks [Treasure]", lv12: "[Arcane Amplification] duration becomes permanent", recipe: "<Sheriff> + <Electro Robot> + <Demon Soldier> + <Archer>", img: "Zap.png" },


  // IMMORTAL
  { name: "Ace Bat Man", rarity: "Immortal", type: "Melee", faction: "Human", ability: "", lv6: "Unlocks Ultimate Skills for both Pitcher and Batter forms", lv10: "Unlocks [Treasure]", lv12: "Enhances Ultimates Skills for both Pitcher and Batter forms", recipe: "<Bat Man> Level 15 and +10 Bat", img: "Ace Bat Man.png" },
  { name: "Ace Bat Man - Pitcher", rarity: "Immortal", type: "Melee", faction: "Human", ability: "", lv6: "Unlocks [Last Pitch]", lv10: "Unlocks [Treasure]", lv12: "[Last Pitch additional pitch chance +10%", recipe: "<Bat Man> Level 15 and +10 Bat", img: "Ace Bat Man - Pitcher.png" },
  { name: "Ace Bat Man - Batter", rarity: "Immortal", type: "Melee", faction: "Human", ability: "", lv6: "Unlocks [Home Run Barrage]", lv10: "Unlocks [Treasure]", lv12: "[Home Run Barrage] swing DMG +50%", recipe: "<Bat Man> Level 15 and +10 Bat", img: "Ace Bat Man - Batter.png" },
  { name: "Awakened Hailey", rarity: "Immortal", type: "Ranged", faction: "Human", ability: "", lv6: "Damage dealt to nearby enemies by [Flare] +50%", lv10: "Unlocks [Treasure]", lv12: "Increases [Big Bang] chance by 5%", recipe: "<Hailey> Level 15 and has 15% chance to be summoned when the ultimate skill is activated with full Star Power", img: "Awakened Hailey.png" },
  { name: "Boss Birdraw", rarity: "Immortal", type: "Ranged", faction: "Animal", ability: "", lv6: "[Trick Token] magic DMG +500%", lv10: "Unlocks [Treasure]", lv12: "During [Finale] skill activation chance +5%", recipe: "<Birdraw> Level 15 and card amplication reach 100", img: "Boss Birdraw.png" },
  { name: "Captain Roka", rarity: "Immortal", type: "Ranged", faction: "Human", ability: "", lv6: "[Bombardment] count +10", lv10: "Unlocks [Treasure]", lv12: "[Bounce Shot] attack count +5", recipe: "<Roka> Level 15 and after firing 160 Explosive Rounds", img: "Captain Roka.png" },
  { name: "Chrono Ato", rarity: "Immortal", type: "Ranged", faction: "Animal", ability: "", lv6: "[Time Leap] cooldown reduction effect +10%", lv10: "Unlocks [Treasure]", lv12: "[Time Gift] physical DMG boost effect +5%", recipe: "<Ato> Level 15 and total cooldown reduction of 100s", img: "Chrono Ato.png" },
  { name: "Dark Lord Dragon", rarity: "Immortal", type: "Ranged", faction: "Animal", ability: "", lv6: "[Flame Mark] explosion transfer 5 Flame Mark to nearby enemies (cooldwon 10s)", lv10: "Unlocks [Treasure]", lv12: "[Inferno] duration +2.5 sec", recipe: "<Dragon - 3 Drain> + <Dragon - 1 Dragon>", img: "Dark Lord Dragon.png" },
  { name: "Dr Pulse", rarity: "Immortal", type: "Ranged", faction: "Human", ability: "", lv6: "Increases the maximum number of Drones for [Assembly] by +2", lv10: "Unlocks [Treasure]", lv12: "Damage increases by +15% for each additional drone", recipe: "<Pulse Generator> Level 15 and charged 10.000 energy", img: "Dr Pulse.png" },
  { name: "Ghost Ninja", rarity: "Immortal", type: "Ranged", faction: "Human", ability: "", lv6: "Unlocks [Execution]", lv10: "Unlocks [Treasure]", lv12: "CRIT rate +15%", recipe: "<Ninja> Level 15 and sacrificing one Ninja with 11 combo and 4 additional Ninjas", img: "Ghost Ninja.png" },
  { name: "Grand Mama", rarity: "Immortal", type: "Ranged", faction: "Devil", ability: "", lv6: "ATK boost from [Assimilation] +15%", lv10: "Unlocks [Treasure]", lv12: "Reduces the condition required for [Forced Revival] by 2", recipe: "<Mama> Level 15 and consuming all IMPS on the field with at least 9 Imps are present", img: "Grand Mama.png" },
  { name: "I Am Meow", rarity: "Immortal", type: "Ranged", faction: "Animal", ability: "", lv6: "[Omega Blaster] duration +1.5s", lv10: "Unlocks [Treasure]", lv12: "Increases skill chance by +4%", recipe: "<Iron Meow v2> Level 15 and Iron Meow v2 tech upgrade level 10", img: "I Am Meow.png" },
  { name: "Noisy Penguin Musician", rarity: "Immortal", type: "Ranged", faction: "Animal", ability: "", lv6: "[Duet] duration becomes permanent", lv10: "Unlocks [Treasure]", lv12: "[Duet] target gains a portion of Noisy Penguin Musician's ATK", recipe: "<Penguin Musician> Level 15 and after performing the best variation 5 times", img: "Noisy Penguin Musician.png" },
  { name: "Primeval Bomba", rarity: "Immortal", type: "Melee", faction: "Human", ability: "", lv6: "Unlocks [Power Unleashed]", lv10: "Unlocks [Treasure]", lv12: "Increases [Power Unleashed] duration by +10 secs", recipe: "<Bomba> Level 15 and max workout", img: "Primeval Bomba.png" },
  { name: "Reaper Frog", rarity: "Immortal", type: "Melee", faction: "Animal", ability: "", lv6: "Increases [Chain Lightning] chance by +5%", lv10: "Unlocks [Treasure]", lv12: "Increases [Reaper's Ascension] chance by +15%", recipe: "<Frog Prince> Level 15 and when the Frog Prince successfully ascends", img: "Reaper Frog.png" },
  { name: "Reaper Dian", rarity: "Immortal", type: "Melee", faction: "Animal", ability: "", lv6: "Increases [Chain Lightning] chance by +5%", lv10: "Unlocks [Treasure]", lv12: "Increases [Reaper's Ascension] chance by +15%", recipe: "<Frog Prince> Level 15 and when the Frog Prince successfully ascends", img: "Reaper Dian.png" },
  { name: "Super Graviton", rarity: "Immortal", type: "Ranged", faction: "Robot", ability: "", lv6: "Increases skill chance by +5%", lv10: "Unlocks [Treasure]", lv12: "[Black Hole] skill duration +2 sec", recipe: "<Graviton> Level 15 and when overheat gauge reaches 100", img: "Super Graviton.png" },
{ name: "Top Vayne", rarity: "Immortal", type: "Ranged", faction: "Human", ability: "", lv6: "Unlocks [Rupture Arrow]", lv10: "Unlocks [Treasure]", lv12: "[End of Days] ATK SPD up effect increases by +100%", recipe: "<Vayne> Level 15 and after using ultimate 12 times", img: "Top Vayne.png" },
];


const RARITY_ORDER = ["Common", "Rare", "Epic", "Legendary", "Mythic", "Immortal"];
const THEMES: any = {
  Common: "text-slate-400 border-slate-500 bg-slate-500/5",
  Rare: "text-blue-400 border-blue-500 bg-blue-500/5",
  Epic: "text-purple-500 border-purple-500 bg-purple-500/5",
  Legendary: "text-orange-500 border-orange-500 bg-orange-500/5",
  Mythic: "text-yellow-500 border-yellow-500 bg-yellow-500/5",
  Immortal: "text-red-500 border-red-500 bg-red-500/5",
};

export default function GuardianLibrary() {
  const [filterMode, setFilterMode] = useState<'Rarity' | 'Type' | 'Faction'>('Rarity');

  // Tambahkan state baru di dalam komponen GuardianLibrary
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Fungsi helper untuk toggle
  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // --- LOGIKA GROUPING
    const groupedData = useMemo(() => {
      const groups: Record<string, any[]> = {};

      GUARDIANS.forEach((g) => {
        let key = "";
        if (filterMode === 'Rarity') key = g.rarity;
        else if (filterMode === 'Type') key = g.type;
        else if (filterMode === 'Faction') key = g.faction;

        if (!groups[key]) groups[key] = [];
        groups[key].push(g);
      });

      // Mengurutkan Group
      const sortedKeys = Object.keys(groups).sort((a, b) => {
        if (filterMode === 'Rarity') return RARITY_ORDER.indexOf(a) - RARITY_ORDER.indexOf(b);
        return a.localeCompare(b);
      });

      return { sortedKeys, groups };
    }, [filterMode]);

  // --- HELPER UNTUK STYLE TEXT [SKILL] DAN <RECIPE> ---
  const formatText = (text: string) => {
    if (!text) return "-";
    // Warna khusus untuk [Skill]
    const skillRegex = /\[(.*?)\]/g;
    const parts = text.split(skillRegex);
    return parts.map((part, i) => 
      i % 2 === 1 ? <span key={i} className="text-cyan-400 font-bold">[{part}]</span> : part
    );
  };

  const renderRecipe = (recipe: string) => {
    if (!recipe) return null;

    // Regex untuk menangkap teks di dalam < >
    const recipeRegex = /<(.*?)>/g;
    const matches = [...recipe.matchAll(recipeRegex)];
    
    // Ambil sisa teks (seperti "Level 15" atau "and max workout")
    const cleanText = recipe.replace(recipeRegex, "").replace(/\+/g, "").trim();

    return (
      <div className="flex flex-wrap items-center gap-2 mt-3 bg-slate-900/80 p-3 rounded-xl border border-white/5 shadow-inner">
        <span className="text-[10px] uppercase font-black text-slate-500 mr-1">Recipe</span>
        
        {matches.map((match, idx) => {
          const guardianName = match[1];
          // Cari data guardian untuk mendapatkan rarity (folder)
          const guardianData = GUARDIANS.find(g => g.name.toLowerCase() === guardianName.toLowerCase());
          const folder = guardianData ? guardianData.rarity.toLowerCase() : 'common';
          
          return (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2 bg-white/5 pr-3 py-1 pl-1 rounded-full border border-white/5 hover:bg-white/10 transition-colors group">
                <div className="w-7 h-7 bg-slate-800 rounded-full p-1 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`/img/${folder}/${guardianName}.png`} 
                    alt={guardianName}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      // Jika folder rarity salah, coba cari di folder lain atau gunakan placeholder
                      (e.currentTarget as HTMLImageElement).src = "/img/placeholder.png";
                    }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-200">{guardianName}</span>
              </div>
              {/* Tambahkan "+" jika bukan item terakhir di dalam tag <> */}
              {idx < matches.length - 1 && <span className="text-slate-600 font-bold">+</span>}
            </React.Fragment>
          );
        })}

        {/* Tampilkan sisa teks instruksi (seperti "Level 15") */}
        {cleanText && (
          <span className="text-[10px] text-yellow-500/80 font-medium italic ml-1">
            {cleanText}
          </span>
        )}
      </div>
    );
  };

    return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Filter Controls (Tetap sama) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sticky top-0 z-20 bg-slate-900/95 py-4 backdrop-blur-md border-b border-white/5">
          <h1 className="text-3xl font-black text-yellow-500 uppercase tracking-tighter">Guardian Library</h1>
          
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            {['Rarity', 'Type', 'Faction'].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setFilterMode(m as any);
                  setCollapsedGroups({}); // Reset collapse saat ganti filter
                }}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                  filterMode === m ? 'bg-slate-700 text-yellow-500 shadow-lg' : 'text-slate-500 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* QUICK NAVIGATION (Daftar Isi Mini) */}
        <div className="flex flex-wrap gap-2 pb-4">
          {groupedData.sortedKeys.map(key => (
            <a 
              key={key} 
              href={`#group-${key}`}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-full text-[10px] font-bold uppercase text-slate-400 hover:text-yellow-500 transition-colors"
            >
              {key} ({groupedData.groups[key].length})
            </a>
          ))}
        </div>

        {/* DISPLAY BERDASARKAN GROUP */}
        {groupedData.sortedKeys.map((groupName) => {
          const isCollapsed = collapsedGroups[groupName];
          const count = groupedData.groups[groupName].length;

          return (
            <div key={groupName} id={`group-${groupName}`} className="space-y-6 scroll-mt-32">
              {/* Header Group (Clickable) */}
              <div 
                onClick={() => toggleGroup(groupName)}
                className="flex items-center gap-4 cursor-pointer group/header select-none"
              >
                <div className={`transform transition-transform duration-300 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`}>
                  <span className="text-yellow-500">▼</span>
                </div>
                <h2 className="text-xl font-black uppercase tracking-widest text-slate-400 group-hover/header:text-white transition-colors">
                  {groupName} <span className="text-sm text-slate-600 ml-2">({count})</span>
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-slate-700 to-transparent"></div>
                {isCollapsed && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Click to Expand</span>}
              </div>

              {/* Grid Guardian (Hanya tampil jika tidak collapsed) */}
              {!isCollapsed && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  {groupedData.groups[groupName].map((g) => (
                    <div key={g.name} className={`relative flex flex-col md:flex-row bg-slate-950/40 rounded-3xl border ${THEMES[g.rarity]} p-5 hover:bg-slate-800/40 transition-all group overflow-hidden`}>
            {/* Left Side: Identity */}
            <div className="flex flex-col items-center md:w-32 flex-shrink-0 text-center space-y-2">
            <div className="w-24 h-24 bg-slate-900 rounded-2xl p-2 border border-white/5 group-hover:scale-110 transition-transform">
              <img src={`/img/${g.rarity.toLowerCase()}/${g.img}`} alt={g.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tighter">{g.name}</h3>
              <div className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/50 inline-block mt-1">
              {g.rarity}
              </div>
            </div>
            </div>

            {/* Right Side: Details & Skills */}
            <div className="flex-grow mt-4 md:mt-0 md:ml-6 space-y-3">
            <div className="flex gap-4 border-b border-white/5 pb-2">
              <div className="flex flex-col">
              <span className="text-[9px] uppercase text-slate-500 font-bold">Type</span>
              <span className="text-xs font-bold text-white">{g.type}</span>
              </div>
              <div className="flex flex-col">
              <span className="text-[9px] uppercase text-slate-500 font-bold">Faction</span>
              <span className="text-xs font-bold text-white">{g.faction}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic">"{g.ability}"</p>

            {/* Milestone Skills Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-black/20 border border-white/5">
              <span className="text-[9px] font-black text-yellow-600 uppercase block mb-1">Level 6</span>
              <p className="text-[10px] leading-tight text-slate-300">{formatText(g.lv6)}</p>
              </div>
              {g.rarity === "Mythic" && (
              <div className="p-2 rounded-lg bg-black/20 border border-yellow-500/20">
                <span className="text-[9px] font-black text-yellow-500 uppercase block mb-1">Level 10</span>
                <p className="text-[10px] leading-tight text-slate-300">{formatText(g.lv10)}</p>
              </div>
              )}
              <div className="p-2 rounded-lg bg-black/20 border border-white/5">
              <span className="text-[9px] font-black text-yellow-600 uppercase block mb-1">Level 12</span>
              <p className="text-[10px] leading-tight text-slate-300">{formatText(g.lv12)}</p>
              </div>
            </div>

            {/* Recipe Section for Mythic */}
            {renderRecipe(g.recipe)}
            </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

