/**
 * Configuration and romantic content for "A White Rose For My Pakode Jaise Naak"
 * All text and personal details can be adjusted here or live via the app's edit modal.
 */

export interface AppConfig {
  nickname: string;
  senderName: string;
  relationshipTone: string;
  messages: {
    envelopePrompt: string;
    envelopeSubprompt: string;
    suspenseTease: string;
    roseIntro1: string;
    roseIntro2: string;
    roseDedication: string;
    letterHeading: string;
    letterGreeting: string;
    letterParagraphs: string[];
    letterClosing: string;
    letterSecretNote: string;
    finalHeading: string;
    finalParagraphs: string[];
    finalClosing: string;
  };
  extraPetalMessages: string[];
  questions: Array<{
    id: number;
    question: string;
    options: Array<{
      id: string;
      label: string;
      response: string;
      icon?: string;
      backdropTheme?: string;
    }>;
  }>;
  gamePetalMessages: string[];
}

export const defaultRomanticConfig: AppConfig = {
  nickname: "Pakode Jaise Naak",
  senderName: "Nikhil",
  relationshipTone: "Playful, cute, teasing yet deeply affectionate and sincere",
  messages: {
    envelopePrompt: "Ek chhoti si cheez hai tumhare liye... 🤍",
    envelopeSubprompt: "Ready ho, Pakode Jaise Naak?",
    suspenseTease: "Achha ji, suspense bhi chahiye aur surprise bhi? 😂🤍 Itna impatient mat bano, thoda smile karo pehle!",
    roseIntro1: "Jaise white rose simple hoke bhi itna khoobsurat hota hai...",
    roseIntro2: "Waise hi tumhari chhoti-chhoti baatein mere din ko special bana deti hain. 🤍",
    roseDedication: "Yeh rose tumhare liye hai, meri Pakode Jaise Naak. 🌹",
    letterHeading: "Sirf tumhare liye, meri jaan 💌",
    letterGreeting: "Hey meri Pakode Jaise Naak,",
    letterParagraphs: [
      "Aaj tumhare liye kuch alag karne ka mann kiya, toh socha ek chhoti si duniya hi bana doon... jahan har cheez tumhe smile karwane ke liye ho.",
      "Tumhari cute si baatein, tumhara nakhra aur tumhara woh alag sa andaaz — sab kuch apna sa lagta hai.",
      "Main nahi jaanta ki main har baar perfect words bol paata hoon ya nahi, par itna zaroor hai ki tumhare liye kuch special karna mujhe achha lagta hai.",
      "Yeh chhota sa surprise meri taraf se tumhare liye hai. Ismein thodi si masti hai, thoda sa pyaar hai, aur ek white rose bhi... bilkul tumhari tarah special. 🤍",
      "Bas aise hi smile karti rehna, apne cute se andaaz mein."
    ],
    letterClosing: "Tumhara,",
    letterSecretNote: "P.S. Pakode jaise naak ho ya jaisi bhi, you are my most favorite human! Aur haan, yeh secret note sirf unko dikhta hai jo bohot pyaare hote hain 🥹🤍",
    finalHeading: "Ek last baat, meri Pakode Jaise Naak... 🤍",
    finalParagraphs: [
      "Yeh website chhoti si hai, lekin ise banane ke peeche ek simple si feeling hai...",
      "Tumhare chehre par ek genuine si smile aa jaaye, bas isi liye.",
      "Har baar bade gifts zaroori nahi hote. Kabhi-kabhi ek chhoti si cheez bhi kisi ke din ko special bana sakti hai.",
      "Aur aaj, yeh chhoti si duniya sirf tumhare naam. 🌹"
    ],
    finalClosing: "With lots of love,"
  },
  extraPetalMessages: [
    "Tumhari hansi sunkar na, aadhe din ki thakaan gayab ho jaati hai! 🤍",
    "Jab tum gusse mein hoti ho na, tab bhi super cute lagti ho 🤭",
    "Tumhari randomly aayi hui messages make my entire day brighter ✨",
    "Pakode jaise naak bolta zaroor hoon, par pyaar ussi se sabse zyada karta hoon 🤍🌹",
    "Kabhi badalna mat, tum jaisi ho ekdum perfect ho!",
    "Ek secret bataun? Tumhari smile dekhne ke liye main kuch bhi kar sakta hoon 🥺"
  ],
  questions: [
    {
      id: 1,
      question: "Agar main tumhare saamne ek white rose lekar aaun, toh?",
      options: [
        {
          id: "A",
          label: "Seedha hug 🤗",
          response: "Aww, done deal! Hug ke saath rose hamesha tumhare liye ready hai 🤍"
        },
        {
          id: "B",
          label: "Pehle chocolate lao 😂",
          response: "Mujhe pata tha, madam ji ki demands kabhi khatam nahi hongi 😂🍫 (Par chocolate bhi zaroor aayegi!)"
        },
        {
          id: "C",
          label: "Rose bhi aur chocolate bhi 😌",
          response: "Itni greedy billo! Par tumhare liye dono hazir hain, white rose aur favorite chocolates dono 🌹🍫"
        }
      ]
    },
    {
      id: 2,
      question: "Humari imaginary dream date kaisi ho?",
      options: [
        {
          id: "A",
          label: "Moonlight aur white roses 🌙",
          response: "Tare, thandi hawa, white roses aur bas tum... sounds like magic ✨",
          backdropTheme: "moonlight"
        },
        {
          id: "B",
          label: "Street food aur endless baatein 🌮",
          response: "Pani puri, garam chai, spicy momos aur tumhari non-stop baatein! Perfection 😋",
          backdropTheme: "streetfood"
        },
        {
          id: "C",
          label: "Cozy movie night 🍿",
          response: "Warm blanket, popcorn, tumhari favorite movie aur thoda sa comfort cuddle 🎬",
          backdropTheme: "movienight"
        }
      ]
    },
    {
      id: 3,
      question: "Meri sabse dangerous habit kya hai? 😂",
      options: [
        {
          id: "A",
          label: "Tumhe tang karna",
          response: "Arey woh tang karna nahi, pyaar jatane ka signature style hai madam ji! 😜"
        },
        {
          id: "B",
          label: "Cute banne ki acting",
          response: "Acting bilkul nahi hai! Natural charm hai, thoda appreciate kar liya karo 😉"
        },
        {
          id: "C",
          label: "Tumhe smile karwane ki koshish",
          response: "Aur jab tum smile karti ho na, my whole day becomes worth it 🤍"
        }
      ]
    },
    {
      id: 4,
      question: "Ek chhota sa virtual gift khologe? 🎁",
      options: [
        {
          id: "A",
          label: "Haan, jaldi kholo!",
          response: "Aapka hukum sar ankhon par! Agle stage mein mission chalu hai ✨"
        },
        {
          id: "B",
          label: "Thoda suspense!",
          response: "Suspense ka maza hi alag hai... par sabr ka phal rose jaisa meetha hota hai 🎁"
        },
        {
          id: "C",
          label: "Mujhe sab chahiye!",
          response: "Sabkuch tumhara hi toh hai! Chalo agle surprise par chalte hain 💖"
        }
      ]
    }
  ],
  gamePetalMessages: [
    "Tumhari smile = instant happiness 🤍",
    "Tumhare nakhre bhi apne hain 😂",
    "Tumhari baatein yaad reh jaati hain.",
    "Tumhare liye yeh chhota sa effort.",
    "Aur yeh last petal... sirf tumhare liye. 🌹"
  ]
};
