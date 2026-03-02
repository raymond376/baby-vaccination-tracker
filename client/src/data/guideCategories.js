export const GUIDE_CATEGORIES = [
  {
    id: "pregnancy", label: "Pregnancy Guide", gradient: "from-pink-400 to-rose-500", emoji: "\u{1F930}",
    tagline: "Week-by-week development and what to expect each trimester",
    articles: [
      { id: "pg1", title: "First Trimester (Weeks 1-12)", badge: "Trimester 1", badgeColor: "bg-pink-100 text-pink-700",
        summary: "From a tiny embryo to a fully-formed foetus with a beating heart.",
        content: [
          { heading: "Weeks 1-6: Baby's Development", text: "After the embryo implants in the lining of your womb, the foetal brain, lungs, central nervous and intestinal systems start to form. By the end of week 6, the embryo measures about 4mm and the heart starts to beat. An ultrasound scan through the vagina can detect the heartbeat and confirm the pregnancy is in the right location." },
          { heading: "Weeks 1-6: Your Symptoms", text: "You may feel fine \u2014 the first clue is usually a missed period. Some women experience breast tenderness or tiredness. You can do a home pregnancy test and consult a doctor for confirmation at about 6 weeks. Let your doctor know if you are on long-term medication or have any medical conditions." },
          { heading: "Weeks 7-12: Baby's Development", text: "The foetus goes through rapid growth. By week 12, most major organ systems have developed and the foetus measures about 6cm. The head is growing to accommodate the enlarging brain, eyelids form as folds, external sex organs are well differentiated, and limbs continue to develop with nails appearing on the digits." },
          { heading: "Weeks 7-12: Your Symptoms", text: "Your pregnancy hormones will start to kick in. You may experience morning sickness, breast tenderness and fatigue. These symptoms are normal and usually improve by the end of the first trimester." }
        ]
      },
      { id: "pg2", title: "Second Trimester (Weeks 13-28)", badge: "Trimester 2", badgeColor: "bg-purple-100 text-purple-700",
        summary: "Baby grows rapidly \u2014 you may start to feel those first kicks!",
        content: [
          { heading: "Weeks 13-16: Baby's Development", text: "You may be able to tell the baby's gender. The limbs are now fully developed and can move vigorously." },
          { heading: "Weeks 13-16: Your Symptoms", text: "Your appetite would have started to return. Your weight begins to increase gradually. Your breasts will enlarge and your nipples will darken. Your womb has risen out of your pelvis and can be felt if you touch your abdomen." },
          { heading: "Weeks 17-24: Baby's Development", text: "Hair on the head develops while fine hairs on the body (lanugo) appear. A screening scan should be performed at around 20 weeks to exclude any structural abnormalities." },
          { heading: "Weeks 17-24: Your Symptoms", text: "Backaches, shortness of breath and palpitations may occur due to the enlarging womb. You may begin to feel your baby's movements \u2014 known as 'quickening'. Varicose veins may start to appear on your legs, and you may have trouble sleeping at night." },
          { heading: "Weeks 25-28: Baby's Development", text: "After 24 weeks, the baby is considered to be potentially viable. A baby delivered prematurely between 24 and 28 weeks has a fairly good chance of survival. By the end of week 28, the baby should weigh about 1.2kg." }
        ]
      },
      { id: "pg3", title: "Third Trimester (Weeks 29-40)", badge: "Trimester 3", badgeColor: "bg-rose-100 text-rose-700",
        summary: "The final stretch \u2014 your baby is getting ready to meet you!",
        content: [
          { heading: "Weeks 29-34: Baby's Development", text: "Lanugo starts to disappear and the skin becomes pinkish. The baby appears rounder. Movements are more varied, alternating between rest and active moving." },
          { heading: "Weeks 29-34: Your Symptoms", text: "Your tummy feels taut and you may feel irregular tightening \u2014 known as Braxton-Hicks contractions. Expect shortness of breath as the enlarging womb presses against your rib cage. You may get heartburn, and the milk glands in your breasts start to produce colostrum \u2014 nutrition for your baby during his first few days of life." },
          { heading: "Weeks 35-40: Baby's Development", text: "The baby has fully formed and the head is more proportionate to the body. The lanugo has completely disappeared and skin is smooth. As the due date approaches, the baby's head will descend into your pelvis \u2014 a phenomenon known as 'engagement'. The baby usually weighs more than 2.8kg at delivery." },
          { heading: "Weeks 35-40: Your Symptoms", text: "Aches from the ligaments stretching in your pelvis will increase. Lower abdominal aches and frequent urination from bladder pressure can be troubling. From 37 weeks onwards, your baby is considered full term and labour contractions can begin at any time." }
        ]
      },
      { id: "pg4", title: "Antenatal Classes", badge: "Preparation", badgeColor: "bg-blue-100 text-blue-700",
        summary: "Clear your doubts and prepare for childbirth with expert-led classes.",
        content: [
          { heading: "What Will I Learn?", text: "Classes typically cover nutritional needs during pregnancy and after delivery, exercises to build stamina for childbirth, what to expect during labour and birth, breastfeeding techniques, and care of your newborn including how to carry or bathe your baby." },
          { heading: "Hospital Tours & Q&A", text: "Many antenatal classes conducted by hospitals include a tour of the delivery suite. The classes are a great opportunity to ask any questions that may be bothering you and ease your anxieties." },
          { heading: "Meet Other Parents-to-Be", text: "Antenatal classes give you the chance to meet fellow parents-to-be going through the same experiences. Many new mothers meet up regularly during pregnancy and after birth, forming support groups and play-groups for their babies." },
          { heading: "When to Sign Up", text: "Check early with the respective hospitals for registration as some classes are very popular and may have waiting lists. Classes are offered by both restructured and private hospitals." }
        ]
      }
    ]
  },
  {
    id: "firstdays", label: "First Days Home", gradient: "from-amber-400 to-orange-400", emoji: "\u{1F3E0}",
    tagline: "What to expect when your newborn arrives",
    articles: [
      { id: "fd1", title: "Welcoming Your Newborn", badge: "0-2 weeks", badgeColor: "bg-amber-100 text-amber-700",
        summary: "Stay positive, manage expectations, and don't be afraid to ask for help.",
        content: [
          { heading: "The Confinement Period", text: "As you enter the confinement period \u2014 a time of recuperation \u2014 be mindful of the changes that may come and take this time to adjust to your newborn. Stay positive and learn to manage your expectations. If you are in doubt, do not be afraid to ask for help." },
          { heading: "Postnatal Check-ups", text: "Your doctor will usually schedule a postpartum check-up 4-6 weeks after delivery. They will check your breasts, weight and blood pressure, and examine your uterus to make sure you are healing well." },
          { heading: "Bonding With Your Baby", text: "Enjoy bonding time by holding your baby close to your chest, cuddling or giving a light massage. Giving your baby a massage after his bath each evening before bed is a good way to calm him down and signal bedtime." },
          { heading: "Soothing a Fussy Baby", text: "Babies love attention and sounds, so talk, sing and coo to your baby often. If he is fussing, try singing or reciting nursery rhymes. Some babies like the long 'shh' sound." }
        ]
      },
      { id: "fd2", title: "Why Is My Baby Crying?", badge: "Common concerns", badgeColor: "bg-orange-100 text-orange-700",
        summary: "Crying is your baby's main form of communication. Learn to read the signs.",
        content: [
          { heading: "Hunger", text: "Signs include sucking the fists, turning towards your breasts and 'rooting' when picked up. Always respond to early signs of hunger \u2014 feed your baby before the crying intensifies." },
          { heading: "Wind / Colic", text: "Colic crying typically occurs in the evenings between 1-2 months old. Burp your baby, especially if bottle-fed." },
          { heading: "Temperature", text: "Feel your baby's body. If cold, add clothing or increase room temperature. If too hot, remove clothing or decrease room temperature." },
          { heading: "Illness", text: "Signs include a runny nose, cough, or feeling hot to the touch. Check his temperature \u2014 if it is above 37.5\u00B0C, bring him to the doctor." }
        ]
      },
      { id: "fd3", title: "Swaddling & Burping", badge: "Techniques", badgeColor: "bg-blue-100 text-blue-700",
        summary: "Practical techniques every new parent should know.",
        content: [
          { heading: "How to Swaddle", text: "Use a thin large square blanket: (1) Spread the blanket and fold down the top corner. (2) Lay your baby on his back with his head on the fold. (3) Wrap one side over the baby. (4) Fold up the bottom and wrap the other side snugly." },
          { heading: "Burping Your Baby", text: "Newborns may swallow air while feeding. Burp your baby after each feed to relieve gas \u2014 you may even need to pause midway through a feed." }
        ]
      }
    ]
  },
  {
    id: "newborncare", label: "Newborn Care", gradient: "from-blue-400 to-blue-600", emoji: "\u{1F6C1}",
    tagline: "Bathing, cleaning, and daily care essentials",
    articles: [
      { id: "nc1", title: "Cleaning Your Baby", badge: "Daily care", badgeColor: "bg-blue-100 text-blue-700",
        summary: "A gentle guide to caring for your baby's eyes, ears, nose, skin, and umbilical cord.",
        content: [
          { heading: "Eyes", text: "Wash each eye gently with a wet cotton ball, using boiled water that has cooled down. Use a separate cotton ball for each eye to avoid cross-contamination." },
          { heading: "Ears", text: "Ears are self-cleaning. A gentle wipe with a soft washcloth of the outer ear is adequate. Never insert anything into your baby's ear canal." },
          { heading: "Umbilical Cord", text: "Keep the umbilical cord stump clean and dry. Fold the nappy below the cord to allow air circulation. The stump usually falls off within 7-21 days." },
          { heading: "Skin", text: "Newborn skin may peel in the first few days \u2014 this is normal. Use mild, fragrance-free baby products." }
        ]
      },
      { id: "nc2", title: "Feeding Your Baby", badge: "Nutrition", badgeColor: "bg-pink-100 text-pink-700",
        summary: "Breastfeeding, formula, and introducing solids \u2014 what you need to know.",
        content: [
          { heading: "Breastfeeding Benefits", text: "Breast milk is the best nutrition for your baby, providing all the nutrients he needs. It also contains antibodies that protect him from infections and allergies." },
          { heading: "On-Demand Feeding", text: "In the early weeks, feed on demand \u2014 typically 8-12 times in 24 hours." },
          { heading: "Introducing Solids", text: "Solids can be introduced around 6 months. Start with smooth purees of single ingredients, waiting 3-5 days between new foods to watch for allergic reactions." },
          { heading: "Screen Time", text: "Recreational screen time for babies under 2 years is not advisable. Encourage imaginative play and storytelling activities instead." }
        ]
      }
    ]
  },
  {
    id: "sleep", label: "Sleep Guide", gradient: "from-indigo-400 to-purple-500", emoji: "\u{1F319}",
    tagline: "Help your baby (and yourself) get better rest",
    articles: [
      { id: "sl1", title: "Baby Sleep Basics", badge: "All ages", badgeColor: "bg-indigo-100 text-indigo-700",
        summary: "Babies generally need about 14-17 hours of sleep a day.",
        content: [
          { heading: "Normal Sleep Patterns", text: "Newborns sleep in short cycles of 2-4 hours around the clock. By 3-6 months, many babies start sleeping longer stretches at night." },
          { heading: "Building a Bedtime Routine", text: "Develop a regular nap and bedtime routine: warm bath, feed, reading a book aloud, singing a lullaby. Consistency is key." },
          { heading: "A Safe Sleep Environment", text: "Always place your baby on his back to sleep on a firm, flat surface. Keep the cot free of pillows, loose bedding, and soft toys." },
          { heading: "Teaching Self-Settling", text: "Try to put your baby to bed while he is still sleepy but awake. This helps babies learn to fall asleep on their own." }
        ]
      },
      { id: "sl2", title: "Surviving Sleep Deprivation", badge: "For parents", badgeColor: "bg-purple-100 text-purple-700",
        summary: "Practical strategies for parents to manage fatigue.",
        content: [
          { heading: "Sleep When Baby Sleeps", text: "Prioritise rest whenever your baby naps. Even a 20-30 minute nap can make a significant difference to your alertness and mood." },
          { heading: "Share Night Duties", text: "Take turns with your partner for night feeds. Having a system means both parents get longer sleep stretches." },
          { heading: "Watch for Postpartum Mood Changes", text: "The 'baby blues' are common in the first 2 weeks. If low mood persists beyond 2 weeks, please speak to your doctor." }
        ]
      }
    ]
  },
  {
    id: "safety", label: "Baby Safety", gradient: "from-rose-400 to-red-400", emoji: "\u{1F6E1}\uFE0F",
    tagline: "Keep your baby safe at home and on the move",
    articles: [
      { id: "sa1", title: "Home Safety Essentials", badge: "0-6 months", badgeColor: "bg-rose-100 text-rose-700",
        summary: "Never leave babies unattended on high surfaces.",
        content: [
          { heading: "Fall Prevention", text: "Never leave your baby unattended on a high surface such as a changing table, sofa, or bed \u2014 even for a moment." },
          { heading: "Safe Sleep Position", text: "Always place your baby on his back to sleep. Never place your baby on his stomach or side, as this increases SIDS risk." },
          { heading: "Choking Hazards", text: "Keep small objects, coins, batteries, and balloons away from your baby. Check toys regularly for loose parts." },
          { heading: "Water Safety", text: "A baby can drown in just a few centimetres of water. Never leave your baby alone in or near water." }
        ]
      },
      { id: "sa2", title: "Car Safety", badge: "Travel", badgeColor: "bg-orange-100 text-orange-700",
        summary: "Every car journey requires a properly installed car seat.",
        content: [
          { heading: "Rear-Facing", text: "Newborn babies should use a rear-facing car seat placed in the back seat. Do not use a rear-facing seat on a seat that faces an airbag." },
          { heading: "Straps & Padding", text: "Straps should be snug \u2014 you should not be able to pinch any excess fabric at the shoulder." },
          { heading: "Sun & Heat", text: "Car seats with metal fittings can get extremely hot in the sun. Cover the seat with a towel if you leave your vehicle in the sun." }
        ]
      }
    ]
  },
  {
    id: "parentwellbeing", label: "Parent Wellbeing", gradient: "from-emerald-400 to-teal-500", emoji: "\u{1F49A}",
    tagline: "Taking care of yourself so you can care for your baby",
    articles: [
      { id: "pw1", title: "Post-Partum Weight Loss", badge: "Mum's health", badgeColor: "bg-emerald-100 text-emerald-700",
        summary: "Focus on sustainable habits, not quick fixes.",
        content: [
          { heading: "Balanced Diet", text: "Eat regular, balanced meals with plenty of fruits, vegetables, wholegrains, and lean protein. Avoid fad diets, especially if breastfeeding." },
          { heading: "Gradual Return to Exercise", text: "Begin with gentle walking and pelvic floor exercises. Most women can begin light exercise around 6-8 weeks after a normal delivery." },
          { heading: "Set Realistic Goals", text: "Aim to lose no more than 0.5-1 kg per week. Your wellbeing matters more than the number on the scale." }
        ]
      },
      { id: "pw2", title: "Returning to Work", badge: "Working mums", badgeColor: "bg-teal-100 text-teal-700",
        summary: "Navigating childcare and continuing breastfeeding after work.",
        content: [
          { heading: "Exploring Childcare Early", text: "Start exploring your childcare options before returning to work. Consider family members, a domestic helper, nanny, or infant care centre." },
          { heading: "Breast Milk Storage", text: "At room temperature (25\u00B0C): up to 4 hours. In fridge (4\u00B0C): up to 72 hours. In freezer: 3-6 months. Thawed milk in fridge: use within 24 hours." },
          { heading: "Thawing Breast Milk", text: "Thaw frozen milk in the refrigerator or in a cup of warm water. Never boil or microwave breast milk, and do not re-freeze it." }
        ]
      }
    ]
  }
];
