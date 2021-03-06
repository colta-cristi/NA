let sakura = {
    name: 'Haruno Sakura',
    story: 'A Genin from Team 7, Sakura is very intelligent, but self-conscious about herself. Having just recently received training from Tsunade, Sakura is now able to deliver powerful punches and heal her own allies.',
    folderName: 'sakura',
    skills: [
        {
            name: 'KO Punch',
            description: "Sakura punches one enemy with all her strength dealing 20 damage to them and stunning their physical or mental skills for 1 turn. During 'Inner Sakura', KO Punch deals 10 additional damage.",
            cooldown: 0,
            chakra: {'taijutsu': 1},
            classes: 'Physical, Instant, Melee',
            targets: 'enemy, ally',
            damage: 20,
            heal: 0,
            additional: ['Inner Sakura', 10],
            stun_time: 1,
            stun_skills: ['Physical, Mental'],
            effectLasts: 1,
        },
        {
            name: 'Cure',
            description: 'Using basic healing techniques Sakura heals herself or one ally for 25 health.',
            cooldown: 0,
            chakra: {'ninjutsu': 1},
            classes: 'Chakra, Instant',
            targets: 'ally, self',
            damage: 0,
            heal: 25,
            effectLasts: 0,
        },
        {
            name: 'Inner Sakura',
            description: "Sakura's inner self surfaces and urges her on. For 4 turns, Sakura will gain 10 points of damage reduction and will ignore all stun effects. During this time 'KO Punch' will deal 10 additional damage.",
            cooldown: 4,
            chakra: {'any': 1},
            classes: 'Mental, Instant, Unique',
            targets: 'self',
            damage: 0,
            heal: 0,
            armor_type: 'static',
            damage_reduction: 10,
            effectLasts: 4,
        },
        {
            name: 'Sakura Hide',
            description: 'This skill makes Haruno Sakura invulnerable for 1 turn.',
            cooldown: 4,
            chakra: {'any': 1},
            classes: 'Chakra, Instant',
            targets: 'self',
            damage: 0,
            heal: 0,
            effectLasts: 1,
        }
    ]
},

naruto = {
    name: 'Uzumaki Naruto',
    story: 'A Genin from Team 7, Naruto is an orphan with the goal to one day become Hokage. Using his signature move, Shadow Clones, Naruto is able to perform powerful moves such as the Uzumaki Naruto Combo and the Rasengan.',
    folderName: 'naruto',
    skills: [
        {
            name: 'Uzumaki Naruto Combo',
            description: "Naruto's version of the Lion Combo. This skill deals 20 damage to one enemy. During 'Shadow Clones' this skill will deal 10 additional damage.",
            cooldown: 0,
            chakra: {'taijutsu': 1},
            classes: 'Physical, Instant, Melee',
            targets: 'enemy',
            damage: 20,
            heal: 0,
            additional: ['Shadow Clones', 10],
            effectLasts: 0,
        },
        {
            name: 'Rasengan',
            description: "Naruto hits one enemy with a ball of chakra dealing 45 damage to them and stunning their skills for 1 turn. This skill requires 'Shadow Clones'.",
            cooldown: 1,
            chakra: {'ninjutsu': 1, 'any': 1},
            classes: 'Chakra, Instant, Melee',
            targets: 'enemy',
            damage: 45,
            heal: 0,
            requires: ['Shadow Clones', 2], // skill name and index
            stun_time: 1,
            stun_skills: ['all'],
            effectLasts: 1,
        },
        {
            name: 'Shadow Clones',
            description: "Naruto creates multiple shadow clones hiding his true self. Naruto gains 15 points of damage reduction for 4 turns. During this time 'Uzumaki Naruto Combo' will deal 10 additional damage and 'Rasengan' can be used.",
            cooldown: 4,
            chakra: {'any': 1},
            classes: 'Chakra, Instant',
            targets: 'self',
            damage: 0,
            heal: 0,
            armor_type: 'static',
            damage_reduction: 15,
            activated: 0,
            effectLasts: 4,
        },
        {
            name: "Sexy Technique",
            description: "This skill makes Uzumaki Naruto invulnerable for 1 turn.",
            cooldown: 4,
            chakra: {'any': 1},
            classes: 'Chakra, Instant',
            targets: 'self',
            damage: 0,
            heal: 0,
            effectLasts: 1,
        }
    ]
},

sasuke = {
    name: 'Uchiha Sasuke',
    story: "A Genin from Team 7, Sasuke is the lone survivor of the Uchiha clan and has sworn vengeance against his brother. Using his sharingan, Sasuke is able to anticipate incoming attacks and is capable of advanced offensive moves.",
    folderName: 'sasuke',
    skills: [
        {
            name: 'Lion Combo',
            description: "Copying a taijutsu combo that Lee used on him, Sasuke deals 30 damage to one enemy. This skill will deal an additional 15 damage to an enemy affected by 'Sharingan'.",
            cooldown: 0,
            chakra: {'taijutsu': 1, 'any': 1},
            classes: 'Physical, Instant, Melee',
            targets: 'enemy',
            damage: 30,
            heal: 0,
            additional: ['Sharingan', 15],
            effectLasts: 0,
        },
        {
            name: 'Chidori',
            description: "Using a lightning element attack jutsu, Sasuke deals 30 piercing damage to one enemy. This skill will deal an additional 25 damage to an enemy affected by 'Sharingan'.",
            cooldown: 1,
            chakra: {'ninjutsu': 2, 'any': 1},
            classes: 'Chakra, Instant, Melee',
            targets: 'enemy',
            damage: 30,
            heal: 0,
            additional: ['Sharingan', 25],
            effectLasts: 0,
        },
        {
            name: 'Sharingan',
            description: "Sasuke targets one enemy. For 4 turns, Sasuke will gain 15 points of damage reduction. During this time, that enemy will be unable to reduce damage or become invulnerable.* This will end if Sasuke dies.",
            cooldown: 4,
            chakra: {'bloodline': 1},
            classes: 'Mental, Instant, Unique, Ranged*',
            targets: 'enemy',
            damage: 0,
            heal: 0,
            armor_type: 'static',
            damage_reduction: 15,
            effectLasts: 4,
        },
        {
            name: 'Swift Block',
            description: "This skill makes Uchiha Sasuke invulnerable for 1 turn.",
            cooldown: 4,
            chakra: {'any': 1},
            classes: 'Physical, Instant',
            targets: 'self',
            damage: 0,
            heal: 0,
            effectLasts: 1,
        }
    ]
};

// char = {
//     name: '',
//     story: "",
//     folderName: '',
//     skills: [
//         {
//             name: '',
//             description: "",
//             cooldown: ,
//             chakra: {'taijutsu': 0, 'bloodline': 0, 'ninjutsu': 0, 'genjutsu': 0, 'any': 0},
//             classes: ''
//         },
//         {
//             name: '',
//             description: "",
//             cooldown: ,
//             chakra: {'taijutsu': 0, 'bloodline': 0, 'ninjutsu': 0, 'genjutsu': 0, 'any': 0},
//             classes: ''
//         },
//         {
//             name: '',
//             description: "",
//             cooldown: ,
//             chakra: {'taijutsu': 0, 'bloodline': 0, 'ninjutsu': 0, 'genjutsu': 0, 'any': 0},
//             classes: ''
//         },
//         {
//             name: '',
//             description: "",
//             cooldown: ,
//             chakra: {'taijutsu': 0, 'bloodline': 0, 'ninjutsu': 0, 'genjutsu': 0, 'any': 0},
//             classes: ''
//         }
//     ]
// },









































// let test = {
//     name: 'nu',
//     story: '',
//     picture: 'nu.jpg',
//     skills: [
//         {
//             name: 'clone',
//             description: 'make a clone'
//         }, 
//         {
//             name: 'tai',
//             description: 'use tai'
//         }, 
//         {
//             name: 'ras',
//             description: 'use ras'
//         }, 
//         {
//             name: 'retreat',
//             description: 'just run'
//     }]
// }